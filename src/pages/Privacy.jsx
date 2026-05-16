import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#FDFDFF', minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Políticas de Privacidad</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Última actualización: 16 de Mayo de 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>1. Información General</h2>
              <p>
                Turrialba Dental Care ("nosotros", "nuestro" o "la Clínica") está profundamente comprometida con la protección de la privacidad y los datos personales de nuestros pacientes. Esta Política de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos su información personal cuando interactúa con nuestro sitio web y nuestros servicios de agendamiento.
              </p>
              <p>
                Nuestras prácticas de privacidad están alineadas con la <strong>Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N° 8968)</strong> de la República de Costa Rica, así como con las directrices de protección al consumidor y regulaciones de plataformas de terceros como Google.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>2. Recopilación de Datos Personales</h2>
              <p>
                Recopilamos información personal de forma voluntaria cuando usted solicita una cita a través de nuestro sitio web. Los datos recopilados incluyen:
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Nombre completo</li>
                <li>Número de teléfono (y código de país)</li>
                <li>Correo electrónico</li>
                <li>Motivo de la consulta o especialidad requerida</li>
              </ul>
              <p style={{ marginTop: '0.5rem' }}>
                No almacenamos información financiera (tarjetas de crédito) en nuestros servidores, ni solicitamos expedientes médicos detallados a través de formularios públicos.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>3. Uso de la Información</h2>
              <p>
                La información recopilada se utiliza de manera estricta para los siguientes propósitos:
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Gestionar, confirmar y recordarle sus citas odontológicas.</li>
                <li>Contactarle en caso de cambios de horario o cancelaciones.</li>
                <li>Proporcionar asistencia al cliente y seguimiento de tratamientos.</li>
                <li>Mejorar la experiencia de usuario en nuestra plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>4. Compartición de Datos y Terceros</h2>
              <p>
                <strong>No vendemos, alquilamos ni comercializamos su información personal a terceros.</strong>
              </p>
              <p>
                Sin embargo, para garantizar el funcionamiento del sitio y con fines estadísticos o de marketing (en cumplimiento con las políticas de Google), podemos utilizar tecnologías como cookies y servicios de análisis web (ej. Google Analytics). Estas herramientas recopilan datos de navegación anónimos para mejorar nuestros servicios y la relevancia de nuestros anuncios. Usted puede configurar su navegador para rechazar el uso de cookies.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>5. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas, administrativas y físicas razonables para proteger su información personal contra pérdida, robo, acceso no autorizado, alteración y divulgación. Nuestro panel administrativo cuenta con acceso restringido exclusivo para personal autorizado de Turrialba Dental Care.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>6. Derechos del Usuario (Ley N° 8968)</h2>
              <p>
                De acuerdo con la legislación costarricense, usted tiene el derecho fundamental de autodeterminación informativa. Esto incluye el derecho a:
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>Acceder a la información personal que poseemos sobre usted.</li>
                <li>Solicitar la rectificación o corrección de datos inexactos.</li>
                <li>Solicitar la eliminación de sus datos de nuestra base (siempre que no exista una obligación legal de retenerlos, como los historiales médicos obligatorios).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>7. Contacto</h2>
              <p>
                Si tiene alguna pregunta, inquietud o solicitud relacionada con esta Política de Privacidad o el manejo de sus datos, por favor comuníquese con nosotros al correo electrónico <strong>info@turrialbadentalcare.cr</strong> o visitándonos directamente en nuestra clínica ubicada en Turrialba, Costa Rica.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
