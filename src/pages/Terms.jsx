import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Términos y Condiciones</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Última actualización: 16 de Mayo de 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Turrialba Dental Care (el "Sitio") y nuestros servicios de agendamiento en línea, usted acepta cumplir y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con estos términos, le rogamos no utilice nuestra plataforma.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>2. Servicios de Agendamiento</h2>
              <p>
                El Sitio ofrece una plataforma para que los pacientes puedan solicitar citas para servicios odontológicos. Tenga en cuenta lo siguiente:
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>La solicitud de cita a través de la web no constituye una confirmación automática. La cita se considera confirmada únicamente cuando nuestro equipo la aprueba y le notifica (por correo electrónico o teléfono).</li>
                <li>Turrialba Dental Care se reserva el derecho de rechazar, cancelar o reprogramar citas debido a disponibilidad, emergencias médicas o causas de fuerza mayor.</li>
                <li>Usted se compromete a proporcionar información veraz, actual y completa al momento de llenar el formulario de agendamiento.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>3. Políticas de Cancelación y Llegadas Tardías</h2>
              <p>
                Entendemos que pueden surgir imprevistos. Sin embargo, solicitamos a nuestros pacientes que cualquier cancelación o reprogramación se realice con al menos <strong>24 horas de anticipación</strong>.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Llegar tarde a su cita (más de 15 minutos) podría resultar en la reducción de su tiempo de tratamiento o en la necesidad de reprogramar la cita, dependiendo de la agenda de la clínica, para evitar afectar a los siguientes pacientes.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>4. Responsabilidad Médica e Información del Sitio</h2>
              <p>
                El contenido proporcionado en este Sitio (textos, descripciones de servicios, imágenes) tiene fines puramente informativos y educativos. En ningún caso la información del sitio web debe considerarse como diagnóstico médico o sustituir la consulta directa y la evaluación clínica presencial por parte de nuestros odontólogos acreditados.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>5. Modificaciones a los Términos</h2>
              <p>
                Nos reservamos el derecho de actualizar, modificar o reemplazar cualquier parte de estos Términos y Condiciones mediante la publicación de las actualizaciones en nuestro Sitio. Es su responsabilidad revisar esta página periódicamente para verificar los cambios. El uso continuo del Sitio tras la publicación de cambios constituye la aceptación de los mismos.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>6. Legislación Aplicable</h2>
              <p>
                Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la República de Costa Rica. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Costa Rica.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
