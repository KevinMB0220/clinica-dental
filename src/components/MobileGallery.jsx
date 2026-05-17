import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HERO_IMAGE = "/assets/hero-luxury.png";

export default function MobileGallery() {
  const { t } = useTranslation();
  const galleryItems = [
    { titleKey: 'gallery.consulting', img: HERO_IMAGE },
    { titleKey: 'gallery.lab', img: HERO_IMAGE },
  ];
  return (
    <section className="block lg:hidden" style={{ padding: '4rem 1.5rem', background: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          {t('gallery.title')}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('gallery.subtitle')}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {galleryItems.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ width: '100%', height: '240px', position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}>
            <img src={item.img} alt={t(item.titleKey)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(255,255,255,0.95)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              {t(item.titleKey)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
