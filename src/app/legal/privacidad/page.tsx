export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 py-32 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">Políticas de Privacidad</h1>
        
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed">
          <p>Esta Política de Privacidad describe cómo <strong>SmartHome CL</strong> recopila, utiliza y protege tu información personal cuando visitas o realizas una compra en nuestro sitio web.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Información que recopilamos</h2>
          <p>Cuando visitas el Sitio, recopilamos automáticamente cierta información sobre tu dispositivo, incluida información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en tu dispositivo. Además, a medida que navegas por el Sitio, recopilamos información sobre las páginas web individuales o los productos que ves.</p>
          <p>Al realizar una compra, recopilamos tu nombre, dirección de facturación, dirección de envío, información de pago (a través de pasarelas seguras como Mercado Pago), dirección de correo electrónico y número de teléfono.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. ¿Cómo usamos tu información personal?</h2>
          <p>Utilizamos la Información de Pedidos que recopilamos generalmente para preparar los pedidos realizados a través del Sitio (incluido el procesamiento de tu información de pago, la organización de los envíos y el envío de facturas y/o confirmaciones de pedidos).</p>
          <p>Además, utilizamos esta Información de Pedidos para:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Comunicarnos contigo (ej. notificaciones de envío).</li>
            <li>Examinar nuestros pedidos en busca de posibles fraudes o riesgos.</li>
            <li>Cuando esté en línea con las preferencias que has compartido con nosotros, proporcionarte información o publicidad relacionada con nuestros productos.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Seguridad de tus Datos y Pagos</h2>
          <p>Tu información de pago está segura. Nosotros NO almacenamos los datos de tus tarjetas de crédito o débito. Todos los pagos son procesados de forma encriptada y segura a través de <strong>Mercado Pago</strong>, una de las pasarelas más grandes y seguras de Latinoamérica, que cumple con las normativas PCI-DSS.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Tus Derechos</h2>
          <p>En conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada de Chile, tienes el derecho a acceder a la información personal que tenemos sobre ti y a solicitar que tu información personal sea corregida, actualizada o eliminada.</p>
          <p>Si deseas ejercer este derecho, comunícate con nosotros a través de la información de contacto a continuación.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Cambios</h2>
          <p>Podemos actualizar esta política de privacidad periódicamente para reflejar, por ejemplo, cambios en nuestras prácticas o por otros motivos operativos, legales o reglamentarios.</p>
        </div>
      </div>
    </div>
  )
}
