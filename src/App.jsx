import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminSidebar from './components/AdminSidebar';
import MobileHeader from './components/MobileHeader';
import { AppointmentProvider } from './context/AppointmentContext';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [isLeftSidebarHovered, setIsLeftSidebarHovered] = useState(false);

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflowX: 'hidden', background: '#FDFDFF' }}>
      
      {isAdminPath && (
        <AdminSidebar 
          isHovered={isLeftSidebarHovered} 
          setIsHovered={setIsLeftSidebarHovered} 
        />
      )}

      <div className="main-layout" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0, /* Permite que el contenido se encoja correctamente */
        transition: 'padding-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        paddingLeft: isAdminPath ? (isLeftSidebarHovered ? '260px' : '80px') : 0
      }}>
        {!isAdminPath && <MobileHeader />}
        {!isAdminPath && <Navbar />}
        
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </main>

        {!isAdminPath && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          <AppContent />
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
