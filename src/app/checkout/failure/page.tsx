"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"

export default function FailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Pago Rechazado</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Lo sentimos, tu método de pago fue rechazado por Mercado Pago o cancelaste la operación. No te preocupes, los productos siguen en tu carrito.
        </p>
        <div className="flex flex-col gap-3">
          <Link 
            href="/" 
            className="block w-full py-4 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/25"
          >
            Intentar de nuevo
          </Link>
          <Link 
            href="/" 
            className="block w-full py-4 rounded-xl font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
