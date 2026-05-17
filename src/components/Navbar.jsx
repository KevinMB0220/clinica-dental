import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function ProfessionalToothIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2C16 2 12 3 10 5C8 7 7 10 7 13C7 18 9 22 11 26C12 28 13 31 15 34C16 36 17.5 38 20 38C22.5 38 24 36 25 34C27 31 28 28 29 26C31 22 33 18 33 13C33 10 32 7 30 5C28 3 24 2 20 2ZM20 30C18 30 17 28 16 26C15 24 14 21 14 18C14 15 15 13 17 11C19 9 21 9 23 11C25 13 26 15 26 18C26 21 25 24 24 26C23 28 22 30 20 30Z" fill="var(--primary)" />
      <path d="M20 10C18 10 16 11.5 16 14C16 16.5 17.5 18 20 18C22.5 18 24 16.5 24 14C24 11.5 22 10 20 10Z" fill="white" fillOpacity="0.8" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'clinica', 'servicios', 'equipo'];
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      if (!location.hash) setActiveSection('home');
    }
  }, [location]);

  const navItems = [
    { id: 'home', label: t('nav.home'), path: '/' },
    { id: 'clinica', label: t('nav.clinic'), path: '/#clinica' },
    { id: 'servicios', label: t('nav.services'), path: '/#servicios' },
    { id: 'equipo', label: t('nav.team'), path: '/#equipo' },
  ];

  return (
    <nav className="hidden lg:flex">
      <div className="container flex-between" style={{ width: '100%' }}>
        <Link to="/" className="logo" style={{ gap: '0.75rem' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ProfessionalToothIcon />
          <span className="logo-main" style={{ fontSize: '1.25rem', fontWeight: 800 }}>Turrialba Dental <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Care</span></span>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id} style={{ position: 'relative' }}>
              <a
                href={item.path}
                className={`nav-link-item ${activeSection === item.id ? 'nav-link-active' : ''}`}
                onClick={(e) => {
                  if (item.id === 'home') {
                    e.preventDefault();
                    if (location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    setActiveSection('home');
                  }
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="nav-pill-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>
              {t('nav.logout')}
            </button>
          )}
          <LanguageSwitcher />
          <Link to="/booking" className="btn btn-primary" style={{ padding: '0.7rem 1.4rem', fontSize: '0.85rem' }}>
            {t('nav.bookAppointment')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
