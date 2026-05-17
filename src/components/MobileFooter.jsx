import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MobileFooter() {
  const { t } = useTranslation();
  return (
    <footer className="block lg:hidden" style={{ background: 'var(--bg-card)', padding: '2.5rem 1.5rem 6rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
        Turrialba Dental <span style={{ color: 'var(--primary)' }}>Care</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <MapPin size={16} color="var(--primary)" /> {t('footer.mobileLocation')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Clock size={16} color="var(--primary)" /> {t('footer.mobileSchedule')}
        </div>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
        © {new Date().getFullYear()} Turrialba Dental Care. {t('footer.copyright')}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <Link to="/privacidad" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.privacy')}</Link>
        <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
        <Link to="/terminos" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.terms')}</Link>
        <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
        <Link to="/login" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', opacity: 0.6 }}>{t('footer.adminAccess')}</Link>
      </div>
    </footer>
  );
}
