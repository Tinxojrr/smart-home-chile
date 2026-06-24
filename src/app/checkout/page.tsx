"use client"

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Zap, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
  const cart = useCartStore()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          customerName: formData.get('name'),
          customerEmail: formData.get('email'),
          customerPhone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          region: formData.get('region')
        })
      })

      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert("Error al iniciar checkout: " + (data.error || "Desconocido"))
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert("Error de red")
      setLoading(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/productos" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-sm hover:bg-indigo-700 transition-colors">Volver a la tienda</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      
      {/* Navbar Simple */}
      <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-xl tracking-tight hidden sm:block">SmartHome<span className="text-indigo-500">CL</span></span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-500">
            <ShieldCheck className="w-5 h-5" /> <span className="hidden sm:inline">Checkout 100% Seguro</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Formulario */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Truck className="w-6 h-6 text-indigo-500" /> Dónde enviamos tu pedido
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-neutral-100 dark:border-neutral-800 pb-2">Tus Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Nombre Completo</label>
                    <input type="text" id="name" name="name" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors" placeholder="juan@ejemplo.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="phone" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Teléfono (Celular / WhatsApp)</label>
                    <input type="tel" id="phone" name="phone" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors" placeholder="+56 9 1234 5678" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-semibold border-b border-neutral-100 dark:border-neutral-800 pb-2">Dirección de Despacho</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Calle y Número</label>
                    <input type="text" id="address" name="address" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors" placeholder="Ej: Av. Providencia 1234, Depto 45" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Comuna / Ciudad</label>
                      <input type="text" id="city" name="city" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors" placeholder="Ej: Providencia" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="region" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Región</label>
                      <select id="region" name="region" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors text-neutral-900 dark:text-neutral-100">
                        <option value="">Seleccionar Región...</option>
                        <option value="RM">Metropolitana</option>
                        <option value="V">Valparaíso</option>
                        <option value="VIII">Biobío</option>
                        <option value="Otras">Otra Región de Chile</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Resumen Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0">
            <h2 className="text-2xl font-bold mb-6">Resumen de Compra</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-200 dark:border-neutral-800 sticky top-6">
              
              <ul className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map(item => (
                  <li key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative shrink-0 border border-neutral-200 dark:border-neutral-700">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2 leading-tight">{item.name}</h4>
                      <p className="text-xs text-neutral-500 mt-1">Cant: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium whitespace-nowrap">
                      ${(item.price_clp * item.quantity).toLocaleString('es-CL')}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-4 space-y-3 mb-8">
                <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>${cart.getTotal().toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <span>Envío a Domicilio</span>
                  <span className="text-green-600 dark:text-green-500 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-neutral-100 dark:border-neutral-800 pt-4 text-neutral-900 dark:text-neutral-100">
                  <span>Total</span>
                  <span>${cart.getTotal().toLocaleString('es-CL')}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-500/25 flex justify-center items-center text-lg"
              >
                {loading ? "Procesando..." : "Continuar al Pago"}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Pagos encriptados por Mercado Pago
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
