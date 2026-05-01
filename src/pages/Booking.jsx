import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, ChevronRight, CheckCircle } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const services = [
  'Odontología General',
  'Estética',
  'Ortodoncia',
  'Prostodoncia (Prótesis dentales)',
  'Odontopediatría',
  'Exodoncia',
  'Cirugía Maxilofacial',
  'Endodoncia',
  'Periodoncia',
  'Dolor Orofacial',
  'Implantes Dentales',
  'Implantología'
];

export default function Booking() {
  const { addAppointment } = useAppointments();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0],
    date: '',
    time: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      ...formData,
      userId: user.email // Track which user made the appointment
    });
    setSubmitted(true);
  };

  if (!user) return null;

  if (submitted) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          className="glass-card" 
          style={{ padding: '3rem', maxWidth: '500px' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <CheckCircle size={64} className="text-accent" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>¡Cita Agendada!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Hola {user.name}, hemos recibido tu solicitud. Podrás ver tus citas en tu perfil.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => navigate('/admin')} className="btn btn-primary">Ver mis citas</button>
            <button onClick={() => setSubmitted(false)} className="btn btn-outline">Agendar otra</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="booking-page">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-title">
            <h2>Agenda tu Cita</h2>
            <p>Hola <strong>{user.name}</strong>, completa los detalles para tu próxima visita.</p>
          </div>

          <motion.form 
            className="glass-card" 
            style={{ padding: '3rem' }}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid-3" style={{ gap: '1.5rem' }}>
              <div className="form-group">
                <label><User size={16} /> Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label><Phone size={16} /> Teléfono</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  readOnly
                  style={{ backgroundColor: '#f1f5f9' }}
                  value={formData.email}
                />
              </div>
              <div className="form-group">
                <label>Servicio</label>
                <select 
                  className="form-control" 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label><Calendar size={16} /> Fecha Preferida</label>
                <input 
                  type="date" 
                  className="form-control" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label><Clock size={16} /> Hora Preferida</label>
                <input 
                  type="time" 
                  className="form-control" 
                  required 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Confirmar Reserva <ChevronRight size={20} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
