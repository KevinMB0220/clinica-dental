import { motion } from 'framer-motion';

const specialties = [
  { title: 'Ortodoncia', desc: 'Alineación y mordida' },
  { title: 'Implantes', desc: 'Restauración estética' },
  { title: 'Endodoncia', desc: 'Tratamientos de nervio' },
  { title: 'Odontopediatría', desc: 'Atención infantil' },
  { title: 'Periodoncia', desc: 'Cuidado de encías' },
  { title: 'Quiropodia', desc: 'Cuidado de pies' },
];

export default function MobileServices() {
  return (
    <section className="block lg:hidden" style={{ padding: '4rem 1.5rem', background: '#F8FBF8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Nuestros <span style={{ color: 'var(--primary)' }}>Servicios</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Especialidades médicas completas en un solo lugar.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {specialties.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '20px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--border-light)',
              minHeight: '80px' // > 44px touch target
            }}
          >
            <div style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '4px', marginRight: '1rem' }}></div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
