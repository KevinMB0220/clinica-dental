import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es as esLocale } from 'date-fns/locale/es';
import { enUS } from 'date-fns/locale/en-US';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', esLocale);
registerLocale('en', enUS);

const countryCodes = [
  { code: '+506', label: 'CR', flag: '🇨🇷' },
  { code: '+507', label: 'PA', flag: '🇵🇦' },
  { code: '+505', label: 'NI', flag: '🇳🇮' },
  { code: '+504', label: 'HN', flag: '🇭🇳' },
  { code: '+502', label: 'GT', flag: '🇬🇹' },
  { code: '+503', label: 'SV', flag: '🇸🇻' },
  { code: '+52', label: 'MX', flag: '🇲🇽' },
  { code: '+1', label: 'US', flag: '🇺🇸' },
  { code: '+1', label: 'CA', flag: '🇨🇦' },
  { code: '+34', label: 'ES', flag: '🇪🇸' },
  { code: '+57', label: 'CO', flag: '🇨🇴' },
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 19; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const formattedHour = displayHour.toString().padStart(2, '0');
    slots.push(`${formattedHour}:00 ${period}`);
    slots.push(`${formattedHour}:30 ${period}`);
  }
  slots.push('08:00 PM');
  return slots;
};

const timeSlots = generateTimeSlots();

const slotToMinutes = (slot) => {
  const [time, period] = slot.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

const getAvailableSlots = (date, slots) => {
  if (!date) return slots;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const selStr = date instanceof Date
    ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
    : date;
  if (selStr !== todayStr) return slots;
  const minMinutes = today.getHours() * 60 + today.getMinutes() + 30;
  return slots.filter(s => slotToMinutes(s) >= minMinutes);
};

const getMinBookingDate = () => {
  const today = new Date();
  const minMinutes = today.getHours() * 60 + today.getMinutes() + 30;
  const hasSlotsToday = timeSlots.some(s => slotToMinutes(s) >= minMinutes);
  if (hasSlotsToday) return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
};

export default function Booking() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const specialties = t('booking.specialties', { returnObjects: true });
  const dateFormat = t('booking.dateFormat');
  const dpLocale = i18n.language?.startsWith('en') ? 'en' : 'es';

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', countryCode: '+506', specialty: '',
    date: getMinBookingDate(), time: '', description: ''
  });

  const selectedSpecialty = formData.specialty || (Array.isArray(specialties) ? specialties[0] : '');

  const DateInputCustom = React.forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{ background: 'var(--bg-input)', border: '1.5px solid transparent', borderRadius: '12px', padding: '0.75rem 1rem', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
    >
      <span style={{ color: value ? 'var(--text-main)' : 'var(--text-muted)' }}>{value || t('booking.fields.selectDate')}</span>
      <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>📅</span>
    </div>
  ));
  DateInputCustom.displayName = 'DateInputCustom';

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      triggerConfetti();
    }, 1200);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 90px)',
      background: '#FDFDFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
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
        .react-datepicker { font-family: inherit; border-radius: 20px; border: 1px solid var(--border-light); box-shadow: 0 15px 35px rgba(0,0,0,0.1); overflow: hidden; font-size: 0.95rem; }
        .react-datepicker__header { background: white; border-bottom: 1px solid var(--border-light); padding-top: 1rem; }
        .react-datepicker__day--selected { background-color: var(--primary) !important; border-radius: 50%; }
        .react-datepicker__day:hover { border-radius: 50%; }
        .react-datepicker__navigation { top: 15px; }
        .react-datepicker-wrapper, .react-datepicker__input-container { width: 100%; }

        @media (max-width: 1024px) {
          .booking-container { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .booking-info { text-align: center; }
          .booking-info h1 { font-size: 2.5rem !important; }
          .booking-info p { margin: 0 auto 2rem !important; }
          .whatsapp-btn { margin: 0 auto !important; }
          .info-box { margin: 0 auto !important; }
        }
      `}</style>

      <div className="container booking-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '6rem',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>

        {/* INFO COLUMN */}
        <div className="booking-info">
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            {t('booking.title')} <br />
            <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>{t('booking.titleItalic')}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.5 }}>
            {t('booking.subtitle')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <a href="https://wa.me/50625562673" target="_blank" rel="noreferrer" className="btn btn-primary whatsapp-btn" style={{ width: 'fit-content', padding: '1rem 2rem' }}>
                {t('booking.whatsappBtn')}
             </a>

             <div className="info-box" style={{ padding: '1.25rem', background: 'white', borderRadius: '24px', maxWidth: '350px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                   <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{t('booking.phoneTitle')}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, paddingLeft: '2.75rem' }}>
                  {t('booking.phoneHours')} <br />
                  {t('booking.phoneSaturday')}
                </p>
             </div>
          </div>
        </div>

        {/* FORM COLUMN */}
        <div className="dashboard-card">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.name')}</label>
                    <input type="text" className="form-control" placeholder={t('booking.fields.namePlaceholder')} required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.email')}</label>
                    <input type="email" className="form-control" placeholder={t('booking.fields.emailPlaceholder')} required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.phone')}</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select style={{ width: '100px', borderRadius: '12px', background: 'var(--bg-input)', border: 'none', fontWeight: 700, fontSize: '0.85rem' }} value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})}>
                        {countryCodes.map(c => <option key={c.label + c.code} value={c.code}>{c.flag} {c.code}</option>)}
                      </select>
                      <input type="tel" className="form-control" placeholder="8888-8888" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ flex: 1 }} />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.specialty')}</label>
                    <select className="form-control" value={selectedSpecialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})}>
                      {Array.isArray(specialties) && specialties.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', gridColumn: 'span 2' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.date')}</label>
                      <DatePicker
                        selected={formData.date}
                        onChange={(date) => {
                          const avail = getAvailableSlots(date, timeSlots);
                          setFormData({ ...formData, date, time: avail.includes(formData.time) ? formData.time : '' });
                        }}
                        locale={dpLocale}
                        dateFormat={dateFormat}
                        minDate={getMinBookingDate()}
                        customInput={<DateInputCustom />}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.time')}</label>
                      <select className="form-control" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
                        <option value="">{t('booking.fields.timePlaceholder')}</option>
                        {getAvailableSlots(formData.date, timeSlots).map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>{t('booking.fields.notes')}</label>
                    <textarea className="form-control" placeholder={t('booking.fields.notesPlaceholder')} rows="1" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ resize: 'none' }}></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 800, marginTop: '1.5rem' }}>
                  {loading ? t('booking.submitting') : t('booking.submit')}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-main)' }}>{t('booking.successTitle')}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 }}>
                  {t('booking.successDesc')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>{t('booking.backHome')}</button>
                  <a href="https://wa.me/50625562673" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>{t('booking.urgentWhatsapp')}</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
