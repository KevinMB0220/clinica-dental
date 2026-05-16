import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const HERO_IMAGE = "/assets/hero-luxury.png";
const WHATSAPP_LINK = "https://wa.me/50625562673";

export default function MobileHero() {
  return (
    <section className="block lg:hidden" style={{ width: '100vw', padding: '0', margin: '0', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Background Image full-bleed */}
        <img 
          src={HERO_IMAGE} 
          alt="Clínica Dental Turrialba" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} 
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: -1
        }} />

        {/* Content pushed to the bottom */}
        <div style={{ marginTop: 'auto', padding: '2rem 1.5rem', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 1rem',
              borderRadius: '100px',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              Laboratorio Propio
            </div>
            
            <h1 style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: 'white', 
              letterSpacing: '-0.02em', 
              marginBottom: '1rem' 
            }}>
              Más que una sonrisa, <br />
              <span style={{ 
                fontFamily: 'var(--font-serif)', 
                fontStyle: 'italic', 
                fontWeight: 600, 
                color: 'var(--accent)' 
              }}>
                bienestar total.
              </span>
            </h1>
            
            <p style={{ 
              fontSize: '1rem', 
              color: 'rgba(255,255,255,0.9)', 
              marginBottom: '2rem', 
              fontWeight: 500,
              lineHeight: 1.5
            }}>
              Resultados inmediatos con el trato humano que mereces en Turrialba.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link to="/booking" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
                Agendar Cita
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn" style={{ 
                padding: '1rem', 
                fontSize: '1rem', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'white', 
                fontWeight: 700,
                justifyContent: 'center'
              }}>
                <Phone size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
