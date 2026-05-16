import { motion } from 'framer-motion';

const HERO_IMAGE = "/assets/hero-luxury.png";

const team = [
  { name: 'Dra. Sharlene Torres', role: 'Ortodoncia', detail: 'Directora', img: HERO_IMAGE },
  { name: 'Dra. Sofía Chacón', role: 'Odontología General', detail: 'Nocturno', img: HERO_IMAGE },
  { name: 'Dra. Alina Quesada', role: 'Odontopediatría', detail: 'Especialista', img: HERO_IMAGE },
];

export default function MobileTeam() {
  return (
    <section className="block lg:hidden" style={{ padding: '4rem 1.5rem', background: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Nuestro <span style={{ color: 'var(--primary)' }}>Equipo</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Especialistas certificados listos para atenderte.</p>
      </div>

      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '1rem', 
        paddingBottom: '2rem',
        margin: '0 -1.5rem',
        padding: '0 1.5rem 2rem',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch'
      }}>
        {team.map((doc, i) => (
          <motion.div 
            key={i} 
            style={{ 
              flex: '0 0 85%', 
              scrollSnapAlign: 'center',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid var(--border-light)',
              position: 'relative'
            }}
          >
            <div style={{ height: '320px', width: '100%' }}>
              <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ 
              position: 'absolute', 
              bottom: 0, left: 0, right: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
              padding: '2rem 1.5rem 1.5rem',
              color: 'white'
            }}>
              <div style={{ 
                background: 'var(--primary)', 
                display: 'inline-block',
                padding: '0.3rem 0.8rem', 
                borderRadius: '100px', 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                marginBottom: '0.5rem' 
              }}>
                {doc.detail}
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.2rem' }}>{doc.name}</h4>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.9rem' }}>{doc.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
