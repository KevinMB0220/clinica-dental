import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dental_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      const savedAdmins = localStorage.getItem('dental_admins');
      if (savedAdmins) {
        setAdmins(JSON.parse(savedAdmins));
      } else {
        // Default admin
        const defaultAdmin = { id: Date.now().toString(), username: 'admin', password: '123', role: 'admin', name: 'Administrador Principal' };
        setAdmins([defaultAdmin]);
        localStorage.setItem('dental_admins', JSON.stringify([defaultAdmin]));
      }
    } catch (e) {
      console.error('Error loading auth data', e);
      localStorage.removeItem('dental_user');
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Admin login
    const adminUser = admins.find(a => a.username === username && a.password === password);
    if (adminUser) {
      const userData = { email: `${username}@clinica.com`, username, role: 'admin', name: adminUser.name };
      setUser(userData);
      localStorage.setItem('dental_user', JSON.stringify(userData));
      return true;
    }
    
    // Fallback patient login (not used much)
    const users = JSON.parse(localStorage.getItem('dental_registered_users') || '[]');
    const patient = users.find(u => u.email === username && u.password === password);
    if (patient) {
      const userData = { name: patient.name, email: patient.email, role: 'patient' };
      setUser(userData);
      localStorage.setItem('dental_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('dental_registered_users') || '[]');
    if (users.find(u => u.email === email)) return false;

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('dental_registered_users', JSON.stringify(users));
    
    // Auto login
    const userData = { name, email, role: 'patient' };
    setUser(userData);
    localStorage.setItem('dental_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dental_user');
  };

  const addAdmin = (newAdmin) => {
    const updatedAdmins = [...admins, { ...newAdmin, id: Date.now().toString(), role: 'admin' }];
    setAdmins(updatedAdmins);
    localStorage.setItem('dental_admins', JSON.stringify(updatedAdmins));
  };

  const removeAdmin = (id) => {
    const updatedAdmins = admins.filter(a => a.id !== id);
    setAdmins(updatedAdmins);
    localStorage.setItem('dental_admins', JSON.stringify(updatedAdmins));
  };

  return (
    <AuthContext.Provider value={{ user, admins, login, register, logout, loading, addAdmin, removeAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
