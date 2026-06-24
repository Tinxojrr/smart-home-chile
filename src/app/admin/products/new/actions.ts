"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const price_clp = parseInt(formData.get("price_clp") as string)
  const stock = parseInt(formData.get("stock") as string)
  const categoryId = formData.get("categoryId") as string
  const image = formData.get("image") as string

  if (!name || !slug || !price_clp || !categoryId) {
    throw new Error("Faltan campos obligatorios")
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price_clp,
      stock: isNaN(stock) ? 0 : stock,
      categoryId,
      images: image ? [image] : [],
      specs: {}
    }
  })

  // Refrescar caché de Next.js para que el nuevo producto aparezca de inmediato
  revalidatePath("/admin/products")
  revalidatePath("/productos")
  revalidatePath("/")
  
  redirect("/admin/products")
}
