import prisma from "@/lib/prisma";
import AnimatedLanding from "@/components/landing/AnimatedLanding";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    include: {
      category: true,
    },
    orderBy: {
      salesCount: 'desc'
    }
  });

  return <AnimatedLanding featuredProducts={featuredProducts} />;
}
