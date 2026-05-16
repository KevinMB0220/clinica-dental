import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_LINK = "https://wa.me/50625562673";

const specialties = [
  'Ortodoncia', 'Odontología General', 'Odontopediatría', 'Implantes', 'Endodoncia', 'Periodoncia', 'Quiropodia'
];

export default function Booking() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', specialty: specialties[0], date: '', time: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div style={{ height: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div 
          className="dashboard-card" 
          style={{ padding: '3rem', maxWidth: '500px', textAlign: 'center', border: '1px solid var(--success)' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="flex-center" style={{ width: '70px', height: '70px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={32} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>¡Cita Solicitada!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>Nos comunicaremos contigo pronto para confirmar.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%' }}>Regresar al Inicio</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 90px)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* INFO COLUMN */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Reserva hoy, <br />
            <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>sonríe siempre.</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '400px', lineHeight: 1.5 }}>
            Completa tus datos y un especialista se pondrá en contacto contigo.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                   <MessageCircle size={20} />
                </div>
                Agenda vía WhatsApp
             </a>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--bg-input)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Clock size={18} />
                </div>
                Respuesta en menos de 2 horas
             </div>
          </div>
        </motion.div>

        {/* FORM COLUMN */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <form className="dashboard-card" style={{ padding: '2.5rem', borderRadius: '32px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }} onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Nombre</label>
                <input type="text" className="form-control" placeholder="Nombre completo" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Email</label>
                <input type="email" className="form-control" placeholder="tu@correo.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Teléfono</label>
                <input type="tel" className="form-control" placeholder="8888-8888" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Especialidad</label>
                <select className="form-control" value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} style={{ height: '44px' }}>
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Fecha</label>
                <input type="date" className="form-control" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Hora</label>
                <input type="time" className="form-control" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Contexto adicional <span style={{ fontWeight: 400, opacity: 0.6 }}>(Opcional)</span></label>
              <textarea 
                className="form-control" 
                placeholder="Cuéntanos sobre tu malestar o motivo de consulta..." 
                rows="2" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading ? 'Solicitando...' : 'Confirmar Cita'} <ChevronRight size={18} />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
