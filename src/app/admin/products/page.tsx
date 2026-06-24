import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import DeleteProductButton from "@/components/DeleteProductButton";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario de Productos</h1>
          <p className="text-neutral-500 mt-1">Gestiona los artículos reales de tu catálogo</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Producto</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium">Precio (CLP)</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    No tienes productos cargados en tu inventario.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden relative shrink-0 border border-neutral-200 dark:border-neutral-800">
                          <Image src={product.images[0] || 'https://via.placeholder.com/150'} alt={product.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900 dark:text-neutral-100">{product.name}</div>
                          <div className="text-neutral-500 text-xs">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300">
                        {product.category?.name || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${product.price_clp.toLocaleString("es-CL")}
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">{product.stock} un.</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-medium">Agotado</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <DeleteProductButton id={product.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
