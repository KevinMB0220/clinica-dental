import { Link } from 'react-router-dom';
import { Stethoscope, User, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="logo">
          <Stethoscope size={32} />
          <span>Turrialba Dental Care</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/#servicios">Servicios</Link></li>
          <li><Link to="/booking">Agendar Cita</Link></li>
          {user && (
            <>
              <li><Link to="/admin">{user.role === 'admin' ? 'Panel Admin' : 'Mis Citas'}</Link></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>Hola, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                  <LogOut size={18} />
                  Cerrar
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
