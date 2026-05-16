import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_LINK = "https://wa.me/50625562673";
const specialties = ['Ortodoncia', 'Odontología General', 'Odontopediatría', 'Implantes', 'Endodoncia', 'Periodoncia', 'Quiropodia'];

export default function MobileBooking() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', specialty: specialties[0], date: '', time: '' });

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
      <div className="block lg:hidden" style={{ minHeight: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', background: 'var(--bg-page)' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '2.5rem 1.5rem', borderRadius: '32px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>¡Cita Solicitada!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Te contactaremos pronto para confirmar.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Ir al Inicio</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="block lg:hidden" style={{ background: 'var(--bg-page)', minHeight: '100vh', padding: '2rem 1.5rem 6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1 }}>
          Reserva <br />
          <span style={{ color: 'var(--primary)' }}>tu sonrisa.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
          Déjanos tus datos y te contactaremos para agendar tu cita.
        </p>

        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1rem', borderRadius: '20px', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid var(--border-light)' }}>
          <div style={{ width: '40px', height: '40px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <MessageCircle size={20} />
          </div>
          Agendar rápido por WhatsApp
        </a>

        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>O usa nuestro formulario</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Nombre Completo</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', fontSize: '16px' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Teléfono</label>
              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', fontSize: '16px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Especialidad</label>
              <select value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', fontSize: '16px', appearance: 'none' }}>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Fecha</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', fontSize: '16px' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Hora</label>
                <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', fontSize: '16px' }} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '100px', fontWeight: 800, fontSize: '1rem', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? 'Enviando...' : 'Confirmar'} <ChevronRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
