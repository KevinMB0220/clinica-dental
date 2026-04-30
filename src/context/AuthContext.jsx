import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('dental_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading user', e);
      localStorage.removeItem('dental_user');
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin mock
    if (email === 'admin@clinica.com' && password === 'admin123') {
      const userData = { email, role: 'admin', name: 'Administrador' };
      setUser(userData);
      localStorage.setItem('dental_user', JSON.stringify(userData));
      return true;
    }

    // Patient mock (check in local storage for registered users)
    const users = JSON.parse(localStorage.getItem('dental_registered_users') || '[]');
    const patient = users.find(u => u.email === email && u.password === password);
    
    if (patient) {
      const userData = { ...patient, role: 'patient' };
      delete userData.password; // Don't store password in state
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

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
