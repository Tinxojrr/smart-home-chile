import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/lib/prisma";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "TEST-TU-ACCESS-TOKEN-AQUI",
  options: { timeout: 5000 }
});

export async function POST(request: Request) {
  try {
    // Mercado Pago puede enviar datos en el query string o en el body dependiendo del tipo de notificación
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || url.searchParams.get("topic");
    const id = url.searchParams.get("data.id") || url.searchParams.get("id");

    // Si es un evento de pago
    if (type === "payment" && id) {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id });

      // Verificamos si el pago fue aprobado y si tiene nuestro ID de orden vinculado
      if (paymentInfo.status === "approved" && paymentInfo.external_reference) {
        
        // Actualizamos la orden en Supabase a pagada e incluimos los items
        const order = await prisma.order.update({
          where: { id: paymentInfo.external_reference },
          data: { status: "PAID" },
          include: { items: true }
        });

        // Sumar ventas al contador de cada producto (Best Sellers)
        if (order && order.items) {
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: { salesCount: { increment: item.quantity } }
            });
          }
        }

        console.log(`Orden ${paymentInfo.external_reference} marcada como PAID exitosamente.`);
      }
    }

    // Mercado Pago siempre requiere que respondamos con un 200 OK rápido
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando el webhook de Mercado Pago:", error);
    // Si algo falla, MP volverá a intentar enviarnos el webhook más tarde
    return NextResponse.json({ error: "Error procesando el webhook" }, { status: 500 });
  }
}
