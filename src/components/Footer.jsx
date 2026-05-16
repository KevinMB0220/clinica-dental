import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileFooter from './MobileFooter';

export default function Footer() {
  return (
    <>
      <MobileFooter />
      <footer className="hidden lg:block" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', padding: '6rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Turrialba Dental <span style={{ color: 'var(--primary)' }}>Care</span></h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Excelencia en salud dental con especialistas certificados y laboratorio propio. Comprometidos con tu sonrisa y bienestar en el corazón de Turrialba.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="btn-icon" style={{ width: '40px', height: '40px' }}><Facebook size={18} /></a>
                <a href="#" className="btn-icon" style={{ width: '40px', height: '40px' }}><Instagram size={18} /></a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700 }}>Contacto Directo</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
                  <Phone size={18} color="var(--primary)" />
                  <span>2556-2673 (WhatsApp)</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
                  <MapPin size={18} color="var(--primary)" />
                  <span>Turrialba, Cartago, Costa Rica</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}>
                  <Clock size={18} color="var(--primary)" />
                  <span>Lun - Vie: 8:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700 }}>Especialidades</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="/#servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ortodoncia</a></li>
                <li><a href="/#servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Implantes Dentales</a></li>
                <li><a href="/#servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Odontopediatría</a></li>
                <li><a href="/#servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Quiropodia</a></li>
              </ul>
            </div>

          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div>© {new Date().getFullYear()} Turrialba Dental Care. Todos los derechos reservados.</div>
            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', opacity: 0.6, fontSize: '0.8rem' }}>Acceso Administrativo</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
