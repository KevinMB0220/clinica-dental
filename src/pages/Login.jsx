import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Credenciales inválidas. Por favor intente de nuevo.');
    }
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 90px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#FDFDFF'
    }}>
      {/* Background Decor (Matching Home/Booking) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0], x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(41, 166, 67, 0.04) 0%, transparent 70%)', zIndex: 0 }} 
      />
      <motion.div 
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -45, 0], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(182, 214, 65, 0.03) 0%, transparent 70%)', zIndex: 0 }} 
      />

      <style>{`
        @media (max-width: 640px) {
          .login-card { padding: 2rem 1.5rem !important; border-radius: 24px !important; }
          .login-title { font-size: 1.5rem !important; }
        }
      `}</style>

      <motion.div
        className="dashboard-card login-card"
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 1
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--text-muted)', 
          textDecoration: 'none', 
          fontSize: '0.85rem', 
          fontWeight: 600,
          marginBottom: '2rem',
          width: 'fit-content'
        }}>
          Volver al Inicio
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/logo-clinica.png" alt="Turrialba Dental Care" style={{ height: '72px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
          <h2 className="login-title" style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Acceso Administrativo</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Ingrese sus credenciales de acceso.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              background: 'rgba(239, 68, 68, 0.05)', 
              color: '#dc2626', 
              padding: '0.85rem', 
              borderRadius: '12px', 
              marginBottom: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid rgba(239, 68, 68, 0.1)'
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>
               Usuario
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="admin" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={{ background: 'var(--bg-input)', border: '1.5px solid transparent', borderRadius: '14px', padding: '0.85rem 1rem' }}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block', letterSpacing: '0.05em' }}>
               Contraseña
            </label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ background: 'var(--bg-input)', border: '1.5px solid transparent', borderRadius: '14px', padding: '0.85rem 1rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', borderRadius: '100px', fontWeight: 800, fontSize: '1rem' }}>
            Iniciar Sesión
          </button>
        </form>
      </motion.div>
    </div>
  );
}
