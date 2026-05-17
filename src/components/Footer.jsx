import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
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
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Turrialba Dental <span style={{ color: 'var(--primary)' }}>Care</span></h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>{t('footer.description')}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="btn-icon" style={{ width: '40px', height: '40px' }}><Facebook size={18} /></a>
                <a href="#" className="btn-icon" style={{ width: '40px', height: '40px' }}><Instagram size={18} /></a>
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
