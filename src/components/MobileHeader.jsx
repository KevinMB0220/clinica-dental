import { Link } from 'react-router-dom';

function ProfessionalToothIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2C16 2 12 3 10 5C8 7 7 10 7 13C7 18 9 22 11 26C12 28 13 31 15 34C16 36 17.5 38 20 38C22.5 38 24 36 25 34C27 31 28 28 29 26C31 22 33 18 33 13C33 10 32 7 30 5C28 3 24 2 20 2ZM20 30C18 30 17 28 16 26C15 24 14 21 14 18C14 15 15 13 17 11C19 9 21 9 23 11C25 13 26 15 26 18C26 21 25 24 24 26C23 28 22 30 20 30Z"
        fill="var(--primary)" />
      <path d="M20 10C18 10 16 11.5 16 14C16 16.5 17.5 18 20 18C22.5 18 24 16.5 24 14C24 11.5 22 10 20 10Z" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

export default function MobileHeader() {
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
      borderBottom: '1px solid rgba(71, 161, 215, 0.08)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <ProfessionalToothIcon />
        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Turrialba <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Care</span>
        </span>
      </Link>

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
          boxShadow: '0 4px 12px rgba(41, 166, 67, 0.2)'
        }}
      >
        Agendar
      </Link>
    </header>
  );
}
