export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 py-32 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">Políticas de Reembolso y Devolución</h1>
        
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed">
          <p>En <strong>SmartHome CL</strong> trabajamos amparados en la <strong>Ley del Consumidor (Ley 19.496)</strong> de Chile para brindarte la máxima tranquilidad en tu compra.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Garantía Legal (Fallas de Fábrica)</h2>
          <p>Si el producto que compraste viene defectuoso, le faltan piezas o partes, o no es apto para el uso al que fue destinado, tienes derecho a la Garantía Legal. Esta garantía aplica dentro de los <strong>6 primeros meses</strong> desde la recepción del producto.</p>
          <p>Puedes elegir una de estas 3 alternativas:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Devolución del dinero.</li>
            <li>Cambio por un producto nuevo.</li>
            <li>Reparación gratuita.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Derecho a Retracto (Garantía de Satisfacción)</h2>
          <p>Nuestra tienda ofrece un derecho de retracto voluntario. Si te arrepentiste de tu compra o el producto no era lo que esperabas, tienes <strong>10 días corridos</strong> desde que recibiste el pedido para solicitar la devolución de tu dinero o cambio.</p>
          <p>Para hacer efectivo este derecho, el producto debe cumplir las siguientes condiciones:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Estar sin uso, en perfectas condiciones.</li>
            <li>Mantener su embalaje original intacto.</li>
            <li>Incluir todos sus manuales, accesorios y sellos originales.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Proceso para Solicitar una Devolución</h2>
          <p>Para iniciar una devolución o hacer valer tu garantía, por favor envíanos un correo a <strong>contacto@smarthome.cl</strong> incluyendo:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Número de pedido (ej: #1024).</li>
            <li>Motivo de la devolución.</li>
            <li>Fotografías o videos que evidencien el estado del producto (especialmente si es por falla).</li>
          </ul>
          <p>Nuestro equipo de soporte te responderá en un plazo máximo de 48 horas hábiles con las instrucciones de envío.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Reembolsos</h2>
          <p>Una vez que recibamos e inspeccionemos tu devolución, te enviaremos un correo electrónico para notificarte la aprobación o el rechazo de tu reembolso. Si es aprobado, se procesará automáticamente un crédito a tu tarjeta de crédito o método de pago original a través de Mercado Pago, en un plazo de <strong>5 a 10 días hábiles</strong> dependiendo de tu banco emisor.</p>
        </div>
      </div>
    </div>
  )
}
