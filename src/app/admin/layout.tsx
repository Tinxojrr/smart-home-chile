import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, Zap } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col md:flex-row font-sans text-neutral-900 dark:text-neutral-50">
      
      {/* Sidebar Móvil (simplificado) */}
      <div className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Zap className="w-5 h-5 text-indigo-500" />
          <span>AdminPanel</span>
        </div>
        <button className="text-neutral-500">Menú</button>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Zap className="w-6 h-6 text-indigo-500" />
            <span>Admin<span className="text-indigo-500">Panel</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard className="w-5 h-5" />
            Resumen
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Órdenes
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
            <Package className="w-5 h-5" />
            Productos
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Volver a la Tienda
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}
