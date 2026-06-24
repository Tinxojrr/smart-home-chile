"use client"

import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Al llegar a la página de éxito, vaciamos el carrito local
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Tu orden ha sido procesada correctamente y ya estamos preparando tu envío. Recibirás un correo con los detalles en breve.
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
