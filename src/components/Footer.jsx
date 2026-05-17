import { Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MobileFooter from './MobileFooter';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <MobileFooter />
      <footer className="hidden lg:block" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-light)', padding: '6rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div>
              <img src="/logo-clinica.png" alt="Turrialba Dental Care" style={{ height: '90px', width: 'auto', objectFit: 'contain', marginBottom: '1.25rem', display: 'block' }} />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>{t('footer.description')}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="btn-icon" aria-label="Facebook" style={{ width: '40px', height: '40px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="btn-icon" aria-label="Instagram" style={{ width: '40px', height: '40px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700 }}>{t('footer.contactTitle')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}><Phone size={18} color="var(--primary)" /><span>{t('footer.phone')}</span></li>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}><MapPin size={18} color="var(--primary)" /><span>{t('footer.location')}</span></li>
                <li style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)' }}><Clock size={18} color="var(--primary)" /><span>{t('footer.schedule')}</span></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700 }}>{t('footer.specialtiesTitle')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['services.items.orthodontics.title', 'services.items.implants.title', 'services.items.pediatric.title', 'services.items.chiropody.title'].map(key => (
                  <li key={key}><a href="/#servicios" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t(key)}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>© {new Date().getFullYear()} Turrialba Dental Care. {t('footer.copyright')}</div>
            <nav aria-label="Documentos legales" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/privacidad" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
              <Link to="/terminos" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.terms')}</Link>
              <Link to="/cookies" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.cookies')}</Link>
              <Link to="/accesibilidad" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.accessibility')}</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', opacity: 0.6 }}>{t('footer.adminAccess')}</Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
