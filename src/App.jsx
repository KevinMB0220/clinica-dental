import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Accessibility from './pages/Accessibility';
import AdminSidebar from './components/AdminSidebar';
import MobileHeader from './components/MobileHeader';
import ConsentNotice from './components/ConsentNotice';
import { AppointmentProvider } from './context/AppointmentContext';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [isLeftSidebarHovered, setIsLeftSidebarHovered] = useState(false);

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflowX: 'hidden', background: '#FDFDFF' }}>
      <a href="#main-content" className="skip-link">Ir al contenido principal</a>

      {isAdminPath && (
        <AdminSidebar 
          isHovered={isLeftSidebarHovered} 
          setIsHovered={setIsLeftSidebarHovered} 
        />
      )}

      <div className={`main-layout ${isAdminPath ? 'admin-layout' : ''} ${isLeftSidebarHovered ? 'sidebar-hovered' : ''}`} style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0 /* Permite que el contenido se encoja correctamente */
      }}>
        {!isAdminPath && <MobileHeader />}
        {!isAdminPath && <Navbar />}
        
        <main id="main-content" tabIndex="-1" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/accesibilidad" element={<Accessibility />} />
          </Routes>
        </main>

        {!isAdminPath && <Footer />}
        {!isAdminPath && <ConsentNotice />}
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
