import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, ChevronRight } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const services = [
  'General Dentistry', 'Orthodontics', 'Periodontics', 'Pediatric', 'Implants', 'Teeth Whitening'
];

export default function Booking() {
  const { addAppointment } = useAppointments();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: services[0], date: '', time: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      setFormData(prev => ({ ...prev, name: user.name || '', email: user.email || '' }));
    }
  }, [user, navigate, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({ ...formData, userId: user.email });
    setSubmitted(true);
  };

  if (!user) return null;

  if (submitted) {
    return (
      <div className="container dashboard-section flex-center" style={{ minHeight: '60vh' }}>
        <motion.div 
          className="dashboard-card" 
          style={{ padding: '4rem 3rem', maxWidth: '500px', textAlign: 'center' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="flex-center" style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', margin: '0 auto 2rem' }}>
            <CheckCircle size={40} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Thank you {user.name.split(' ')[0]}, your request has been successfully submitted. You can track its status in your dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => navigate('/admin')} className="btn btn-primary">View Dashboard</button>
            <button onClick={() => setSubmitted(false)} className="btn btn-outline">Book Another</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="container dashboard-section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Schedule Appointment</h2>
          <p style={{ color: 'var(--text-muted)' }}>Hello <strong>{user.name.split(' ')[0]}</strong>, fill out the form below to request a new visit.</p>
        </div>

        <motion.form
          className="dashboard-card"
          style={{ padding: '3rem' }}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid-2" style={{ gap: '2rem 1.5rem', marginBottom: '2rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label><User size={14} style={{ marginRight: '4px' }}/> Full Name</label>
              <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label><Phone size={14} style={{ marginRight: '4px' }}/> Phone Number</label>
              <input type="tel" className="form-control" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label><Mail size={14} style={{ marginRight: '4px' }}/> Email Address</label>
              <input type="email" className="form-control" readOnly style={{ opacity: 0.7 }} value={formData.email} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Service</label>
              <select className="form-control" value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})}>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label><Calendar size={14} style={{ marginRight: '4px' }}/> Date</label>
              <input type="date" className="form-control" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label><Clock size={14} style={{ marginRight: '4px' }}/> Time</label>
              <input type="time" className="form-control" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
            Confirm Booking <ChevronRight size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
