import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


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
        <Link to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo-clinica.png" alt="Turrialba Dental Care" style={{ height: '64px', width: 'auto', objectFit: 'contain', display: 'block' }} />
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
