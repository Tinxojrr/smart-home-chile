import prisma from "@/lib/prisma";
import { Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Órdenes</h1>
      </div>

      {/* Barra de Búsqueda Visual */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-neutral-400" />
        <input 
          type="text" 
          placeholder="Buscar por email o ID de orden..." 
          className="flex-1 bg-transparent outline-none border-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500"
        />
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">ID Orden</th>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Monto</th>
                <th className="px-6 py-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    No hay órdenes registradas aún.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-neutral-500">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">{order.customerName}</div>
                      <div className="text-neutral-500 text-xs">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${order.total_clp.toLocaleString("es-CL")}
                    </td>
                    <td className="px-6 py-4">
                      {order.status === 'PAID' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
                          Pagado
                        </span>
                      )}
                      {order.status === 'PENDING' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400">
                          Pendiente
                        </span>
                      )}
                      {order.status === 'SHIPPED' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400">
                          Enviado
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
