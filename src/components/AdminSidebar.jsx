import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText,
  LogOut, 
  UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Panel de Control', path: '/admin' },
  { icon: FileText, label: 'Reportes e Historial', path: '/admin/reports' },
];

export default function AdminSidebar({ isHovered, setIsHovered }) {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="admin-sidebar"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: isHovered ? '260px' : '80px',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRight: '1px solid rgba(0, 0, 0, 0.04)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        boxShadow: '10px 0 40px rgba(0,0,0,0.02)'
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar { display: none !important; }
        }
        .sidebar-link:hover {
          background: rgba(0, 0, 0, 0.02) !important;
          transform: translateX(4px);
        }
      `}</style>
      
      {/* ── Logo ── */}
      <div style={{ padding: '2.5rem 1.5rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <motion.span
          animate={{ opacity: isHovered ? 1 : 1, x: isHovered ? 0 : 0 }}
          style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--text-main)', whiteSpace: 'nowrap', letterSpacing: '-0.02em' }}
        >
          {isHovered ? 'Turrialba' : 'T'}<span style={{ color: 'var(--primary)' }}>{isHovered ? 'Admin' : 'A'}</span>
        </motion.span>
      </div>

      {/* ── Menu Items ── */}
      <div style={{ flex: 1, padding: '2rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="sidebar-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '0.85rem 1.1rem',
                borderRadius: '16px',
                textDecoration: 'none',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: isActive ? 'white' : 'transparent',
                boxShadow: isActive ? '0 10px 20px rgba(0, 0, 0, 0.04)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                border: isActive ? '1px solid rgba(0, 0, 0, 0.04)' : '1px solid transparent'
              }}
            >
              <item.icon size={22} style={{ flexShrink: 0 }} />
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                style={{ fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}
              >
                {item.label}
              </motion.span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  style={{ position: 'absolute', left: '-0.75rem', width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '0 4px 4px 0' }} 
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* ── User & Logout ── */}
      <div style={{ padding: '1.5rem 0.75rem', background: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '0.85rem 1.1rem' }}>
          <UserCircle size={24} style={{ flexShrink: 0, color: 'var(--primary)' }} />
          <motion.div animate={{ opacity: isHovered ? 1 : 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{user?.name || 'Admin'}</div>
          </motion.div>
        </div>

        <button
          onClick={logout}
          className="sidebar-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '0.85rem 1.1rem',
            borderRadius: '16px',
            border: 'none',
            background: 'rgba(239, 68, 68, 0.04)',
            color: 'var(--danger)',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 700
          }}
        >
          <LogOut size={22} style={{ flexShrink: 0 }} />
          <motion.span animate={{ opacity: isHovered ? 1 : 0 }}>Salir</motion.span>
        </button>
      </div>
    </motion.div>
  );
}
