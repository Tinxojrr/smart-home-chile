"use client"

import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { deleteProduct } from "@/app/admin/products/actions"

export default function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer y desaparecerá de la tienda.")) {
      startTransition(async () => {
        const formData = new FormData()
        formData.append("id", id)
        await deleteProduct(formData)
      })
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50" 
      title="Eliminar producto"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  )
}
