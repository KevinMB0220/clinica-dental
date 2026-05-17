import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SPECIALTY_KEYS = ['orthodontics', 'implants', 'endodontics', 'pediatric', 'periodontics', 'chiropody'];

export default function MobileServices() {
  const { t } = useTranslation();
  return (
    <section className="block lg:hidden" style={{ padding: '4rem 1.5rem', background: '#F8FBF8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          {t('services.title')} <span style={{ color: 'var(--primary)' }}>{t('services.titleHighlight')}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('services.subtitle')}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {SPECIALTY_KEYS.map((key, index) => (
          <motion.div key={key} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)', minHeight: '80px' }}>
            <div style={{ width: '4px', height: '40px', background: 'var(--primary)', borderRadius: '4px', marginRight: '1rem' }}></div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{t(`services.items.${key}.title`)}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t(`services.items.${key}.desc`)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
