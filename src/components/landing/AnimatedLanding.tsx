"use client"

import { Zap, ShieldCheck, Smartphone, Truck, ChevronRight, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import ProductCard from "@/components/ProductCard"
import CartDrawer from "@/components/CartDrawer"

// Props that come from the Server Component
type AnimatedLandingProps = {
  featuredProducts: any[]
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AnimatedLanding({ featuredProducts }: AnimatedLandingProps) {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, 100])

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-50 selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Navbar Transparente (fija arriba) */}
      <nav className="fixed w-full z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">SmartHome<span className="text-indigo-400">CL</span></span>
          </Link>
          <div className="text-white">
            <CartDrawer />
          </div>
        </div>
      </nav>

      {/* Hero Section con Parallax */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 flex items-center justify-center min-h-[90vh]">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            La revolución inteligente llegó a Chile
          </motion.div>

          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn}
            className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          >
            Tu casa. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
              Pero más inteligente.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg md:text-2xl text-neutral-400 mb-12 font-light leading-relaxed"
          >
            Automatiza luces, seguridad y clima desde tu celular. Tecnología premium con envíos rápidos a todo el país.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/productos" className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">Explorar Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <a href="#beneficios" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-all backdrop-blur-md">
              Ver beneficios
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof Bar */}
      <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck/> Pago Seguro</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Truck/> Envío a todo Chile</div>
          <div className="flex items-center gap-2 font-bold text-xl"><Star className="fill-current"/> Calidad Premium</div>
        </div>
      </div>

      {/* Beneficios Grid (Glassmorphism) */}
      <section id="beneficios" className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">¿Por qué comprar aquí?</h2>
            <p className="text-neutral-400 text-lg">La mejor experiencia de compra, garantizada.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Truck, title: "Envío Express", desc: "Despachos rápidos a través de CorreosChile, directo a la puerta de tu casa." },
              { icon: ShieldCheck, title: "Garantía Total", desc: "Todos nuestros productos tienen 3 meses de garantía por fallas de fábrica." },
              { icon: Smartphone, title: "Soporte Local", desc: "Atención en español vía WhatsApp para ayudarte a configurar tus dispositivos." }
            ].map((feature, i) => (
              <motion.div 
                key={i} variants={fadeIn}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Los Más Vendidos */}
      <section className="py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Tendencias</h2>
              <p className="text-neutral-400 text-lg">Los dispositivos favoritos de nuestros clientes</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link href="/productos" className="inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                Ver catálogo completo <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeIn}>
                {/* Forzamos que las cards se vean bien sobre fondo negro */}
                <div className="bg-white rounded-2xl overflow-hidden h-full">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
          >
            Es hora de dar el siguiente paso.
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto"
          >
            Convierte tu hogar en un espacio moderno, seguro y cómodo hoy mismo con nuestros dispositivos inteligentes de fácil instalación.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/productos" className="inline-block px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Equipar mi casa ahora
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span className="font-bold tracking-tight text-white">SmartHome<span className="text-indigo-500">CL</span></span>
          </div>
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Smart Home Chile. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

      {/* Estilos CSS globales para animaciones sutiles (se pueden inyectar acá o en globals.css) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}} />
    </div>
  )
}
