import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Limpiar datos anteriores (opcional, pero útil para pruebas)
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Crear categorías
  const catIluminacion = await prisma.category.create({
    data: { name: 'Iluminación', slug: 'iluminacion', description: 'Luces y ampolletas inteligentes' }
  })
  const catSeguridad = await prisma.category.create({
    data: { name: 'Seguridad', slug: 'seguridad', description: 'Cámaras y sensores' }
  })
  const catEnergia = await prisma.category.create({
    data: { name: 'Energía', slug: 'energia', description: 'Enchufes y monitoreo' }
  })
  const catAsistentes = await prisma.category.create({
    data: { name: 'Asistentes', slug: 'asistentes', description: 'Google Home, Alexa, etc' }
  })

  // Crear productos
  const products = [
    {
      name: 'Ampolleta Inteligente RGB WiFi',
      slug: 'ampolleta-inteligente-rgb',
      description: 'Controla la luz desde tu celular. 16 millones de colores.',
      price_clp: 14990,
      stock: 50,
      categoryId: catIluminacion.id,
      images: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop'],
      specs: { wifi: '2.4GHz', wattage: '9W', compatibility: ['Alexa', 'Google Assistant'] }
    },
    {
      name: 'Cámara de Seguridad WiFi 360°',
      slug: 'camara-seguridad-wifi-360',
      description: 'Vigila tu hogar desde cualquier lugar. Visión nocturna y audio bidireccional.',
      price_clp: 34990,
      stock: 25,
      categoryId: catSeguridad.id,
      images: ['https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=600&auto=format&fit=crop'],
      specs: { resolution: '1080p', wifi: '2.4GHz', extra: 'Visión nocturna' }
    },
    {
      name: 'Enchufe Inteligente con Monitor de Energía',
      slug: 'enchufe-inteligente-energia',
      description: 'Programa el encendido de tus electrodomésticos y mide su consumo.',
      price_clp: 12990,
      stock: 100,
      categoryId: catEnergia.id,
      images: ['https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=600&auto=format&fit=crop'],
      specs: { amperage: '10A', wifi: '2.4GHz', compatibility: ['Alexa', 'Google Assistant'] }
    },
    {
      name: 'Asistente de Voz Compacto',
      slug: 'asistente-voz-compacto',
      description: 'El cerebro de tu Smart Home. Reproduce música y controla tus dispositivos.',
      price_clp: 49990,
      stock: 10,
      categoryId: catAsistentes.id,
      images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=600&auto=format&fit=crop'],
      specs: { bluetooth: true, wifi: '2.4GHz & 5GHz', type: 'Speaker' }
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
