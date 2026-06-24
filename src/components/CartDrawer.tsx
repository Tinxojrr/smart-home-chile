"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ShoppingCart, X, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCartStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const itemsCount = isMounted ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0

  if (!isMounted) {
    return (
      <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
        <ShoppingCart className="w-5 h-5" />
      </button>
    )
  }

  const handleCheckout = () => {
    setIsOpen(false)
    window.location.href = '/checkout'
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {itemsCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
            {itemsCount}
          </span>
        )}
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
          <section className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white dark:bg-neutral-900 shadow-xl overflow-y-scroll">
                
                <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">Carrito de Compras</h2>
                  <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-500">
                    <span className="sr-only">Cerrar panel</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex-1 px-4 py-6 sm:px-6">
                  {cart.items.length === 0 ? (
                    <p className="text-center text-neutral-500 mt-10">Tu carrito está vacío.</p>
                  ) : (
                    <ul role="list" className="-my-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {cart.items.map((item) => (
                        <li key={item.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden relative">
                            <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-neutral-900 dark:text-neutral-100">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price_clp * item.quantity).toLocaleString('es-CL')}</p>
                              </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">-</button>
                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">+</button>
                              </div>

                              <button type="button" onClick={() => cart.removeItem(item.id)} className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1">
                                <Trash2 className="w-4 h-4" /> Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                    <p>Total</p>
                    <p>${cart.getTotal().toLocaleString('es-CL')}</p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={cart.items.length === 0 || loading}
                    className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? "Procesando..." : "Ir a Pagar"}
                  </button>
                  <div className="mt-6 flex justify-center text-sm text-center text-neutral-500">
                    <p>
                      o{' '}
                      <button type="button" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={() => setIsOpen(false)}>
                        Continuar comprando<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>,
        document.body
      )}
    </>
  )
}
