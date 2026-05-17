import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WHATSAPP_LINK = "https://wa.me/50625562673";
const HERO_IMAGE = "/assets/hero-luxury.png";

const servicesList = [
  "Ortodoncia", "Implantes", "Endodoncia", "Odontopediatría", "Periodoncia", "Quiropodia",
  "Estética Dental", "Limpieza Profunda", "Cirugía", "Laboratorio Propio", "Prótesis Inmediata",
  "Blanqueamiento", "Rayos X", "Diseño de Sonrisa", "Coronas", "Carillas"
];

const marqueeRow1 = [...servicesList];
const marqueeRow2 = [...servicesList].reverse();

const SPECIALTY_KEYS = ['orthodontics', 'implants', 'endodontics', 'pediatric', 'periodontics', 'chiropody', 'lab'];

import MobileHero from '../components/MobileHero';
import MobileTrustBanner from '../components/MobileTrustBanner';
import MobileGallery from '../components/MobileGallery';
import MobileServices from '../components/MobileServices';
import MobileTeam from '../components/MobileTeam';
import Testimonials from '../components/Testimonials';
import BackToTop from '../components/BackToTop';

export default function Home() {
  const { t } = useTranslation();

  const galleryItems = [
    { titleKey: 'gallery.consulting', img: '/assets/hero-luxury.png' },
    { titleKey: 'gallery.lab', img: '/assets/hero-luxury.png' },
  ];
  const infiniteGallery = [...galleryItems, ...galleryItems];

  return (
    <div className="home-page">

      {/* ── MOBILE EXPERIENCE ── */}
      <MobileHero />
      <MobileTrustBanner />
      <MobileGallery />
      <MobileServices />
      <MobileTeam />

      {/* ── DESKTOP EXPERIENCE ── */}
      <div className="hidden lg:block">

      {/* ── 1. HERO SECTION ── */}
      <section className="hero-section-desktop" style={{ height: 'calc(100vh - 90px)', display: 'flex', flexDirection: 'column', padding: '1rem 0' }} id="home">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem', width: '100%', padding: '0 5%' }}>

          {/* TOP INFO (35%) */}
          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                {t('hero.headline')} <br />
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, color: 'var(--primary)', position: 'relative', display: 'inline-block', marginTop: '0.5rem', fontSize: '1.1em' }}>
                  {t('hero.headlineItalicDesktop')}
                </span>
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem', fontWeight: 500 }}>
                {t('hero.desktopDescription')}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link to="/booking" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
                  {t('hero.bookBtn')}
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  {t('hero.whatsappBtn')}
                </a>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM IMAGE (65%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1', position: 'relative', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}
            className="hero-image-container"
          >
            <img src={HERO_IMAGE} alt="Clínica Turrialba Dental" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            {/* Overlay: Bottom Left Info */}
            <div className="mobile-hide" style={{ position: 'absolute', bottom: '3rem', left: '3rem', textAlign: 'left', maxWidth: '380px', zIndex: 10 }}>
               <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem', textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
                 {t('gallery.lab')} <br />
               </h2>
               <p style={{ color: 'white', fontSize: '1rem', fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                 {t('gallery.subtitle')}
               </p>
            </div>

            {/* Overlay: LARGE TRANSPARENT CAROUSEL */}
            <div className="hero-marquee-container" style={{ position: 'absolute', bottom: '3rem', right: '3rem', left: '35%', background: 'transparent', padding: '0', overflow: 'hidden' }}>
               <div style={{ position: 'relative', width: '100%', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                  <motion.div style={{ display: 'flex', gap: '2.5rem', marginBottom: '1.25rem', width: 'max-content' }} animate={{ x: [0, -1200] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                    {marqueeRow1.map((s, i) => (
                      <div key={i} style={{ padding: '0.6rem 1.8rem', background: 'rgba(255,255,255,0.98)', borderRadius: 'var(--radius-pill)', fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--text-main)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>{s}</div>
                    ))}
                  </motion.div>
                  <motion.div className="mobile-hide" style={{ display: 'flex', gap: '2.5rem', width: 'max-content' }} animate={{ x: [-1200, 0] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                    {marqueeRow2.map((s, i) => (
                      <div key={i} style={{ padding: '0.6rem 1.8rem', background: 'rgba(255,255,255,0.98)', borderRadius: 'var(--radius-pill)', fontSize: '0.9rem', fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--text-main)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>{s}</div>
                    ))}
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. TRUST BANNER ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        style={{ padding: '2rem 0', background: 'white', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '4rem' }}>
          {[t('trust.night'), t('trust.repairs'), t('trust.children')].map((text, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── 3. CARRUSEL AUTOMÁTICO ── */}
      <motion.section
        id="clinica"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ padding: '6rem 0', overflow: 'hidden' }}
      >
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2>{t('gallery.title')}</h2>
        </motion.div>
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="marquee-track" style={{ display: 'flex', width: 'max-content' }}>
            {[...infiniteGallery, ...infiniteGallery].map((item, i) => (
              <div key={i} style={{ width: '480px', height: '340px', position: 'relative', flexShrink: 0, marginRight: '2rem' }}>
                <img src={item.img} alt={t(item.titleKey)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.95)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-card)' }}>
                  {t(item.titleKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 4. SERVICIOS (BENTO GRID) ── */}
      <section id="servicios" className="bg-soft" style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div
            className="section-title"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ textAlign: 'center' }}
          >
            <h2>{t('services.desktopTitle')}</h2>
          </motion.div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 'minmax(240px, auto)', gap: '1.25rem' }}>
            {SPECIALTY_KEYS.map((key, index) => {
              let gridSpan = 'span 2';
              if (index === 0) gridSpan = 'span 4';
              if (index === 5 || index === 6) gridSpan = 'span 3';
              return (
                <motion.div
                  key={key}
                  className="dashboard-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  whileHover={{ borderColor: 'var(--primary)', translateY: -5, boxShadow: 'var(--shadow-hover)' }}
                  style={{ padding: '2.5rem', border: '1px solid var(--border-light)', cursor: 'pointer', gridColumn: gridSpan, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '4px', height: '32px', background: 'var(--primary)', borderRadius: 'var(--radius-pill)', flexShrink: 0, marginTop: '4px' }}></div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>{t(`services.items.${key}.title`)}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{t(`services.items.${key}.description`)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. EQUIPO ── */}
      <section id="equipo" className="container dashboard-section">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ textAlign: 'center' }}
        >
          <h2>{t('team.desktopTitle')}</h2>
        </motion.div>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {[
            { name: 'Dra. Sharlene Torres', roleKey: 'team.roles.orthodontics', detailKey: 'team.director', img: HERO_IMAGE },
            { name: 'Dra. Sofía Chacón', roleKey: 'team.roles.general', detailKey: 'team.night', img: HERO_IMAGE },
            { name: 'Dra. Alina Quesada', roleKey: 'team.roles.pediatric', detailKey: 'team.specialist', img: HERO_IMAGE },
          ].map((doc, i) => (
            <motion.div
              key={i}
              className="dashboard-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ translateY: -10, boxShadow: 'var(--shadow-hover)' }}
              style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-light)' }}
            >
              <div style={{ width: '100%', height: '380px', position: 'relative' }}>
                <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', boxShadow: 'var(--shadow-card)' }}>
                  {t(doc.detailKey)}
                </div>
              </div>
              <div style={{ padding: '2.5rem' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>{doc.name}</h4>
                <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>{t(doc.roleKey)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* WhatsApp Flotante */}
      <a href={WHATSAPP_LINK} className="hidden lg:flex" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '2rem', right: '2rem', backgroundColor: '#10B981', color: 'white', width: 'auto', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-pill)', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(16, 129, 67, 0.4)', zIndex: 1000, textDecoration: 'none', fontWeight: 800 }}>
        WhatsApp
      </a>

      </div> {/* END DESKTOP EXPERIENCE */}

      <BackToTop />
    </div>
  );
}
