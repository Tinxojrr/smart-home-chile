import prisma from "@/lib/prisma"
import { createProduct } from "./actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agregar Nuevo Producto</h1>
          <p className="text-neutral-500 mt-1">Ingresa los datos de tu proveedor para agregarlo al catálogo.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8">
        <form action={createProduct} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nombre del Producto</label>
              <input type="text" id="name" name="name" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="Ej: Cámara de Seguridad 360" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">URL amigable (Slug)</label>
              <input type="text" id="slug" name="slug" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="ej: camara-seguridad-360" />
              <p className="text-xs text-neutral-500">Sin espacios, solo letras, números y guiones.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="price_clp" className="text-sm font-medium">Precio de Venta (CLP)</label>
              <input type="number" id="price_clp" name="price_clp" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="Ej: 24990" />
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="text-sm font-medium">Stock Inicial</label>
              <input type="number" id="stock" name="stock" required defaultValue={10} className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">Categoría</label>
            <select id="categoryId" name="categoryId" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2 text-neutral-900 dark:text-neutral-100">
              <option value="">Selecciona una categoría...</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">URL de la Imagen Principal</label>
            <input type="url" id="image" name="image" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="https://..." />
            <p className="text-xs text-neutral-500">Copia la dirección de la imagen de tu proveedor (AliExpress, Amazon, etc).</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Descripción</label>
            <textarea id="description" name="description" rows={4} className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2" placeholder="Describe los beneficios del producto..."></textarea>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
              Guardar Producto en Catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
