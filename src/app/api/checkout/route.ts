import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import prisma from "@/lib/prisma";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "TEST-TU-ACCESS-TOKEN-AQUI",
  options: { timeout: 5000 }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName = "Cliente", customerPhone = "", address = "", city = "", region = "" } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No se proporcionaron productos" }, { status: 400 });
    }

    // Verificar que todos los productos realmente existen en la BD
    const productIds = items.map((item: any) => item.id);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (existingProducts.length !== productIds.length) {
      return NextResponse.json({ 
        error: "Algunos productos en tu carrito ya no están disponibles o fueron eliminados. Por favor, revisa tu carrito." 
      }, { status: 400 });
    }

    const total_clp = items.reduce((acc: number, item: any) => acc + (item.price_clp * item.quantity), 0);

    // 1. Crear Orden en Base de Datos (PENDING)
    const order = await prisma.order.create({
      data: {
        customerEmail: customerEmail || "guest@example.com",
        customerName: customerName,
        customerPhone: customerPhone,
        address,
        city,
        region,
        total_clp,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: Number(item.quantity),
            price_clp: Number(item.price_clp),
          }))
        }
      }
    });

    // 2. Mapear items para Mercado Pago
    const preferenceItems = items.map((item: any) => ({
      id: item.id,
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price_clp),
      currency_id: "CLP",
    }));

    const preference = new Preference(client);

    // Si no hay token configurado, simulamos el flujo para que puedas probar
    if (!process.env.MP_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN === "TEST-TU-ACCESS-TOKEN-AQUI") {
       return NextResponse.json({
         id: "test_preference_123",
         init_point: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`
       });
    }

    // 3. Crear Preferencia vinculada a nuestra Orden (external_reference)
    const result = await preference.create({
      body: {
        items: preferenceItems,
        payer: {
          email: customerEmail || "guest@example.com",
        },
        external_reference: order.id, // VINCULO CLAVE PARA EL WEBHOOK
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/pending`,
        },
        auto_return: (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").includes("localhost") ? undefined : "approved",
        // El webhook URL debe ser HTTPS, idealmente expuesto vía ngrok en local
        notification_url: process.env.MP_WEBHOOK_URL ? `${process.env.MP_WEBHOOK_URL}/api/webhooks/mercadopago` : undefined,
      },
    });

    if (result.id) {
       await prisma.order.update({
         where: { id: order.id },
         data: { mercadopagoId: result.id }
       })
    }

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error: any) {
    console.error("Error al crear preferencia:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor", stack: error.stack },
      { status: 500 }
    );
  }
}
