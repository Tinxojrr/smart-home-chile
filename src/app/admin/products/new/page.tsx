import prisma from "@/lib/prisma"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductForm from "./ProductForm"

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
          <p className="text-neutral-500 mt-1">Ingresa los datos de tu proveedor o extrae mágicamente desde una URL.</p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}
