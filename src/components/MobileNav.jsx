import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MobileNav() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', label: t('mobileNav.home'), path: '/', icon: Home },
    { id: 'booking', label: t('mobileNav.book'), path: '/booking', icon: CalendarPlus },
  ];

  return (
    <nav className="flex lg:hidden" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--border-light)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0.75rem 1rem 1.5rem',
      zIndex: 1000,
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.id} to={item.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: '0.25rem', color: isActive ? 'var(--primary)' : 'var(--text-muted)', transition: 'var(--transition)' }}>
            <div style={{ padding: '0.5rem', borderRadius: '50%', background: isActive ? 'var(--primary-light)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '44px', minHeight: '44px' }}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
