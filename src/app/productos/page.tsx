import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Filter, Zap } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";

export const dynamic = 'force-dynamic';

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const categorySlug = (await searchParams).category;

  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    include: { category: true },
    orderBy: { salesCount: 'desc' }
  });

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      
      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-xl tracking-tight hidden sm:block">SmartHome<span className="text-indigo-500">CL</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/productos" className="font-medium hover:text-indigo-600 transition-colors">Catálogo</Link>
            <CartDrawer />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar de Filtros */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 sticky top-28">
              <div className="flex items-center gap-2 font-bold text-lg mb-6">
                <Filter className="w-5 h-5" />
                Categorías
              </div>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/productos" 
                    className={`block hover:text-indigo-600 transition-colors ${!categorySlug ? 'font-bold text-indigo-600' : 'text-neutral-600 dark:text-neutral-400'}`}
                  >
                    Ver Todo
                  </Link>
                </li>
                {categories.map(c => (
                  <li key={c.id}>
                    <Link 
                      href={`/productos?category=${c.slug}`}
                      className={`block hover:text-indigo-600 transition-colors ${categorySlug === c.slug ? 'font-bold text-indigo-600' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grilla de Productos */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {categorySlug 
                  ? categories.find(c => c.slug === categorySlug)?.name || 'Categoría' 
                  : 'Catálogo Completo'}
              </h1>
              <p className="text-neutral-500 mt-2">Mostrando {products.length} productos.</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <p className="text-neutral-500">No hay productos en esta categoría.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
