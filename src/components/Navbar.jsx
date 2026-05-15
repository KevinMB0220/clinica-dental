import { Link, useLocation } from 'react-router-dom';
import { LogOut, CalendarCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ToothLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-icon"
    >
      <path
        d="M9 11.5C9 7.8 11.8 5 15 6C17 6.7 18.5 7.5 20 7.5C21.5 7.5 23 6.7 25 6C28.2 5 31 7.8 31 11.5C31 16.5 28.8 21.5 27.5 26C26.8 28.5 26.2 31 25 33.5C24.3 35 23.2 36 21.5 36C19.8 36 19.2 34.2 18.7 32.5C18.2 30.8 20 29 20 29C20 29 21.8 30.8 21.3 32.5C20.8 34.2 20.2 36 18.5 36C16.8 36 15.7 35 15 33.5C13.8 31 13.2 28.5 12.5 26C11.2 21.5 9 16.5 9 11.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'nav-link-item nav-link-active' : 'nav-link-item';

  return (
    <nav>
      <div className="container flex-between" style={{ width: '100%' }}>
        {/* ── Logo ── */}
        <Link to="/" className="logo">
          <ToothLogo />
          <span className="logo-main">Turrialba Dental</span>
        </Link>

        {/* ── Nav links ── */}
        <ul className="nav-links" style={{ background: 'var(--bg-card)', padding: '0.5rem', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)' }}>
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <a href="/#servicios" className="nav-link-item">
              Services
            </a>
          </li>
          {user && (
            <li>
              <Link to="/admin" className={isActive('/admin')}>
                {user.role === 'admin' ? 'Analytics' : 'Appointments'}
              </Link>
            </li>
          )}
        </ul>

        {/* ── Right actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-card)', padding: '0.4rem 1rem 0.4rem 0.4rem', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                 {user.name.charAt(0)}
               </div>
               <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{user.name.split(' ')[0]}</span>
               <button onClick={logout} className="btn-icon" style={{ background: 'transparent', boxShadow: 'none', width: 'auto', height: 'auto', color: 'var(--text-muted)' }}>
                 <LogOut size={16} />
               </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link-item">
              Login
            </Link>
          )}

          <Link to="/booking" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            Schedule <CalendarCheck size={16} style={{ marginLeft: '4px' }}/>
          </Link>
        </div>
      </div>
    </nav>
  );
}
