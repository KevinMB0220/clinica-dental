import React, { useEffect, useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X, Search, Calendar as CalendarIcon, Download, Plus, List, ChevronLeft, ChevronRight, Sparkles, Shield, CalendarDays, CalendarClock, BadgeCheck, CalendarX, Activity, Clock3, CheckCircle, XCircle } from 'lucide-react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const calendarStyles = `
  .custom-calendar-container {
    background: var(--bg-card);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .custom-calendar-container::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 6px;
    background: linear-gradient(90deg, var(--primary), #81C1E9);
  }

  .fc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: transparent !important;
  }
  
  /* Remove ugly borders */
  .fc-theme-standard .fc-scrollgrid {
    border: none !important;
  }
  .fc-theme-standard th, .fc-theme-standard td {
    border-color: rgba(71, 161, 215, 0.08) !important;
  }
  
  /* Header Styles */
  .fc-col-header-cell {
    background: transparent !important;
    padding: 1rem 0 !important;
    border: none !important;
    border-bottom: 2px solid rgba(71, 161, 215, 0.1) !important;
  }
  .fc-col-header-cell-cushion {
    color: var(--text-muted) !important;
    font-weight: 700 !important;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-decoration: none !important;
  }
  
  /* Number styling */
  .fc-daygrid-day-number {
    color: var(--text-main) !important;
    font-weight: 700 !important;
    font-size: 1rem;
    padding: 0.5rem 0.75rem !important;
    text-decoration: none !important;
  }
  
  /* Today highlight */
  .fc-day-today {
    background: rgba(71, 161, 215, 0.02) !important;
  }
  .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
    background: var(--primary);
    color: white !important;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    padding: 0 !important;
    box-shadow: var(--shadow-btn);
  }

  /* Event Styles - we handle background in render */
  .fc-event {
    border: none !important;
    background: transparent !important;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  .fc-event:hover {
    transform: translateY(-2px) scale(1.02) !important;
    z-index: 10 !important;
  }
  
  /* Time slots */
  .fc-timegrid-slot {
    height: 2.5em !important;
  }
  .fc-timegrid-slot-minor {
    border-top-style: dashed !important;
  }
  .fc-timegrid-axis-cushion {
    color: var(--text-muted) !important;
    font-weight: 600 !important;
    font-size: 0.8rem !important;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  /* Hide default toolbar since we made a custom one */
  .fc .fc-toolbar {
    display: none !important;
  }
  
  /* Styling for List View */
  .fc-list {
    border: none !important;
  }
  .fc-list-day-cushion {
    background: rgba(71, 161, 215, 0.05) !important;
    padding: 0.75rem 1rem !important;
  }
  .fc-list-event:hover td {
    background: rgba(71, 161, 215, 0.02) !important;
  }

  /* Slide-over Sidebar */
  .sidebar-panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 100%;
    max-width: 400px;
    background: var(--bg-card);
    box-shadow: -10px 0 40px rgba(0,0,0,0.1);
    z-index: 10001;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  
  .sidebar-panel .form-group {
    margin-bottom: 1rem !important;
  }
  
  .admin-layout-wrapper {
    transition: padding-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .admin-layout-wrapper.shifted {
    padding-right: 400px;
  }

  /* Mobile responsiveness (iPhone 14 Pro Max & similar - 430px width) */
  @media (max-width: 768px) {
    .custom-calendar-container {
      padding: 0.5rem;
      border-radius: var(--radius-md);
      margin-left: -1rem; /* Expand out of container padding slightly */
      margin-right: -1rem;
    }
    .fc-col-header-cell-cushion {
      font-size: 0.6rem !important;
      padding: 2px !important;
    }
    .fc-timegrid-slot {
      height: 3em !important;
    }
    .fc-timegrid-axis-cushion {
      font-size: 0.6rem !important;
    }
    .dashboard-card {
      padding: 1rem !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.75rem !important;
    }
    .dashboard-card .flex-center {
      width: 48px !important;
      height: 48px !important;
      border-radius: 0.8rem !important;
    }
    .dashboard-card svg {
      width: 24px !important;
      height: 24px !important;
    }
    .dashboard-card .stat-value {
      font-size: 1.75rem !important;
    }
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.75rem !important;
    }
    .mobile-wrap {
      flex-direction: column;
      width: 100%;
      gap: 1rem !important;
    }
    .mobile-full {
      width: 100% !important;
      justify-content: center !important;
    }
    .mobile-header-text {
      font-size: 2rem !important;
    }
    .hide-mobile {
      display: none !important;
    }
    .admin-layout-wrapper.shifted {
      padding-right: 0 !important;
    }
  }
`;

export default function Admin() {
  const { user: authUser } = useAuth();
  const { appointments, addAppointment, deleteAppointment, updateAppointment } = useAppointments();
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [calendarTitle, setCalendarTitle] = useState('');
  const [activeCalView, setActiveCalView] = useState('timeGridWeek');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newAppForm, setNewAppForm] = useState({
    name: '', email: '', phone: '', service: 'Limpieza Dental', date: '', time: ''
  });

  // TEMPORARY BYPASS: Use a dummy admin user if not authenticated
  const user = authUser || { name: 'Admin Temp', email: 'admin@temp.com', role: 'admin' };

  /*
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (!authUser) return null;
  */

  const isAdmin = user.role === 'admin';
  
  const baseAppointments = isAdmin 
    ? appointments 
    : appointments.filter(app => app.userId === user.email);

  const userAppointments = useMemo(() => {
    if (baseAppointments.length > 0) return baseAppointments;
    
    // Inyectar citas de prueba si está vacío para previsualización
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return [
      {
        id: 'demo-1',
        name: 'Carlos Mendoza (Demo)',
        email: 'carlos@demo.com',
        phone: '8888-8888',
        service: 'Ortodoncia',
        date: dateStr,
        time: '10:00',
        status: 'confirmed'
      },
      {
        id: 'demo-2',
        name: 'Lucía Vargas (Demo)',
        email: 'lucia@demo.com',
        phone: '7777-7777',
        service: 'Limpieza Dental',
        date: dateStr,
        time: '14:30',
        status: 'pending'
      }
    ];
  }, [baseAppointments]);

  const filteredAppointments = userAppointments.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calendarEvents = useMemo(() => {
    return userAppointments.map(app => {
      const startStr = `${app.date}T${app.time}`;
      let endStr = null;
      try {
        const startDate = new Date(startStr);
        if (!isNaN(startDate.getTime())) {
          const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour duration
          endStr = endDate.toISOString();
        }
      } catch (e) { }

      // Custom gradients based on status matching the landing palette
      let bgStyle = '';
      let shadowColor = '';
      if (app.status === 'confirmed') {
        bgStyle = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        shadowColor = 'rgba(16, 185, 129, 0.4)';
      } else if (app.status === 'cancelled') {
        bgStyle = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
        shadowColor = 'rgba(239, 68, 68, 0.4)';
      } else {
        bgStyle = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
        shadowColor = 'rgba(245, 158, 11, 0.4)';
      }

      return {
        id: app.id,
        title: app.name,
        start: startStr,
        ...(endStr && { end: endStr }),
        allDay: false,
        extendedProps: { ...app, bgStyle, shadowColor }
      };
    });
  }, [userAppointments]);

  const stats = useMemo(() => {
    return {
      total: userAppointments.length,
      pending: userAppointments.filter(a => a.status === 'pending').length,
      confirmed: userAppointments.filter(a => a.status === 'confirmed').length,
      cancelled: userAppointments.filter(a => a.status === 'cancelled').length,
    }
  }, [userAppointments]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
  };

  const renderEventContent = (eventInfo) => {
    const { bgStyle, shadowColor, name, service } = eventInfo.event.extendedProps;
    
    if (eventInfo.view.type === 'listDay') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: bgStyle }} />
          <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{name}</strong>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>• {service}</span>
        </div>
      );
    }
    
    return (
      <div style={{ 
        background: bgStyle, 
        borderRadius: '8px', 
        padding: '6px 10px', 
        width: '100%', 
        height: '100%', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        boxShadow: `0 4px 12px ${shadowColor}`,
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ fontWeight: 800, fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', letterSpacing: '0.02em' }}>
          {name}
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.9, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginBottom: '4px' }}>
          {service}
        </div>
        <div style={{ fontSize: '0.7rem', marginTop: 'auto', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.15)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
          <Clock3 size={10} /> {eventInfo.timeText}
        </div>
      </div>
    );
  };

  const updateCalendarTitle = () => {
    if (calendarRef.current) {
      setCalendarTitle(calendarRef.current.getApi().view.title);
    }
  };

  useEffect(() => {
    // Small delay to ensure calendar is mounted before getting title
    setTimeout(updateCalendarTitle, 100);
  }, [viewMode, activeCalView, userAppointments]);

  useEffect(() => {
    // Forzar actualización de tamaño del calendario durante la transición
    if (viewMode === 'calendar') {
      let start = Date.now();
      let timer = setInterval(() => {
        if (Date.now() - start > 450) clearInterval(timer);
        if (calendarRef.current) calendarRef.current.getApi().updateSize();
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isSidebarOpen, viewMode]);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppForm.name || !newAppForm.date || !newAppForm.time) return;
    
    addAppointment({
      ...newAppForm,
      userId: user.email // Enlace al usuario actual o dejar como manual
    });
    
    setIsSidebarOpen(false);
    setNewAppForm({ name: '', email: '', phone: '', service: 'Limpieza Dental', date: '', time: '' });
  };

  return (
    <div className={`admin-layout-wrapper ${isSidebarOpen ? 'shifted' : ''}`} style={{ background: '#FDFDFF', minHeight: '100vh', paddingBottom: '6rem' }}>
      <style>{calendarStyles}</style>

      {isSidebarOpen && (
        <style>{`
          nav, footer, .admin-header-section, .metrics-grid, .view-toggle-wrapper {
            display: none !important;
          }
          .admin-layout-wrapper {
            padding-top: 1.5rem !important;
          }
        `}</style>
      )}

      {/* ── HEADER AREA CON GLASSMORPHISM ── */}
      <section className="admin-header-section" style={{ 
        padding: '1rem 0 1rem', 
        background: 'linear-gradient(180deg, rgba(71, 161, 215, 0.05) 0%, rgba(255,255,255,0) 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="mobile-header-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                {isAdmin ? 'Panel de Control' : 'Mis Citas'}
              </h1>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {!isAdmin && (
                 <Link to="/booking" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                   Agendar Nueva <Plus size={18} style={{ marginLeft: '4px' }} />
                 </Link>
              )}

              {isAdmin && (
                <>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '0.85rem 1.5rem' }}
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    Nueva Cita <Plus size={18} style={{ marginLeft: '4px' }} />
                  </button>
                  <button 
                    className="btn" 
                    style={{ background: 'var(--bg-card)', color: 'var(--text-main)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-light)', padding: '0.85rem 1.5rem' }}
                    onClick={() => {
                      const headers = 'Name,Email,Phone,Service,Date,Time,Status\n';
                      const rows = appointments.map(a => `${a.name},${a.email},${a.phone},${a.service},${a.date},${a.time},${a.status}`).join('\n');
                      const blob = new Blob([headers + rows], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.setAttribute('href', url);
                      a.setAttribute('download', 'appointments.csv');
                      a.click();
                    }}
                  >
                    <span className="hide-mobile">Exportar CSV</span> <Download size={18} style={{ marginLeft: '8px' }} />
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container">
        {/* ── METRICS GRID ── */}
        {isAdmin && (
          <div className="metrics-grid">
            {[
              { label: 'Total Citas', value: stats.total, icon: CalendarDays, color: 'var(--primary)', bg: 'rgba(71, 161, 215, 0.12)' },
              { label: 'Pendientes', value: stats.pending, icon: CalendarClock, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
              { label: 'Confirmadas', value: stats.confirmed, icon: BadgeCheck, color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.12)' },
              { label: 'Canceladas', value: stats.cancelled, icon: CalendarX, color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.12)' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                className="dashboard-card" 
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
              >
                {/* Decorative background circle */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: stat.bg, opacity: 0.6, zIndex: 0 }}></div>
                
                <div className="flex-center" style={{ width: 60, height: 60, borderRadius: '1.2rem', background: 'var(--bg-card)', color: stat.color, zIndex: 1, boxShadow: `0 8px 24px ${stat.bg}`, border: `2px solid ${stat.bg}` }}>
                  <stat.icon size={28} strokeWidth={2.5} />
                </div>
                <div style={{ zIndex: 1 }}>
                  <div className="stat-value" style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.2rem' }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── CUSTOM TOOLBAR & VIEW TOGGLE ── */}
        <div className="mobile-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div className="mobile-full view-toggle-wrapper" style={{ display: 'flex', background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)', gap: '4px' }}>
            <button 
              onClick={() => setViewMode('calendar')} 
              className={`btn ${viewMode === 'calendar' ? 'btn-active' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.6rem 1rem', boxShadow: viewMode === 'calendar' ? 'var(--shadow-btn)' : 'none', border: 'none', fontSize: '0.9rem' }}
            >
              <CalendarIcon size={16} /> <span className="hide-mobile">Calendario</span>
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`btn ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.6rem 1rem', boxShadow: viewMode === 'list' ? 'var(--shadow-btn)' : 'none', border: 'none', fontSize: '0.9rem' }}
            >
              <List size={16} /> <span className="hide-mobile">Tabla</span>
            </button>
          </div>

          {viewMode === 'calendar' && (
            <div className="mobile-wrap" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-icon" onClick={() => { calendarRef.current.getApi().prev(); updateCalendarTitle(); }} style={{ width: 40, height: 40 }}>
                  <ChevronLeft size={20} />
                </button>
                <button className="btn-icon" onClick={() => { calendarRef.current.getApi().today(); updateCalendarTitle(); }} style={{ width: 'auto', padding: '0 1rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Hoy
                </button>
                <button className="btn-icon" onClick={() => { calendarRef.current.getApi().next(); updateCalendarTitle(); }} style={{ width: 40, height: 40 }}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, minWidth: '150px', textAlign: 'center' }}>
                {calendarTitle}
              </h2>
              <div className="mobile-full" style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-pill)', justifyContent: 'center' }}>
                {['dayGridMonth', 'timeGridWeek', 'listDay'].map((v) => (
                  <button 
                    key={v}
                    onClick={() => { setActiveCalView(v); calendarRef.current.getApi().changeView(v); updateCalendarTitle(); }}
                    style={{ 
                      flex: 1,
                      padding: '0.5rem 0.75rem', 
                      background: activeCalView === v ? 'white' : 'transparent',
                      color: activeCalView === v ? 'var(--primary)' : 'var(--text-muted)',
                      border: 'none', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                      boxShadow: activeCalView === v ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'var(--transition)'
                    }}
                  >
                    {v === 'dayGridMonth' ? 'Mes' : v === 'timeGridWeek' ? 'Semana' : 'Día'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'list' && (
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar pacientes o servicios..." 
                style={{ paddingLeft: '3.5rem', borderRadius: 'var(--radius-pill)', background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', border: 'none' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <AnimatePresence mode="wait">
          {viewMode === 'calendar' ? (
            <motion.div 
              key="calendar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="custom-calendar-container"
            >
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView={activeCalView}
                events={calendarEvents}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                height="auto"
                slotMinTime="08:00:00"
                slotMaxTime="18:00:00"
                slotDuration="00:30:00"
                allDaySlot={false}
                expandRows={false}
                stickyHeaderDates={true}
                nowIndicator={true}
                dayMaxEvents={0}
                navLinks={true}
                navLinkDayClick={(date) => {
                  setActiveCalView('listDay');
                  calendarRef.current.getApi().changeView('listDay', date);
                  updateCalendarTitle();
                }}
                moreLinkContent={(args) => {
                  return (
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, marginTop: '2px', textAlign: 'center' }}>
                      {args.num} {args.num === 1 ? 'cita' : 'citas'}
                    </div>
                  )
                }}
                locale="es"
              />
            </motion.div>
          ) : (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="dashboard-card" 
              style={{ padding: '0', overflow: 'hidden' }}
            >
              <div className="dashboard-table-container" style={{ boxShadow: 'none', borderRadius: 0 }}>
                <table>
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '2rem' }}>Paciente</th>
                      <th>Especialidad</th>
                      <th>Fecha y Hora</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ padding: '6rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                              <CalendarIcon size={48} opacity={0.2} />
                              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>No se encontraron citas.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((app) => (
                          <motion.tr 
                            key={app.id} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ transition: 'background 0.2s' }}
                            whileHover={{ backgroundColor: 'rgba(71, 161, 215, 0.02)' }}
                          >
                            <td style={{ paddingLeft: '2rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="btn-icon" style={{ background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(71,161,215,0.3)' }}>
                                  {app.name.charAt(0)}
                                </div>
                                <div>
                                  <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1.05rem', letterSpacing: '-0.01em' }}>{app.name}</div>
                                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{app.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.95rem' }}>{app.service}</span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{app.date}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{app.time}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${app.status === 'confirmed' ? 'badge-success' : app.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`} style={{ padding: '0.5rem 1rem' }}>
                                {app.status === 'pending' ? 'Pendiente' : app.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <button onClick={() => deleteAppointment(app.id)} className="btn-icon" style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', boxShadow: 'none', width: 36, height: 36 }} title="Eliminar">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ULTRA PREMIUM EVENT MODAL ── */}
        <AnimatePresence>
          {selectedEvent && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(30, 41, 59, 0.6)', zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)'
            }} onClick={() => setSelectedEvent(null)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{
                  background: 'var(--bg-card)', padding: '0', borderRadius: 'var(--radius-card)',
                  width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                  position: 'relative', overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Banner - Siguiendo la paleta de colores principal */}
                <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #81C1E9 100%)', padding: '2.5rem 2rem 4rem', color: 'white', position: 'relative' }}>
                  <button className="btn-icon" onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', boxShadow: 'none', width: 36, height: 36, backdropFilter: 'blur(4px)' }}>
                    <X size={18} />
                  </button>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Detalle de Cita</h3>
                  <div style={{ opacity: 0.9, fontSize: '0.95rem', fontWeight: 500 }}>Revisión y gestión de paciente.</div>
                </div>

                {/* Avatar Overlap */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--bg-card)', padding: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                      {selectedEvent.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '1.5rem', letterSpacing: '-0.02em' }}>{selectedEvent.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500, marginTop: '4px' }}>{selectedEvent.email} • {selectedEvent.phone}</div>
                  </div>

                  <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(71, 161, 215, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Activity size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Especialidad</div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.05rem' }}>{selectedEvent.service}</div>
                      </div>
                    </div>
                    
                    <div style={{ height: '1px', background: 'var(--border-light)' }}></div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(71, 161, 215, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <CalendarIcon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fecha y Hora Programada</div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.05rem' }}>{selectedEvent.date} a las {selectedEvent.time}</div>
                      </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--border-light)' }}></div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(71, 161, 215, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Shield size={18} />
                      </div>
                      <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado Actual</div>
                        <span className={`badge ${selectedEvent.status === 'confirmed' ? 'badge-success' : selectedEvent.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                          {selectedEvent.status === 'pending' ? 'PENDIENTE' : selectedEvent.status === 'confirmed' ? 'CONFIRMADA' : 'CANCELADA'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {selectedEvent.status !== 'confirmed' && (
                        <button 
                          className="btn btn-primary" 
                          style={{ flex: 1, background: 'var(--success)', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)', padding: '1rem' }}
                          onClick={() => { 
                            updateAppointment(selectedEvent.id, { status: 'confirmed' }); 
                            setSelectedEvent({...selectedEvent, status: 'confirmed'}); 
                          }}
                        >
                          <Check size={18} /> Aprobar Cita
                        </button>
                      )}
                      {selectedEvent.status !== 'cancelled' && (
                        <button 
                          className="btn" 
                          style={{ flex: 1, background: 'var(--bg-input)', color: 'var(--danger)', fontWeight: 700, padding: '1rem' }}
                          onClick={() => { 
                            updateAppointment(selectedEvent.id, { status: 'cancelled' }); 
                            setSelectedEvent({...selectedEvent, status: 'cancelled'}); 
                          }}
                        >
                          <X size={18} /> Cancelar Cita
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── SLIDE OVER SIDEBAR (NUEVA CITA MANUAL) ── */}
        {createPortal(
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div 
                  initial={{ x: '100%', opacity: 0.5 }} 
                  animate={{ x: 0, opacity: 1 }} 
                  exit={{ x: '100%', opacity: 0.5 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="sidebar-panel"
                >
                  <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #81C1E9 100%)', padding: '2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Agendar Nueva Cita</h3>
                    <button type="button" className="btn-icon" onClick={() => setIsSidebarOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', width: 36, height: 36, backdropFilter: 'blur(4px)' }}>
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div style={{ padding: '2rem', flex: 1 }}>
                    <form onSubmit={handleAddAppointment}>
                      <div className="form-group">
                        <label>Nombre del Paciente *</label>
                        <input type="text" className="form-control" required value={newAppForm.name} onChange={(e) => setNewAppForm({...newAppForm, name: e.target.value})} placeholder="Ej. Carlos Mendoza" />
                      </div>
                      <div className="grid-2">
                        <div className="form-group">
                          <label>Teléfono</label>
                          <input type="tel" className="form-control" value={newAppForm.phone} onChange={(e) => setNewAppForm({...newAppForm, phone: e.target.value})} placeholder="8888-8888" />
                        </div>
                        <div className="form-group">
                          <label>Correo Electrónico</label>
                          <input type="email" className="form-control" value={newAppForm.email} onChange={(e) => setNewAppForm({...newAppForm, email: e.target.value})} placeholder="correo@ejemplo.com" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Especialidad Médica *</label>
                        <select className="form-control" required value={newAppForm.service} onChange={(e) => setNewAppForm({...newAppForm, service: e.target.value})} style={{ appearance: 'none' }}>
                          <option value="Limpieza Dental">Limpieza Dental</option>
                          <option value="Ortodoncia">Ortodoncia</option>
                          <option value="Blanqueamiento">Blanqueamiento</option>
                          <option value="Extracción">Extracción</option>
                          <option value="Revisión General">Revisión General</option>
                        </select>
                      </div>
                      <div className="grid-2">
                        <div className="form-group">
                          <label>Fecha *</label>
                          <input type="date" className="form-control" required value={newAppForm.date} onChange={(e) => setNewAppForm({...newAppForm, date: e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Hora *</label>
                          <input type="time" className="form-control" required value={newAppForm.time} onChange={(e) => setNewAppForm({...newAppForm, time: e.target.value})} />
                        </div>
                      </div>
                      
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.05rem' }}>
                        Guardar y Agendar
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      </section>
    </div>
  );
}
