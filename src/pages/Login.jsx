import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ChevronRight, AlertCircle, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Get redirect path or default to home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isRegister) {
      if (register(name, email, password)) {
        navigate(from, { replace: true });
      } else {
        setError('El correo ya está registrado.');
      }
    } else {
      if (login(email, password)) {
        navigate(from, { replace: true });
      } else {
        setError('Credenciales incorrectas. (Admin: admin@clinica.com / admin123)');
      }
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '450px' }}>
        <motion.div 
          className="glass-card" 
          style={{ padding: '3rem' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {isRegister ? 'Únete a Turrialba Dental Care para gestionar tus citas' : 'Bienvenido de nuevo a Turrialba Dental Care'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode='wait'>
              {isRegister && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="form-group"
                >
                  <label><User size={16} /> Nombre Completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label><Mail size={16} /> Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label><Lock size={16} /> Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              {isRegister ? 'Registrarse' : 'Entrar'} <ChevronRight size={20} />
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
            >
              {isRegister ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate aquí'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
