import { Clock, Zap, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MobileTrustBanner() {
  const { t } = useTranslation();
  const items = [
    { icon: Clock, key: 'trust.night' },
    { icon: Zap, key: 'trust.repairs' },
    { icon: Users, key: 'trust.children' },
  ];
  return (
    <section className="block lg:hidden" style={{ padding: '2rem 1.5rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {items.map(({ icon: Icon, key }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
              <Icon size={20} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{t(key)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
