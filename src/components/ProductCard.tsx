"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

type Product = {
  id: string
  name: string
  slug: string
  price_clp: number
  images: string[]
  category: { name: string }
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product detail
    addItem({
      id: product.id,
      name: product.name,
      price_clp: product.price_clp,
      quantity: 1,
      image: product.images[0]
    })
  }

  const oldPrice = Math.round(product.price_clp * 1.2)

  return (
    <Link href={`/producto/${product.slug}`} className="group relative flex flex-col bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="aspect-[4/3] relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <Image 
          src={product.images[0]} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-neutral-900 dark:text-neutral-100 shadow-sm">
          {product.category.name}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-neutral-500 line-through mb-0.5">
              ${oldPrice.toLocaleString("es-CL")}
            </p>
            <p className="font-bold text-xl text-neutral-900 dark:text-neutral-100">
              ${product.price_clp.toLocaleString("es-CL")}
            </p>
          </div>
          <button 
            onClick={handleAddToCart}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
