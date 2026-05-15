import { motion } from 'framer-motion';
import { Shield, Star, Clock, Users, ChevronRight, Phone, Sparkles, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { title: 'Odontología General',           description: 'Atención primaria, diagnóstico, limpiezas y tratamientos preventivos básicos para toda la familia.', icon: <Sparkles size={28} /> },
  { title: 'Ortodoncia',                    description: 'Diagnostica, previene y corrige los dientes mal alineados y problemas de maloclusión con tecnología avanzada.', icon: <Activity size={28} /> },
  { title: 'Periodoncia',                   description: 'Se enfoca en la salud de las encías y los tejidos de soporte del diente para prevenir enfermedades.', icon: <Shield size={28} /> },
  { title: 'Endodoncia',                    description: 'Trata las enfermedades de la pulpa dental y los conductos radiculares mediante tratamientos precisos.', icon: <Zap size={28} /> },
  { title: 'Cirugía Oral y Maxilofacial',   description: 'Maneja extracciones complejas, implantes y cirugías reconstructivas de la boca y mandíbula.', icon: <Shield size={28} /> },
  { title: 'Odontopediatría',               description: 'Especialidad dedicada exclusivamente a la atención dental de niños y adolescentes.', icon: <Users size={28} /> },
  { title: 'Rehabilitación Oral',           description: 'Especializada en diseñar y colocar prótesis, coronas y puentes para devolver la función dental.', icon: <Star size={28} /> },
];

export default function Home() {
  return (
    <div className="home-page" style={{ paddingBottom: '6rem' }}>

      {/* ── HERO SECTION: DYNAMIC MOSAIC (Un diseño totalmente nuevo y disruptivo) ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
            
            {/* Contenido Principal de Texto */}
            <div style={{ gridColumn: '1 / span 6', position: 'relative', zIndex: 10 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)', marginBottom: '2.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  <Sparkles size={16} fill="var(--primary)" /> Redefiniendo la Clínica Dental
                </div>
                
                <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 0.95, marginBottom: '2rem', color: 'var(--text-main)', letterSpacing: '-0.05em' }}>
                  Más que una sonrisa, <br />
                  <span style={{ color: 'var(--primary)' }}>tu bienestar.</span>
                </h1>
                
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '500px' }}>
                  Combinamos arte clínico con la tecnología más avanzada del país para crear experiencias dentales sin estrés y resultados permanentes.
                </p>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <Link to="/booking" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                    Agendar Evaluación <ChevronRight size={20} style={{ marginLeft: '4px' }} />
                  </Link>
                  <a href="#servicios" style={{ color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }} className="hover-lift">
                    Explorar Especialidades <ChevronRight size={18} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Mosaico Visual Dinámico */}
            <div style={{ gridColumn: '7 / span 6', position: 'relative', height: '600px' }}>
              
              {/* Imagen Principal (Vertical) */}
              <motion.div 
                style={{ position: 'absolute', top: '0', right: '10%', width: '65%', height: '80%', zIndex: 2 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <img 
                  src="/assets/hero-dental.jpg" 
                  alt="Modern Clinic" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-hover)' }} 
                />
              </motion.div>

              {/* Imagen Secundaria (Horizontal) */}
              <motion.div 
                style={{ position: 'absolute', bottom: '5%', left: '0', width: '55%', height: '45%', zIndex: 3 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <img 
                  src="/assets/happy-patient.jpg" 
                  alt="Happy Patient" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-hover)', border: '8px solid var(--bg-card)' }} 
                />
              </motion.div>

              {/* Floating Stat Card 1 */}
              <motion.div 
                className="dashboard-card"
                style={{ position: 'absolute', top: '15%', left: '10%', zIndex: 4, padding: '1.5rem', minWidth: '180px' }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} color="var(--success)" />
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--success)' }}>Verificado</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tecnología 3D de Vanguardia</div>
              </motion.div>

              {/* Floating Stat Card 2 */}
              <motion.div 
                className="dashboard-card"
                style={{ position: 'absolute', bottom: '25%', right: '0', zIndex: 4, padding: '1.25rem', background: 'var(--primary)', color: 'white' }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>4.9 ★</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Google Reviews</div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 2. TRUST BANNER: MINIMALISTA ── */}
      <section style={{ padding: '2rem 0', background: 'rgba(255,255,255,0.4)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reconocidos por la excelencia técnica</span>
          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
              <span style={{ fontWeight: 600 }}>15+ Años de Historia</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
              <span style={{ fontWeight: 600 }}>Especialistas Certificados</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
              <span style={{ fontWeight: 600 }}>Protocolos de Bioseguridad</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICIOS: GRID MODERNO ── */}
      <section id="servicios" className="bg-soft" style={{ marginBottom: '4rem' }}>
        <div className="container dashboard-section">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem' }}>Especialidades Dentales</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Ofrecemos soluciones integrales bajo un mismo techo con los estándares clínicos más exigentes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="dashboard-card"
                style={{ padding: '3rem', border: '1px solid transparent', cursor: 'pointer' }}
                whileHover={{ borderColor: 'var(--primary)', translateY: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="btn-icon" style={{ width: '56px', height: '56px', color: 'var(--primary)', background: 'rgba(71, 161, 215, 0.05)', marginBottom: '1.5rem' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE FOCUS: ZIG-ZAG REFINED ── */}
      <section className="container dashboard-section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Gestión del tiempo <br /><span style={{ color: 'var(--primary)' }}>sin esperas.</span></h2>
               <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                 Sabemos que tu tiempo es lo más valioso. Por eso, hemos optimizado cada proceso clínico para garantizar que tu cita comience exactamente cuando fue programada. Sin filas, sin demoras, solo eficiencia.
               </p>
               <div className="dashboard-card" style={{ padding: '1.5rem', background: 'var(--bg-input)', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                  <Clock size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 700 }}>Promedio de espera: 8 minutos</span>
               </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/assets/happy-patient.jpg" alt="Efficiency" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }} />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="bg-soft">
        <div className="container dashboard-section">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem' }}>Voces de nuestros pacientes</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'María García',    text: 'La mejor experiencia dental que he tenido. El personal es increíblemente amable y profesional. Me explicaron cada paso de mi tratamiento.',  role: 'Paciente de Ortodoncia'     },
              { name: 'Juan Pérez',      text: 'Tecnología de primer nivel. Mi blanqueamiento quedó perfecto en una sola sesión. Altamente recomendado para quienes buscan calidad.',     role: 'Paciente de Blanqueamiento' },
              { name: 'Elena Rodríguez', text: 'Excelente trato con los niños. Mis hijos ya no tienen miedo de ir al dentista gracias a la paciencia de la doctora Salas.',                 role: 'Madre de Familia'           },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="dashboard-card"
                style={{ padding: '3rem', position: 'relative' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ color: '#F59E0B', marginBottom: '1.5rem', display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8, fontSize: '1rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Flotante */}
      <a
        href="https://wa.me/50689281259"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: '#10B981', color: 'white', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)', zIndex: 1000, transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Phone size={30} />
      </a>
    </div>
  );
}
