"use client"

import Link from "next/link"
import { Clock } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useEffect } from "react"

export default function PendingPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Vaciamos el carrito porque el pago está en proceso
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 text-center">
        <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Pago Pendiente</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Estamos esperando la confirmación de Mercado Pago. Si pagaste en efectivo o con transferencia, esto puede tomar algunas horas. Te avisaremos por correo.
        </p>
        <Link 
          href="/" 
          className="block w-full py-4 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/25"
        >
          Volver a la Tienda
        </Link>
      </div>
    </div>
  )
}
