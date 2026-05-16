import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Star, Clock, Users, ChevronRight, Phone, Sparkles, Activity, Zap, HeartPulse, MapPin, Facebook, Instagram, Calendar } from 'lucide-react';

const WHATSAPP_NUMBER = "50625562673";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// IMAGEN GENERADA DE ALTA RESOLUCIÓN
const HERO_IMAGE = "/assets/hero-luxury.png";

const servicesList = [
  "Ortodoncia", "Implantes", "Endodoncia", "Odontopediatría", "Periodoncia", "Quiropodia", 
  "Estética Dental", "Limpieza Profunda", "Cirugía", "Laboratorio Propio", "Prótesis Inmediata",
  "Blanqueamiento", "Rayos X", "Diseño de Sonrisa", "Coronas", "Carillas"
];

// Duplicate for marquee effect
const marqueeRow1 = [...servicesList];
const marqueeRow2 = [...servicesList].reverse();

const galleryItems = [
  { title: 'Consultorio Digital', img: '/assets/hero-dental.jpg' },
  { title: 'Laboratorio de Prótesis', img: '/assets/happy-patient.jpg' },
  { title: 'Área de Ortodoncia', img: '/assets/hero-dental.jpg' },
  { title: 'Sala de Espera VIP', img: '/assets/happy-patient.jpg' },
  { title: 'Tecnología 3D', img: '/assets/hero-dental.jpg' },
];

const infiniteGallery = [...galleryItems, ...galleryItems];

const specialties = [
  { title: 'Ortodoncia Especializada', description: 'Dirigido por la Dra. Sharlene Torres, corregimos alineación y mordida con las técnicas más modernas.' },
  { title: 'Implantes Dentales', description: 'Restauramos la funcionalidad y estética de tu sonrisa con especialistas en implantología.' },
  { title: 'Endodoncia (Nervio)', description: 'Especialistas en tratamientos de conductos para salvar piezas dentales y eliminar el dolor.' },
  { title: 'Odontopediatría', description: 'Atención infantil a cargo de la Dra. Alina Quesada, en un ambiente amigable y seguro.' },
  { title: 'Periodoncia', description: 'Cuidado especializado de las encías y los tejidos de soporte para una salud bucal integral.' },
  { title: 'Quiropodia (Nuevo)', description: 'Servicio de atención integral de los pies: callos, uñas encarnadas y cuidado general.' },
  { title: 'Laboratorio Propio', description: 'Técnico dental en planta para reparaciones de prótesis y coronas inmediatas.' },
];

export default function Home() {
  return (
    <div className="home-page">
      
      {/* ── 1. HERO SECTION (ULTRA-WIDE LATTICE CLONE) ── */}
      <section style={{ height: 'calc(100vh - 90px)', display: 'flex', flexDirection: 'column', padding: '1rem 0' }} id="home">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', width: '100%', padding: '0 5%' }}>
          
          {/* TOP INFO (35%) */}
          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Más que una sonrisa, <br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: 'var(--primary)', position: 'relative', display: 'inline-block', marginTop: '0.5rem', fontSize: '1.1em' }}>
                tu bienestar total.
              </span>
            </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem', fontWeight: 500 }}>
                Especialistas certificados y laboratorio propio en Turrialba para resultados inmediatos con un trato humano inigualable.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/booking" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
                  Agendar Cita
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  <Phone size={16} color="var(--primary)" /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM IMAGE (65%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1', position: 'relative', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
          >
            {/* NUEVA IMAGEN 8K */}
            <img src={HERO_IMAGE} alt="Clínica Turrialba Dental" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            {/* Overlay: Bottom Left Info (Static) */}
            <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', textAlign: 'left', maxWidth: '380px', zIndex: 10 }}>
               <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem', textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
                 Laboratorio <br /> Propio.
               </h2>
               <p style={{ color: 'white', fontSize: '1rem', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                 Tecnología dental inmediata <br /> a tu alcance en Turrialba.
               </p>
            </div>

            {/* Overlay: LARGE TRANSPARENT CAROUSEL (White Pills) */}
            <div style={{ position: 'absolute', bottom: '3rem', right: '3rem', left: '35%', background: 'transparent', padding: '0', overflow: 'hidden' }}>
               
               {/* Fade Effect Container */}
               <div style={{ position: 'relative', width: '100%', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                  
                  {/* Row 1 */}
                  <motion.div 
                    style={{ display: 'flex', gap: '2.5rem', marginBottom: '1.25rem', width: 'max-content' }}
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    {marqueeRow1.map((s, i) => (
                      <div key={i} style={{ padding: '0.6rem 1.8rem', background: 'rgba(255,255,255,0.98)', borderRadius: 'var(--radius-pill)', fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--text-main)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                        {s}
                      </div>
                    ))}
                  </motion.div>

                  {/* Row 2 */}
                  <motion.div 
                    style={{ display: 'flex', gap: '2.5rem', width: 'max-content' }}
                    animate={{ x: [-1200, 0] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    {marqueeRow2.map((s, i) => (
                      <div key={i} style={{ padding: '0.6rem 1.8rem', background: 'rgba(255,255,255,0.98)', borderRadius: 'var(--radius-pill)', fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--text-main)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                        {s}
                      </div>
                    ))}
                  </motion.div>
               </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 2. TRUST BANNER ── */}
      <section style={{ padding: '2rem 0', background: 'white', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Clock size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Horario Nocturno hasta 8:00 PM</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Zap size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Reparaciones Inmediatas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Users size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>Atención Infantil</span>
          </div>
        </div>
      </section>

      {/* ── 3. CARRUSEL AUTOMÁTICO (Instalaciones) ── */}
      <section id="clinica" style={{ padding: '6rem 0', overflow: 'hidden' }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2>Nuestras Instalaciones</h2>
        </div>
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
          <motion.div style={{ display: 'flex', gap: '2rem', width: 'max-content' }} animate={{ x: [0, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
            {infiniteGallery.map((item, i) => (
              <div key={i} style={{ width: '480px', height: '340px', position: 'relative', flexShrink: 0 }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.95)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-card)' }}>
                  {item.title}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. SERVICIOS (Bento Grid) ── */}
      <section id="servicios" className="bg-soft" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div className="section-title" style={{ textAlign: 'center' }}>
            <h2>Especialidades Médicas</h2>
            <p style={{ maxWidth: '600px', margin: '1.5rem auto 0' }}>Equipada con tecnología moderna y un equipo de especialistas dedicados a cada área de la odontología.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 'minmax(240px, auto)', gap: '1.25rem' }}>
            {specialties.map((service, index) => {
              let gridSpan = 'span 2';
              if (index === 0) gridSpan = 'span 4';
              if (index === 5 || index === 6) gridSpan = 'span 3';
              return (
                <motion.div key={index} className="dashboard-card" style={{ padding: '2.5rem', border: '1px solid var(--border-light)', cursor: 'pointer', gridColumn: gridSpan, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', transition: 'border-color 0.3s ease' }} whileHover={{ borderColor: 'var(--primary)', translateY: -5, boxShadow: 'var(--shadow-hover)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '4px', height: '32px', background: 'var(--primary)', borderRadius: 'var(--radius-pill)', flexShrink: 0, marginTop: '4px', opacity: 0.8 }}></div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.2 }}>{service.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. MEET THE DOCTORS ── */}
      <section id="equipo" className="container dashboard-section">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>Nuestro Equipo Médico</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {[
            { name: 'Dra. Sharlene Torres', role: 'Especialista en Ortodoncia', detail: 'Directora Médica', img: '/assets/hero-dental.jpg', desc: 'Directora y fundadora, experta en alineación y estética dental de alta precisión.' },
            { name: 'Dra. Sofía Chacón', role: 'Odontología General', detail: 'Horario Extendido', img: '/assets/happy-patient.jpg', desc: 'Especialista en atención integral con disponibilidad en horario nocturno (5pm - 8pm).' },
            { name: 'Dra. Alina Quesada', role: 'Odontopediatría', detail: 'Especialista Infantil', img: '/assets/hero-dental.jpg', desc: 'Atención dental infantil con un enfoque paciente, lúdico y altamente profesional.' },
          ].map((doc, i) => (
            <motion.div key={i} className="dashboard-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-light)' }} whileHover={{ translateY: -10, boxShadow: 'var(--shadow-hover)', borderColor: 'var(--primary)' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ width: '100%', height: '380px', position: 'relative' }}>
                <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(4px)' }}>
                  {doc.detail}
                </div>
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{doc.name}</h4>
                <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '2px', background: 'var(--primary)' }}></div> {doc.role}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{doc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WhatsApp Flotante */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: '#10B981', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)', zIndex: 1000, transition: 'transform 0.2s' }}>
        <Phone size={30} />
      </a>
    </div>
  );
}
