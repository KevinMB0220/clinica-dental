import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HERO_IMAGE = "/assets/hero-luxury.png";
const WHATSAPP_LINK = "https://wa.me/50625562673";

export default function MobileHero() {
  const { t } = useTranslation();
  return (
    <section className="block lg:hidden" style={{ width: '100%', padding: 0, margin: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', height: '92vh', minHeight: '580px', overflow: 'hidden' }}>
        <img src={HERO_IMAGE} alt="Turrialba Dental Care" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.92) 100%)' }} />
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', top: '1.75rem', left: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '0.4rem 1rem', color: 'white', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          {t('hero.badgeLive')}
        </motion.div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem 2.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{t('hero.badge')}</p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 8vw, 3.2rem)', fontWeight: 800, lineHeight: 1.08, color: 'white', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              {t('hero.headline')}{' '}
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: 'var(--accent)' }}>{t('hero.headlineItalic')}</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontWeight: 500, lineHeight: 1.55, maxWidth: '340px' }}>{t('hero.description')}</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/booking" style={{ flex: 1, textAlign: 'center', padding: '0.95rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none' }}>{t('hero.bookBtn')}</Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '0.95rem 1rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: '14px', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none' }}>{t('hero.whatsappBtn')}</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
