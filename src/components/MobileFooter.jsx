import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileFooter() {
  return (
    <footer className="block lg:hidden" style={{ background: 'var(--bg-card)', padding: '2.5rem 1.5rem 6rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
        Turrialba Dental <span style={{ color: 'var(--primary)' }}>Care</span>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <MapPin size={16} color="var(--primary)" /> Turrialba, Cartago
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Clock size={16} color="var(--primary)" /> Lun - Vie: 8:00 AM - 8:00 PM
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
        © {new Date().getFullYear()} Turrialba Dental Care.
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <Link to="/privacidad" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          Privacidad
        </Link>
        <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
        <Link to="/terminos" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
          Términos
        </Link>
        <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
        <Link to="/login" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', opacity: 0.6 }}>
          Admin
        </Link>
      </div>
    </footer>
  );
}
