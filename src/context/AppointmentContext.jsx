import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dental_appointments');
      if (saved) {
        setAppointments(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading appointments', e);
      localStorage.setItem('dental_appointments', JSON.stringify([]));
    }
  }, []);

  const saveToStorage = (newAppointments) => {
    setAppointments(newAppointments);
    localStorage.setItem('dental_appointments', JSON.stringify(newAppointments));
  };

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [...appointments, newAppointment];
    saveToStorage(updated);
    return newAppointment;
  };

  const updateAppointment = (id, data) => {
    const updated = appointments.map((app) => 
      app.id === id ? { ...app, ...data } : app
    );
    saveToStorage(updated);
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter((app) => app.id !== id);
    saveToStorage(updated);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointment, deleteAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => useContext(AppointmentContext);
