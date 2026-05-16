import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { motion, AnimatePresence } from 'framer-motion';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const SLOT_WIDTH = 130;
const PILL_H = 44;
const PILL_GAP = 6;
const ROW_PADDING = 16;
const DURATIONS = [30, 60, 90, 120];

const SPECIALTIES = ['Ortodoncia', 'Odontología General', 'Odontopediatría', 'Implantes', 'Endodoncia', 'Periodoncia', 'Quiropodia'];
const COUNTRY_CODES = [
  { code: '+506', flag: '🇨🇷' }, { code: '+507', flag: '🇵🇦' }, { code: '+505', flag: '🇳🇮' },
  { code: '+504', flag: '🇭🇳' }, { code: '+502', flag: '🇬🇹' }, { code: '+503', flag: '🇸🇻' },
  { code: '+52', flag: '🇲🇽' }, { code: '+1', flag: '🇺🇸' }, { code: '+57', flag: '🇨🇴' },
];
const TIME_SLOTS = (() => {
  const s = [];
  for (let h = 8; h <= 19; h++) {
    const p = h >= 12 ? 'PM' : 'AM';
    const d = (h > 12 ? h - 12 : h).toString().padStart(2, '0');
    s.push(`${d}:00 ${p}`, `${d}:30 ${p}`);
  }
  s.push('08:00 PM');
  return s;
})();

const STATUS_COLOR = {
  confirmed: 'var(--primary)',
  pending: '#F59E0B',
  rejected: '#EF4444',
};

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const str = timeStr.trim();
  if (str.includes('AM') || str.includes('PM')) {
    const [time, period] = str.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
};

const computeLevels = (apps) => {
  const sorted = [...apps].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
  const result = [];
  sorted.forEach(app => {
    const start = parseTimeToMinutes(app.time);
    const end = start + (app.duration || 30);
    let level = 0;
    while (result.some(r => {
      const rs = parseTimeToMinutes(r.time);
      return r.level === level && rs < end && (rs + (r.duration || 30)) > start;
    })) level++;
    result.push({ ...app, level });
  });
  return result;
};

const getRowHeight = (maxLevel) => ROW_PADDING + (maxLevel + 1) * (PILL_H + PILL_GAP);

const todayDateStr = () => new Date().toISOString().split('T')[0];

const getAvailableSlots = (dateStr) => {
  if (!dateStr) return TIME_SLOTS;
  if (dateStr !== todayDateStr()) return TIME_SLOTS;
  const now = new Date();
  const minMinutes = now.getHours() * 60 + now.getMinutes() + 30;
  return TIME_SLOTS.filter(s => parseTimeToMinutes(s) >= minMinutes);
};

// Returns true if a date+time combination is in the valid bookable future (>= now + 30 min)
const isDateTimeFuture = (dateStr, timeStr) => {
  if (!dateStr) return false;
  const today = todayDateStr();
  if (dateStr > today) return true;
  if (dateStr < today) return false;
  const now = new Date();
  const minMinutes = now.getHours() * 60 + now.getMinutes() + 30;
  return parseTimeToMinutes(timeStr) >= minMinutes;
};

const calendarStyles = `
  .admin-page-container { display: flex; flex-direction: column; height: 100vh; width: 100%; overflow: hidden; background: #FDFDFF; }

  .admin-header-premium {
    background: white;
    padding: 0 3rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    height: 90px;
    flex-shrink: 0;
  }

  .stat-card-top { background: #F8F9FA; padding: 0.6rem 1.25rem; border-radius: 14px; display: flex; flex-direction: column; min-width: 120px; border: 1px solid rgba(0,0,0,0.03); }
  .stat-card-top .label { font-size: 0.55rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .stat-card-top .value { font-size: 1.25rem; font-weight: 900; color: var(--text-main); line-height: 1.2; }

  .admin-content-body { flex: 1; display: flex; overflow: hidden; position: relative; width: 100%; }

  .calendar-main-area { flex: 1; display: flex; flex-direction: column; padding: 1rem 2rem; min-width: 0; gap: 0.75rem; }

  .status-legend { display: flex; gap: 1.25rem; align-items: center; padding: 0.5rem 0; }
  .status-legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  .timeline-wrapper { position: relative; background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); overflow: hidden; display: flex; flex-direction: column; border: 1px solid rgba(0,0,0,0.06); }

  .timeline-viewport { overflow-x: auto; overflow-y: auto; position: relative; }

  .view-btn { border: none; background: transparent; font-size: 0.7rem; font-weight: 700; padding: 0.5rem 1.25rem; border-radius: 9px; cursor: pointer; color: var(--text-muted); transition: all 0.15s ease; letter-spacing: 0.04em; }
  .view-btn.active { background: white; color: var(--primary); box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-weight: 900; }

  .timeline-grid { display: grid; grid-template-columns: 140px repeat(${HOURS.length * 2}, ${SLOT_WIDTH}px); position: relative; width: max-content; }

  .timeline-header-cell { position: sticky; top: 0; background: white; z-index: 50; padding: 1rem; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid rgba(0,0,0,0.08); text-align: center; }

  .timeline-day-label { position: sticky; left: 0; background: white; z-index: 40; padding: 0 1.5rem; font-weight: 900; font-size: 0.85rem; border-right: 1px solid rgba(0,0,0,0.08); border-bottom: 1px solid rgba(0,0,0,0.04); min-width: 140px; flex-shrink: 0; display: flex; align-items: center; color: var(--text-main); }

  .timeline-day-row { grid-column: 1 / -1; display: flex; position: relative; }
  .timeline-cell { border-right: 1px solid rgba(0,0,0,0.02); border-bottom: 1px solid rgba(0,0,0,0.04); flex-shrink: 0; width: ${SLOT_WIDTH}px; }
  .timeline-day-row:last-child .timeline-cell { border-bottom: none; }
  .timeline-day-row:last-child .timeline-day-label { border-bottom: none; }

  .now-line { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--primary); z-index: 60; pointer-events: none; }
  .now-line::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 8px; height: 8px; border-radius: 50%; background: var(--primary); }

  .appointment-pill { position: absolute; height: ${PILL_H}px; border-radius: 22px; padding: 0 1rem; display: flex; align-items: center; font-size: 0.72rem; font-weight: 800; color: white; box-shadow: 0 3px 10px rgba(0,0,0,0.12); z-index: 30; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: filter 0.15s; }
  .appointment-pill:hover { filter: brightness(1.1); }

  .right-management-sidebar { width: 420px; background: white; border-left: 1px solid rgba(0,0,0,0.06); display: flex; flex-direction: column; z-index: 200; flex-shrink: 0; overflow-y: auto; }

  .day-table { width: 100%; border-collapse: collapse; }
  .day-table th { text-align: left; padding: 1.25rem; font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 800; border-bottom: 1px solid rgba(0,0,0,0.05); }
  .day-table td { padding: 1.25rem; font-size: 0.85rem; border-bottom: 1px solid rgba(0,0,0,0.03); }

  .duration-btn { flex: 1; padding: 0.5rem 0.25rem; border-radius: 8px; font-size: 0.72rem; font-weight: 800; cursor: pointer; transition: all 0.15s; }

  .confirm-box { padding: 1rem 1.25rem; border-radius: 12px; background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.15); }

  /* Month Calendar */
  .fc-theme-standard .fc-scrollgrid { border: none !important; }
  .fc-daygrid-day { border: 1px solid rgba(0,0,0,0.03) !important; cursor: pointer; }
  .fc-daygrid-day:hover { background: rgba(22,163,74,0.04) !important; }
  .fc-view-harness { border-bottom: 1px solid rgba(0,0,0,0.05) !important; }
  .fc-col-header-cell-cushion { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); text-decoration: none; }
  .fc-daygrid-day-number { font-size: 0.8rem; font-weight: 700; color: var(--text-main); text-decoration: none; padding: 0.5rem 0.75rem; }
  .fc-toolbar-title { font-size: 1rem !important; font-weight: 900 !important; letter-spacing: -0.02em; text-transform: capitalize; }
  .fc-toolbar { padding: 1rem 1.25rem !important; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 0 !important; }
  .fc-button { background: transparent !important; border: 1px solid rgba(0,0,0,0.1) !important; color: var(--text-main) !important; font-size: 0.7rem !important; font-weight: 800 !important; border-radius: 8px !important; padding: 0.35rem 0.75rem !important; box-shadow: none !important; text-transform: uppercase !important; letter-spacing: 0.04em; }
  .fc-button:hover { background: var(--bg-input) !important; }
  .fc-button-active, .fc-button:active { background: var(--primary) !important; color: white !important; border-color: var(--primary) !important; }
  .fc-today-button { opacity: 1 !important; }
  .fc-daygrid-day.fc-day-today { background: rgba(22,163,74,0.05) !important; }
  .fc-event { border-radius: 6px !important; border: none !important; font-size: 0.7rem !important; font-weight: 700 !important; padding: 2px 6px !important; cursor: pointer; }
`;

export default function Admin() {
  const { appointments, addAppointment, updateAppointment } = useAppointments();
  const viewportRef = useRef(null);

  const [viewMode, setViewMode] = useState('timeline');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newForm, setNewForm] = useState({ name: '', email: '', phone: '', countryCode: '+506', service: SPECIALTIES[0], date: '', time: '', description: '' });
  const [editDuration, setEditDuration] = useState(30);
  const [editFields, setEditFields] = useState({ email: '', phone: '', countryCode: '+506', date: '', time: '', service: SPECIALTIES[0], description: '' });
  const [confirm, setConfirm] = useState(null); // { type: 'reject' | 'delete' }

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const getTimeX = (timeStr) => {
    const minutes = parseTimeToMinutes(timeStr);
    return (minutes - 8 * 60) * (SLOT_WIDTH / 30) + 140;
  };

  const getPillWidth = (duration = 30) => (duration || 30) * (SLOT_WIDTH / 30);

  const nowLineX = useMemo(() => {
    const h = now.getHours();
    const m = now.getMinutes();
    if (h < 8 || h >= 20) return null;
    return (h * 60 + m - 8 * 60) * (SLOT_WIDTH / 30) + 140;
  }, [now]);

  useEffect(() => {
    if (viewMode === 'timeline' && viewportRef.current && nowLineX !== null) {
      viewportRef.current.scrollLeft = nowLineX - viewportRef.current.offsetWidth / 2;
    }
  }, [viewMode]);

  const stats = useMemo(() => ({
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
  }), [appointments]);

  const todayStr = now.toISOString().split('T')[0];
  const activeDayStr = selectedDate || todayStr;
  const dayAppointments = useMemo(() => appointments.filter(a => a.date === activeDayStr), [appointments, activeDayStr]);

  const openEvent = (app) => {
    setSelectedEvent(app);
    setEditDuration(app.duration || 30);
    setEditFields({ email: app.email || '', phone: app.phone || '', countryCode: app.countryCode || '+506', date: app.date || '', time: app.time || '', service: app.service || SPECIALTIES[0], description: app.description || '' });
    setConfirm(null);
    setIsRightSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsRightSidebarOpen(false);
    setSelectedEvent(null);
    setConfirm(null);
  };

  const handleApprove = () => {
    updateAppointment(selectedEvent.id, { status: 'confirmed', duration: editDuration, ...editFields });
    closeSidebar();
  };

  const handleConfirmAction = () => {
    updateAppointment(selectedEvent.id, { status: 'rejected', ...editFields });
    closeSidebar();
  };

  const badgeStyle = (status) => ({
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.65rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    background: status === 'confirmed' ? 'rgba(22,163,74,0.1)' : status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
    color: STATUS_COLOR[status] || '#888',
  });

  return (
    <div className="admin-page-container">
      <style>{calendarStyles}</style>

      <header className="admin-header-premium">
        <div style={{ flex: '0 0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>Panel de Control</h1>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dental Turrialba</div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <div className="stat-card-top">
            <span className="label">Total</span>
            <span className="value">{stats.total}</span>
          </div>
          <div className="stat-card-top">
            <span className="label">Confirmadas</span>
            <span className="value" style={{ color: STATUS_COLOR.confirmed }}>{stats.confirmed}</span>
          </div>
          <div className="stat-card-top">
            <span className="label">Pendientes</span>
            <span className="value" style={{ color: STATUS_COLOR.pending }}>{stats.pending}</span>
          </div>
          <div className="stat-card-top">
            <span className="label">Rechazadas</span>
            <span className="value" style={{ color: STATUS_COLOR.rejected }}>{stats.rejected}</span>
          </div>
        </div>

        <div style={{ flex: '0 0 auto', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: '12px', gap: '2px' }}>
            <button onClick={() => setViewMode('day')} className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}>DÍA</button>
            <button onClick={() => setViewMode('timeline')} className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}>SEMANA</button>
            <button onClick={() => setViewMode('month')} className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}>MES</button>
          </div>
          <button className="btn btn-primary" onClick={() => { setSelectedEvent(null); setConfirm(null); setIsRightSidebarOpen(true); }} style={{ padding: '0.8rem 1.75rem', fontSize: '0.85rem' }}>NUEVA CITA</button>
        </div>
      </header>

      <div className="admin-content-body">
        <div className="calendar-main-area">

          {/* Color legend */}
          <div className="status-legend">
            {[['confirmed', 'Confirmada'], ['pending', 'Pendiente'], ['rejected', 'Rechazada']].map(([s, label]) => (
              <div key={s} className="status-legend-item">
                <span className="status-dot" style={{ background: STATUS_COLOR[s] }} />
                {label}
              </div>
            ))}
          </div>

          <div className="timeline-wrapper" style={{ flex: viewMode === 'timeline' ? '0 0 auto' : '1' }}>
            <div className="timeline-viewport" ref={viewportRef} style={{ overflowY: viewMode === 'timeline' ? 'hidden' : 'auto', flex: viewMode !== 'timeline' ? '1' : undefined }}>

              {viewMode === 'day' ? (
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontWeight: 900, marginBottom: '1.5rem' }}>
                    {activeDayStr === todayStr ? `Agenda de Hoy — ${activeDayStr}` : `Agenda — ${activeDayStr}`}
                  </h3>
                  <table className="day-table">
                    <thead>
                      <tr>
                        <th>Paciente</th>
                        <th>Servicio</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th style={{ textAlign: 'right' }}>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayAppointments.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No hay citas para este día.</td></tr>
                      ) : (
                        dayAppointments.map(app => (
                          <tr key={app.id}>
                            <td><div style={{ fontWeight: 800 }}>{app.name}</div></td>
                            <td style={{ fontWeight: 600 }}>{app.service}</td>
                            <td>{app.time}{app.duration && app.duration !== 30 ? ` · ${app.duration}min` : ''}</td>
                            <td><span style={badgeStyle(app.status)}>{app.status === 'confirmed' ? 'Confirmada' : app.status === 'rejected' ? 'Rechazada' : 'Pendiente'}</span></td>
                            <td style={{ textAlign: 'right' }}>
                              <button onClick={() => openEvent(app)} style={{ background: 'var(--primary)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', fontWeight: 800, fontSize: '0.68rem', padding: '0.4rem 0.85rem', letterSpacing: '0.04em' }}>Gestionar</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              ) : viewMode === 'timeline' ? (
                <div className="timeline-grid">
                  {nowLineX !== null && <div className="now-line" style={{ left: nowLineX }} />}
                  <div className="timeline-header-cell" style={{ left: 0, zIndex: 100 }}>DÍA / HORA</div>
                  {HOURS.map(h => (
                    <React.Fragment key={h}>
                      <div className="timeline-header-cell">{h}:00</div>
                      <div className="timeline-header-cell">{h}:30</div>
                    </React.Fragment>
                  ))}
                  {DAYS.map((day, dIdx) => {
                    const dayApps = appointments.filter(a => {
                      const d = new Date(a.date + 'T00:00:00').getDay();
                      return (d === 0 ? 6 : d - 1) === dIdx;
                    });
                    const leveled = computeLevels(dayApps);
                    const maxLevel = leveled.length ? Math.max(...leveled.map(a => a.level)) : 0;
                    const rowH = getRowHeight(maxLevel);
                    return (
                      <div key={day} className="timeline-day-row" style={{ minHeight: rowH }}>
                        <div className="timeline-day-label" style={{ height: rowH }}>{day}</div>
                        {Array.from({ length: HOURS.length * 2 }).map((_, i) => (
                          <div key={i} className="timeline-cell" style={{ height: rowH }} />
                        ))}
                        {leveled.map(app => {
                          const pillTop = ROW_PADDING / 2 + app.level * (PILL_H + PILL_GAP);
                          return (
                            <div
                              key={app.id}
                              className="appointment-pill"
                              style={{
                                left: getTimeX(app.time),
                                top: pillTop,
                                width: getPillWidth(app.duration),
                                background: STATUS_COLOR[app.status] || STATUS_COLOR.pending,
                                opacity: app.status === 'rejected' ? 0.6 : 1,
                              }}
                              onClick={() => openEvent(app)}
                              title={`${app.name} · ${app.time} · ${app.duration || 30}min`}
                            >
                              {app.name}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

              ) : (
                <div style={{ padding: '1rem', height: '100%' }}>
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={appointments.map(a => ({ title: a.name, start: a.date, color: STATUS_COLOR[a.status] || STATUS_COLOR.pending }))}
                    height="100%"
                    locale="es"
                    dateClick={(info) => { setSelectedDate(info.dateStr); setViewMode('day'); }}
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
                    buttonText={{ today: 'Hoy' }}
                    titleFormat={{ year: 'numeric', month: 'long' }}
                    dayMaxEvents={3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isRightSidebarOpen && (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 420, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="right-management-sidebar">
              <div style={{ padding: '2.5rem', minWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontWeight: 900, fontSize: '1.2rem', margin: 0 }}>{selectedEvent ? 'Gestionar Cita' : 'Nueva Cita'}</h2>
                  <button onClick={closeSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1, padding: '4px' }}>✕</button>
                </div>

                {selectedEvent ? (
                  <>
                    {/* Patient name + status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Paciente</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>{selectedEvent.name}</div>
                      </div>
                      <span style={badgeStyle(selectedEvent.status)}>
                        {selectedEvent.status === 'confirmed' ? 'Confirmada' : selectedEvent.status === 'rejected' ? 'Rechazada' : 'Pendiente'}
                      </span>
                    </div>

                    {/* Editable: email */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>Correo</div>
                      <input type="email" className="form-control" value={editFields.email} onChange={e => setEditFields(f => ({ ...f, email: e.target.value }))} placeholder="correo@ejemplo.com" style={{ fontSize: '0.88rem' }} />
                    </div>

                    {/* Editable: phone */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>Teléfono</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select className="form-control" style={{ width: '100px', flexShrink: 0, fontSize: '0.82rem' }} value={editFields.countryCode} onChange={e => setEditFields(f => ({ ...f, countryCode: e.target.value }))}>
                          {COUNTRY_CODES.map(c => <option key={c.code + c.flag} value={c.code}>{c.flag} {c.code}</option>)}
                        </select>
                        <input type="tel" className="form-control" value={editFields.phone} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} placeholder="8888-8888" style={{ flex: 1, fontSize: '0.88rem' }} />
                      </div>
                    </div>

                    {/* Editable: date + time */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>Fecha y hora</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                        <input
                          type="date"
                          className="form-control"
                          value={editFields.date}
                          min={todayDateStr()}
                          onChange={e => {
                            const d = e.target.value;
                            const avail = getAvailableSlots(d);
                            setEditFields(f => ({ ...f, date: d, time: avail.includes(f.time) ? f.time : '' }));
                          }}
                          style={{ fontSize: '0.88rem' }}
                        />
                        <select className="form-control" value={editFields.time} onChange={e => setEditFields(f => ({ ...f, time: e.target.value }))} style={{ fontSize: '0.88rem' }}>
                          <option value="">Hora...</option>
                          {getAvailableSlots(editFields.date).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      {!isDateTimeFuture(editFields.date, editFields.time) && editFields.date && (
                        <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ⚠ El horario seleccionado ya pasó. Actualiza la fecha y hora.
                        </div>
                      )}
                    </div>

                    {/* Editable: service */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>Servicio</div>
                      <select className="form-control" value={editFields.service} onChange={e => setEditFields(f => ({ ...f, service: e.target.value }))} style={{ fontSize: '0.88rem' }}>
                        {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Editable: notes */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>Notas <span style={{ fontWeight: 400, textTransform: 'none' }}>(opcional)</span></div>
                      <textarea className="form-control" rows={2} value={editFields.description} onChange={e => setEditFields(f => ({ ...f, description: e.target.value }))} placeholder="Detalles adicionales..." style={{ fontSize: '0.85rem', resize: 'none' }} />
                    </div>

                    {/* Duration selector */}
                    <div>
                      <div style={{ fontSize: '0.58rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Duración de la cita</div>
                      {/* Quick presets */}
                      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem' }}>
                        {DURATIONS.map(d => (
                          <button key={d} type="button" className="duration-btn" onClick={() => setEditDuration(d)}
                            style={{ border: `1.5px solid ${editDuration === d ? 'var(--primary)' : 'var(--border-light)'}`, background: editDuration === d ? 'var(--primary)' : 'transparent', color: editDuration === d ? 'white' : 'var(--text-main)' }}>
                            {d}m
                          </button>
                        ))}
                      </div>
                      {/* Stepper for custom values */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button type="button" onClick={() => setEditDuration(d => Math.max(30, d - 30))}
                          style={{ width: 34, height: 34, border: '1px solid var(--border-light)', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1 }}>−</button>
                        <span style={{ fontWeight: 900, fontSize: '1rem', minWidth: 72, textAlign: 'center', letterSpacing: '-0.02em' }}>{editDuration} min</span>
                        <button type="button" onClick={() => setEditDuration(d => Math.min(480, d + 30))}
                          style={{ width: 34, height: 34, border: '1px solid var(--border-light)', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontWeight: 900, fontSize: '1.1rem', lineHeight: 1 }}>+</button>
                        {editDuration > 120 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>personalizado</span>}
                      </div>
                    </div>

                    {/* Actions / confirm dialog */}
                    {(() => {
                      const isValid = isDateTimeFuture(editFields.date, editFields.time);
                      const status = selectedEvent.status;
                      const primaryLabel = status === 'confirmed' ? 'MODIFICAR' : status === 'rejected' ? 'REAGENDAR' : 'APROBAR';
                      return confirm ? (
                        <div className="confirm-box">
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                            ¿Confirmar rechazo de esta cita?
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn" style={{ flex: 1, background: '#F59E0B', color: 'white', border: 'none' }} onClick={handleConfirmAction}>
                              Sí, rechazar
                            </button>
                            <button className="btn" style={{ flex: 1 }} onClick={() => setConfirm(null)}>Cancelar</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button
                            className="btn btn-primary"
                            style={{ flex: 1, opacity: isValid ? 1 : 0.45, cursor: isValid ? 'pointer' : 'not-allowed' }}
                            onClick={isValid ? handleApprove : undefined}
                            title={!isValid ? 'Actualiza la fecha y hora antes de continuar' : ''}
                          >
                            {primaryLabel}
                          </button>
                          {status !== 'rejected' && (
                            <button
                              className="btn"
                              style={{ flex: 1, color: '#F59E0B', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
                              onClick={() => setConfirm({ type: 'reject' })}
                            >
                              RECHAZAR
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  /* New appointment form */
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addAppointment({ ...newForm, status: 'pending', duration: 30 });
                    setNewForm({ name: '', email: '', phone: '', countryCode: '+506', service: SPECIALTIES[0], date: '', time: '', description: '' });
                    closeSidebar();
                  }} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <input className="form-control" placeholder="Nombre completo" required value={newForm.name} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))} />
                    <input type="email" className="form-control" placeholder="Correo electrónico" value={newForm.email} onChange={e => setNewForm(f => ({ ...f, email: e.target.value }))} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select className="form-control" style={{ width: '110px', flexShrink: 0 }} value={newForm.countryCode} onChange={e => setNewForm(f => ({ ...f, countryCode: e.target.value }))}>
                        {COUNTRY_CODES.map(c => <option key={c.code + c.flag} value={c.code}>{c.flag} {c.code}</option>)}
                      </select>
                      <input type="tel" className="form-control" placeholder="8888-8888" value={newForm.phone} onChange={e => setNewForm(f => ({ ...f, phone: e.target.value }))} style={{ flex: 1 }} />
                    </div>
                    <select className="form-control" value={newForm.service} onChange={e => setNewForm(f => ({ ...f, service: e.target.value }))}>
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={newForm.date}
                        min={todayDateStr()}
                        onChange={e => {
                          const d = e.target.value;
                          const avail = getAvailableSlots(d);
                          setNewForm(f => ({ ...f, date: d, time: avail.includes(f.time) ? f.time : '' }));
                        }}
                      />
                      <select className="form-control" required value={newForm.time} onChange={e => setNewForm(f => ({ ...f, time: e.target.value }))}>
                        <option value="">Hora...</option>
                        {getAvailableSlots(newForm.date).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <textarea
                        className="form-control"
                        placeholder="Detalles adicionales..."
                        rows={2}
                        value={newForm.description}
                        onChange={e => setNewForm(f => ({ ...f, description: e.target.value }))}
                        style={{ resize: 'none' }}
                      />
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', paddingLeft: '2px' }}>Opcional</div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '0.25rem' }}>GUARDAR CITA</button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
