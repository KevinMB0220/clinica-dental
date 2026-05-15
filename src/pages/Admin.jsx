import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Check, X, Search, Calendar, User, Clock, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const { appointments, deleteAppointment, updateAppointment } = useAppointments();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  
  const userAppointments = isAdmin 
    ? appointments 
    : appointments.filter(app => app.userId === user.email);

  const filteredAppointments = userAppointments.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (app) => {
    setEditingId(app.id);
    setEditForm(app);
  };

  const handleSaveEdit = () => {
    updateAppointment(editingId, editForm);
    setEditingId(null);
  };

  return (
    <section className="container dashboard-section">
      <div className="flex-between" style={{ marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{isAdmin ? 'Analytics & Appointments' : 'My Schedule'}</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {isAdmin ? 'Manage patient records and appointments.' : `Hello ${user.name}, view and manage your appointments here.`}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search..." 
              style={{ paddingLeft: '3rem', borderRadius: 'var(--radius-pill)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {!isAdmin && (
             <Link to="/booking" className="btn btn-primary">
               Schedule <Plus size={16} style={{ marginLeft: '4px' }} />
             </Link>
          )}

          {isAdmin && (
            <button 
              className="btn btn-outline" 
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
              title="Download CSV"
            >
              Export <Download size={16} style={{ marginLeft: '4px' }} />
            </button>
          )}
        </div>
      </div>

      <div className="dashboard-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '1.1rem' }}>{isAdmin ? 'All Appointments' : 'Upcoming Visits'}</h3>
        </div>
        <div className="dashboard-table-container" style={{ boxShadow: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Service Details</th>
                <th>Schedule</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <motion.tr 
                      key={app.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {editingId === app.id ? (
                        <>
                          <td><input type="text" className="form-control" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} /></td>
                          <td><input type="text" className="form-control" value={editForm.service} onChange={(e) => setEditForm({...editForm, service: e.target.value})} /></td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input type="date" className="form-control" value={editForm.date} onChange={(e) => setEditForm({...editForm, date: e.target.value})} />
                              <input type="time" className="form-control" value={editForm.time} onChange={(e) => setEditForm({...editForm, time: e.target.value})} />
                            </div>
                          </td>
                          <td>
                            <select className="form-control" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                             <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                               <button onClick={handleSaveEdit} className="btn-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)', boxShadow: 'none' }}><Check size={16} /></button>
                               <button onClick={() => setEditingId(null)} className="btn-icon" style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', boxShadow: 'none' }}><X size={16} /></button>
                             </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div className="btn-icon" style={{ background: 'var(--primary)', color: 'white' }}>
                                {app.name.charAt(0)}
                              </div>
                              <div>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{app.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{app.service}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem' }}>
                              <span style={{ fontWeight: 500 }}>{app.date}</span>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{app.time}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${app.status === 'confirmed' ? 'badge-success' : app.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                              {app.status === 'pending' ? 'Pending' : app.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              {isAdmin && (
                                <button onClick={() => startEdit(app)} className="btn-icon" style={{ color: 'var(--text-muted)', background: 'transparent', boxShadow: 'none' }}>
                                  <Edit2 size={16} />
                                </button>
                              )}
                              <button onClick={() => deleteAppointment(app.id)} className="btn-icon" style={{ color: 'var(--danger)', background: 'transparent', boxShadow: 'none' }}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
