import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import AnimatedPDP from '@/components/landing/AnimatedPDP'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  return <AnimatedPDP product={product} />
}
