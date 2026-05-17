import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


export default function MobileHeader() {
  const { t } = useTranslation();
  return (
    <header className="flex lg:hidden" style={{
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      background: 'rgba(253, 253, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(71, 161, 215, 0.08)',
      gap: '0.75rem'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
        <img src="/logo-clinica.png" alt="Turrialba Dental Care" style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LanguageSwitcher compact />
        <Link
          to="/booking"
          style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(41, 166, 67, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          {t('nav.bookAppointment')}
        </Link>
      </div>
    </header>
  );
}
