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
  
  // Filter by user if not admin
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
    <section style={{ minHeight: '80vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>{isAdmin ? 'Panel de Administración' : 'Mis Citas'}</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              {isAdmin ? 'Gestiona las citas de todos los pacientes' : `Hola ${user.name}, aquí puedes ver tus citas agendadas`}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '250px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {!isAdmin && (
               <Link to="/booking" className="btn btn-primary" style={{ padding: '0.75rem' }}>
                 <Plus size={20} /> Agendar
               </Link>
            )}

            {isAdmin && (
              <button 
                className="btn btn-outline" 
                onClick={() => {
                  const headers = 'Nombre,Email,Teléfono,Servicio,Fecha,Hora,Estado\n';
                  const rows = appointments.map(a => `${a.name},${a.email},${a.phone},${a.service},${a.date},${a.time},${a.status}`).join('\n');
                  const blob = new Blob([headers + rows], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.setAttribute('href', url);
                  a.setAttribute('download', 'citas-dentales.csv');
                  a.click();
                }}
                style={{ padding: '0.75rem' }}
                title="Descargar CSV"
              >
                <Download size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ backgroundColor: 'rgba(14, 165, 233, 0.05)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem' }}>Paciente</th>
                <th style={{ padding: '1rem 1.5rem' }}>Servicio</th>
                <th style={{ padding: '1rem 1.5rem' }}>Fecha/Hora</th>
                <th style={{ padding: '1rem 1.5rem' }}>Estado</th>
                <th style={{ padding: '1rem 1.5rem' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No tienes citas registradas aún.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <motion.tr 
                      key={app.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      {editingId === app.id ? (
                        <>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <input type="text" className="form-control" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <input type="text" className="form-control" value={editForm.service} onChange={(e) => setEditForm({...editForm, service: e.target.value})} />
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <input type="date" className="form-control" value={editForm.date} onChange={(e) => setEditForm({...editForm, date: e.target.value})} />
                              <input type="time" className="form-control" value={editForm.time} onChange={(e) => setEditForm({...editForm, time: e.target.value})} />
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <select className="form-control" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                              <option value="pending">Pendiente</option>
                              <option value="confirmed">Confirmada</option>
                              <option value="cancelled">Cancelada</option>
                            </select>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                               <button onClick={handleSaveEdit} className="btn" style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem' }}><Check size={18} /></button>
                               <button onClick={() => setEditingId(null)} className="btn" style={{ background: '#ef4444', color: 'white', padding: '0.5rem' }}><X size={18} /></button>
                             </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td data-label="Paciente" style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <User size={20} />
                              </div>
                              <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: '600' }}>{app.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.email}</div>
                              </div>
                            </div>
                          </td>
                          <td data-label="Servicio" style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '500' }}>
                              {app.service}
                            </span>
                          </td>
                          <td data-label="Fecha/Hora" style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem', alignItems: 'flex-end' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {app.date}</span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}><Clock size={14} /> {app.time}</span>
                            </div>
                          </td>
                          <td data-label="Estado" style={{ padding: '1rem 1.5rem' }}>
                            <span style={{ 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '1rem', 
                              fontSize: '0.75rem', 
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              backgroundColor: app.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: app.status === 'confirmed' ? '#10b981' : app.status === 'cancelled' ? '#ef4444' : '#f59e0b'
                            }}>
                              {app.status === 'pending' ? 'Pendiente' : app.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              {isAdmin && (
                                <button onClick={() => startEdit(app)} className="btn btn-outline" style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                                  <Edit2 size={16} />
                                </button>
                              )}
                              <button onClick={() => deleteAppointment(app.id)} className="btn btn-outline" style={{ padding: '0.5rem', border: '1px solid var(--border)', color: '#ef4444' }}>
                                <Trash2 size={16} />
                                <span style={{ fontSize: '0.8rem', marginLeft: '0.25rem' }}>{isAdmin ? '' : 'Cancelar'}</span>
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
