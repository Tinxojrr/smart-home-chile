import prisma from "@/lib/prisma";
import { DollarSign, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Obtener todas las órdenes
  const allOrders = await prisma.order.findMany();

  // 2. Calcular métricas
  const paidOrders = allOrders.filter(o => o.status === "PAID" || o.status === "SHIPPED");
  const pendingOrders = allOrders.filter(o => o.status === "PENDING");

  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total_clp, 0);
  const totalSalesCount = paidOrders.length;
  
  const averageTicket = totalSalesCount > 0 ? Math.round(totalRevenue / totalSalesCount) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resumen General</h1>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Ingresos Totales</h2>
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">${totalRevenue.toLocaleString("es-CL")}</p>
          <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% este mes
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Ventas Exitosas</h2>
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">{totalSalesCount}</p>
          <p className="text-xs text-neutral-500 mt-2">Órdenes completadas</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Ticket Promedio</h2>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold">${averageTicket.toLocaleString("es-CL")}</p>
          <p className="text-xs text-neutral-500 mt-2">Gasto promedio por cliente</p>
        </div>

      </div>

      {/* Alerta de Pendientes */}
      {pendingOrders.length > 0 && (
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-4 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
              Tienes {pendingOrders.length} {pendingOrders.length === 1 ? 'orden pendiente' : 'órdenes pendientes'}
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-500/80 mt-1">
              Estos clientes iniciaron el checkout pero el pago no se ha concretado o fue rechazado.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
