export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 py-32 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">Políticas de Envío</h1>
        
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed">
          <p>En <strong>SmartHome CL</strong>, nuestro objetivo es ofrecerte las mejores opciones de envío, sin importar dónde vivas en Chile. Todos los días realizamos entregas a cientos de clientes, asegurándonos de brindarte los niveles más altos de respuesta en todo momento.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Tiempos de Procesamiento</h2>
          <p>Todos los pedidos se procesan en un plazo de <strong>24 a 48 horas hábiles</strong> tras confirmar el pago. Los pedidos no se envían ni se entregan los fines de semana ni los días festivos.</p>
          <p>Si experimentamos un gran volumen de pedidos, los envíos pueden retrasarse un par de días. Si se produce un retraso significativo en el envío de tu pedido, nos pondremos en contacto contigo por correo electrónico o por teléfono.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Tiempos de Envío</h2>
          <p>Trabajamos con los principales transportistas nacionales (BlueExpress, CorreosChile, Starken) para asegurar que tu paquete llegue seguro y a tiempo.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Región Metropolitana:</strong> 1 a 3 días hábiles.</li>
            <li><strong>Regiones (Zona Centro y Sur):</strong> 2 a 5 días hábiles.</li>
            <li><strong>Zonas Extremas (Norte y Extremo Sur):</strong> 4 a 10 días hábiles.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Tarifas de Envío</h2>
          <p>Los gastos de envío de tu pedido se calcularán y se mostrarán en la pantalla de pago (Checkout). Periódicamente ofrecemos promociones de <strong>Envío Gratis</strong> para ciertas regiones o montos de compra, lo cual será anunciado en la barra superior de nuestra tienda.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Confirmación de Envío y Seguimiento</h2>
          <p>Una vez que tu pedido sea despachado, recibirás un correo electrónico de Confirmación de Envío que incluirá tu(s) número(s) de seguimiento. El número de seguimiento se activará en un plazo de 24 horas.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Daños durante el envío</h2>
          <p>Si recibiste tu pedido dañado, ponte en contacto con nosotros en un plazo máximo de 48 horas tras la recepción del paquete. Conserva todos los materiales de embalaje y los productos dañados antes de presentar una reclamación.</p>
        </div>
      </div>
    </div>
  )
}
