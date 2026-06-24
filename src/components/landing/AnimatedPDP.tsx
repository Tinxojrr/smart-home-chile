"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, ArrowLeft, Star, ChevronDown, Check, Zap, Clock } from "lucide-react"
import AddToCartButton from "@/components/AddToCartButton"
import CartDrawer from "@/components/CartDrawer"

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price_clp: number
  stock: number
  images: string[]
  specs: any
  category: { name: string }
}

export default function AnimatedPDP({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images[0] || 'https://via.placeholder.com/600')
  const oldPrice = Math.round(product.price_clp * 1.25) // 25% discount logic for display
  const specs = product.specs as Record<string, string | string[]> || {}
  
  // Random number of reviews between 45 and 120
  const reviewCount = Math.floor(Math.random() * (120 - 45 + 1) + 45)

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-50 selection:bg-indigo-500/30">
      {/* Navbar Transparente */}
      <nav className="fixed w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/productos" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium hidden sm:block">Volver al catálogo</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span className="font-bold tracking-tight text-white hidden sm:block">SmartHome<span className="text-indigo-400">CL</span></span>
            </Link>
          </div>
          <div className="text-white">
            <CartDrawer />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* GALERÍA DE IMÁGENES (Izquierda) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 sticky top-28 h-fit"
          >
            {/* Main Image */}
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 group">
              <Image 
                src={activeImage} 
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Etiqueta Oferta */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Oferta Limitada
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-indigo-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* DETALLES DEL PRODUCTO (Derecha) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Categoría y Estrellas */}
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase border border-indigo-500/30">
                {product.category.name}
              </span>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-neutral-400 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">({reviewCount} valoraciones)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Precios */}
            <div className="flex items-end gap-4 mb-6">
              <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                ${product.price_clp.toLocaleString("es-CL")}
              </p>
              <div className="flex flex-col">
                <p className="text-lg text-neutral-500 line-through">
                  ${oldPrice.toLocaleString("es-CL")}
                </p>
                <p className="text-sm font-bold text-green-400">
                  Ahorras ${(oldPrice - product.price_clp).toLocaleString("es-CL")}
                </p>
              </div>
            </div>

            {/* Urgency Trigger */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
              <div>
                <p className="text-red-400 font-semibold text-sm">Alta demanda</p>
                <p className="text-neutral-300 text-xs">Quedan solo <span className="font-bold text-white">{product.stock < 10 ? product.stock : 7} unidades</span> en nuestra bodega local.</p>
              </div>
            </div>

            <p className="text-lg text-neutral-300 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Botón de Compra */}
            <div className="mb-6">
              <AddToCartButton product={product} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10 mb-8">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Truck className="w-6 h-6 text-indigo-400" />
                <div>
                  <p className="font-semibold text-white">Envío a todo Chile</p>
                  <p className="text-xs">Por CorreosChile / BlueExpress</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-white">Compra Segura</p>
                  <p className="text-xs">Transacción encriptada</p>
                </div>
              </div>
            </div>

            {/* Especificaciones Técnicas */}
            {Object.keys(specs).length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-500" /> Especificaciones Técnicas
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <dl className="divide-y divide-white/5">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 px-6 py-4 hover:bg-white/5 transition-colors">
                        <dt className="text-sm font-medium text-neutral-400 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="col-span-2 text-sm font-medium text-white">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
            
            {/* FAQ Accordion */}
            <div className="mb-12">
               <h3 className="text-xl font-bold mb-6 text-white">Preguntas Frecuentes</h3>
               <div className="space-y-3">
                 {[
                   { q: "¿Cuánto demora el envío?", a: "Los pedidos a la Región Metropolitana demoran de 24 a 48 horas hábiles. Para el resto de regiones, el plazo es de 2 a 5 días hábiles dependiendo de la zona." },
                   { q: "¿Qué garantía tiene el producto?", a: "Todos nuestros productos cuentan con 3 meses de garantía legal por cualquier falla de fábrica." },
                   { q: "¿Necesito conocimientos técnicos para instalarlo?", a: "¡No! Nuestros dispositivos están diseñados para ser 'Plug & Play'. Vienen con manual en español y se sincronizan fácilmente con tu celular." }
                 ].map((faq, i) => (
                   <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                     <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-neutral-200 hover:text-white transition-colors">
                       {faq.q}
                       <span className="transition duration-300 group-open:-rotate-180">
                         <ChevronDown className="w-5 h-5 text-neutral-500" />
                       </span>
                     </summary>
                     <div className="px-6 pb-4 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                       {faq.a}
                     </div>
                   </details>
                 ))}
               </div>
            </div>

          </motion.div>
        </div>
      </main>

      {/* SECCIÓN DE RESEÑAS */}
      <section id="reviews" className="border-t border-white/10 bg-[#0a0a0a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Opiniones de Clientes</h2>
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-lg font-bold">4.9 / 5.0</span>
                <span className="text-neutral-500">({reviewCount} valoraciones)</span>
              </div>
            </div>
            <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 font-medium transition-colors">
              Escribir una reseña
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Juan P.", date: "Hace 2 días", text: "Excelente calidad. Llegó súper rápido a Concepción y la instalación me tomó menos de 5 minutos.", rating: 5 },
              { name: "María S.", date: "Hace 1 semana", text: "Cumple exactamente lo que promete. La aplicación es muy fácil de usar en el iPhone. Recomendadísimo.", rating: 5 },
              { name: "Carlos M.", date: "Hace 2 semanas", text: "Buen producto, los materiales se sienten premium. El único detalle es que la caja llegó un poco abollada, pero el producto intacto.", rating: 4 }
            ].map((review, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-neutral-600" />)}
                </div>
                <p className="text-neutral-300 font-light mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold border border-indigo-500/30">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white flex items-center gap-1">
                      {review.name} <Check className="w-3 h-3 text-green-500" />
                    </p>
                    <p className="text-xs text-neutral-500">Comprador Verificado • {review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
