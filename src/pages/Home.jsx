import { motion } from 'framer-motion';
import { Shield, Star, Clock, Users, ChevronRight, Phone, Sparkles, Activity, Sun, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Odontología General',
    description: 'Se encarga de la atención primaria, diagnóstico, limpiezas y tratamientos preventivos básicos para toda la familia.',
    icon: <Sparkles size={28} strokeWidth={2.5} />,
    image: '/assets/service-cleaning.jpg'
  },
  {
    title: 'Ortodoncia',
    description: 'Diagnostica, previene y corrige los dientes mal alineados y problemas de maloclusión con tecnología de vanguardia.',
    icon: <Activity size={28} strokeWidth={2.5} />,
    image: '/assets/service-orthodontics.jpg'
  },
  {
    title: 'Periodoncia',
    description: 'Se enfoca en la salud de las encías y los tejidos de soporte del diente (hueso) para prevenir enfermedades periodontales.',
    icon: <Shield size={28} strokeWidth={2.5} />,
    image: '/assets/service-periodontics.jpg'
  },
  {
    title: 'Endodoncia',
    description: 'Trata las enfermedades de la pulpa dental y los conductos radiculares mediante tratamientos de conductos precisos.',
    icon: <Zap size={28} strokeWidth={2.5} />,
    image: '/assets/service-endodontics.jpg'
  },
  {
    title: 'Cirugía Oral y Maxilofacial',
    description: 'Maneja extracciones complejas (terceros molares), implantes y cirugías reconstructivas de la boca y mandíbula.',
    icon: <Shield size={28} strokeWidth={2.5} />,
    image: '/assets/service-implants.jpg'
  },
  {
    title: 'Odontopediatría',
    description: 'Especialidad dedicada exclusivamente a la atención dental de niños y adolescentes en un ambiente amigable.',
    icon: <Users size={28} strokeWidth={2.5} />,
    image: '/assets/service-pediatric.jpg'
  },
  {
    title: 'Prostodoncia / Rehabilitación Oral',
    description: 'Se especializa en diseñar y colocar prótesis, coronas y puentes para reemplazar dientes perdidos y devolver la función.',
    icon: <Star size={28} strokeWidth={2.5} />,
    image: '/assets/service-implants.jpg'
  }
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ marginBottom: '2rem' }}>
              Sonrisas que <br />
              <span style={{ 
                background: 'linear-gradient(to right, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '800'
              }}>Cuentan Historias</span>
            </h1>
            <p>Especialistas en todas las ramas de la odontología moderna. Brindamos atención integral, desde prevención básica hasta rehabilitaciones complejas, con la calidez y profesionalismo que tu sonrisa merece.</p>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <Link to="/booking" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                Agendar Cita <ChevronRight size={20} />
              </Link>
              <a href="#servicios" className="btn btn-outline" style={{ padding: '1rem 2rem' }}>Ver Servicios</a>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            <img 
              src="/assets/hero-dental.jpg" 
              alt="Clínica Dental Moderna" 
              style={{ width: '100%', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Ofrecemos una amplia gama de tratamientos odontológicos especializados para toda la familia.</p>
          </div>
          
          <div className="services-container">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="glass-card service-card-horizontal"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="service-image-wrapper">
                  <img src={service.image} alt={service.title} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.2))' }}></div>
                </div>
                <div className="service-content">
                  <div className="icon-box">
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary)' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                    {service.description}
                  </p>
                  <Link to="/booking" className="btn btn-primary" style={{ width: 'fit-content' }}>
                    Agendar Evaluación <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <div className="container">
          <div className="feature-grid">
             <div style={{ position: 'relative' }}>
                <img 
                  src="/assets/happy-patient.jpg" 
                  alt="Paciente Feliz" 
                  style={{ width: '100%', borderRadius: '2rem' }}
                />
             </div>
             <div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>¿Por qué elegirnos?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div className="feature-item" style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', height: 'fit-content', flexShrink: 0 }}>
                      <Clock size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4>Atención Inmediata</h4>
                      <p>Valoramos tu tiempo. Mantenemos una puntualidad rigurosa en todas nuestras citas.</p>
                    </div>
                  </div>
                  <div className="feature-item" style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', height: 'fit-content', flexShrink: 0 }}>
                      <Shield size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4>Garantía de Calidad</h4>
                      <p>Utilizamos materiales de primera y las técnicas más avanzadas del mercado.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-title">
            <h2>Lo que dicen nuestros pacientes</h2>
            <p>La confianza de nuestros pacientes es nuestro mayor logro.</p>
          </div>
          
          <div className="grid-3">
            {[
              { name: 'María García', text: 'La mejor experiencia dental que he tenido. El personal es increíblemente amable y profesional.', role: 'Paciente de Ortodoncia' },
              { name: 'Juan Pérez', text: 'Increíble tecnología. Mi blanqueamiento quedó perfecto en una sola sesión. Muy recomendado.', role: 'Paciente de Blanqueamiento' },
              { name: 'Elena Rodríguez', text: 'Excelente trato con los niños. Mis hijos ya no tienen miedo de ir al dentista.', role: 'Madre de Familia' }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                className="glass-card" 
                style={{ padding: '2rem' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-main)' }}>"{t.text}"</p>
                <div>
                  <h4 style={{ marginBottom: '0.1rem' }}>{t.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#25D366',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Phone size={30} />
      </a>
    </div>
  );
}
