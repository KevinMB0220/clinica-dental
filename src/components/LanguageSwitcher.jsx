import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'es';

  const toggle = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bg-input)',
      borderRadius: '100px',
      padding: '3px',
      gap: '2px',
    }}>
      {['es', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => toggle(lang)}
          style={{
            border: 'none',
            cursor: 'pointer',
            padding: compact ? '0.25rem 0.6rem' : '0.3rem 0.75rem',
            borderRadius: '100px',
            fontSize: compact ? '0.65rem' : '0.7rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            transition: 'all 0.15s ease',
            background: current === lang ? 'white' : 'transparent',
            color: current === lang ? 'var(--primary)' : 'var(--text-muted)',
            boxShadow: current === lang ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
