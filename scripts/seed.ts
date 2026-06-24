import 'dotenv/config'
import prisma from '../src/lib/prisma'

async function main() {
  console.log("Creando categorías base...")
  const catSeguridad = await prisma.category.upsert({
    where: { slug: 'seguridad' },
    update: {},
    create: { name: 'Seguridad', slug: 'seguridad', description: 'Cámaras y sensores inteligentes' }
  })
  
  const catIluminacion = await prisma.category.upsert({
    where: { slug: 'iluminacion' },
    update: {},
    create: { name: 'Iluminación', slug: 'iluminacion', description: 'Ampolletas y luces WiFi' }
  })
  
  const catDomotica = await prisma.category.upsert({
    where: { slug: 'domotica' },
    update: {},
    create: { name: 'Domótica', slug: 'domotica', description: 'Enchufes e interruptores WiFi' }
  })

  console.log("Inyectando Productos Ganadores...")

  const products = [
    {
      name: "Cámara de Seguridad WiFi 360° Interior",
      slug: "camara-seguridad-wifi-360",
      description: "Vigila tu hogar desde tu celular, en cualquier parte del mundo. Visión nocturna, audio bidireccional y sensor de movimiento inteligente con notificaciones inmediatas.",
      price_clp: 29990,
      stock: 50,
      images: ["/products/camara.png"],
      categoryId: catSeguridad.id,
    },
    {
      name: "Enchufe Inteligente WiFi Mini",
      slug: "enchufe-inteligente-wifi",
      description: "Transforma cualquier electrodoméstico tradicional en uno inteligente. Apágalos o enciéndelos por voz (Alexa/Google) o programando horarios para ahorrar luz.",
      price_clp: 12990,
      stock: 100,
      images: ["/products/enchufe.png"],
      categoryId: catDomotica.id,
    },
    {
      name: "Pack x2 Ampolletas LED Inteligentes RGB",
      slug: "ampolletas-led-wifi-rgb",
      description: "Crea el ambiente perfecto. Más de 16 millones de colores. Sincroniza la luz con tu música, películas o juegos directamente desde tu smartphone.",
      price_clp: 19990,
      stock: 45,
      images: ["/products/ampolleta.png"],
      categoryId: catIluminacion.id,
    },
    {
      name: "Sensor de Puerta y Ventana Alarma WiFi",
      slug: "sensor-puerta-wifi",
      description: "Protege los accesos de tu casa. Recibe una alerta en tu teléfono si alguien abre una puerta o ventana mientras no estás. Sin cables, fácil instalación.",
      price_clp: 15990,
      stock: 30,
      images: ["/products/sensor.png"],
      categoryId: catSeguridad.id,
    },
    {
      name: "Tira LED Neon Smart 5 Metros",
      slug: "tira-led-neon-wifi",
      description: "Decora tu pieza o setup gamer con luces de neón flexibles. Controladas por voz y celular. Resistentes al agua.",
      price_clp: 24990,
      stock: 25,
      images: ["/products/tira.png"],
      categoryId: catIluminacion.id,
    }
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p
    })
  }

  console.log("¡Éxito! 5 productos ganadores inyectados correctamente.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
