import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <Zap className="w-6 h-6 text-indigo-500" />
              <span className="font-bold tracking-tight text-white text-xl">
                SmartHome<span className="text-indigo-400">CL</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Llevando la tecnología del futuro a los hogares de todo Chile. Productos inteligentes, fáciles de usar y al mejor precio.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tienda</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/productos" className="hover:text-indigo-400 transition-colors">Catálogo Completo</Link></li>
              <li><Link href="/#bestsellers" className="hover:text-indigo-400 transition-colors">Más Vendidos</Link></li>
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Ofertas Especiales</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Soporte</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:contacto@smarthome.cl" className="hover:text-indigo-400 transition-colors">contacto@smarthome.cl</a></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Seguimiento de Pedido</span></li>
              <li><span className="hover:text-indigo-400 transition-colors cursor-pointer">Preguntas Frecuentes</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/legal/terminos" className="hover:text-indigo-400 transition-colors">Términos del Servicio</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-indigo-400 transition-colors">Políticas de Privacidad</Link></li>
              <li><Link href="/legal/reembolsos" className="hover:text-indigo-400 transition-colors">Políticas de Reembolso</Link></li>
              <li><Link href="/legal/envios" className="hover:text-indigo-400 transition-colors">Políticas de Envío</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} SmartHome CL. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Pagos procesados de forma 100% segura por Mercado Pago.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
