"use client"

import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price_clp: product.price_clp,
      quantity: 1,
      image: product.images[0]
    })
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button 
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all ${
        added 
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25' 
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {added ? '¡Añadido al carrito!' : 'Añadir al Carrito'}
    </button>
  )
}
