import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('cookies-consent')) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible && acceptRef.current) {
      acceptRef.current.focus();
    }
  }, [visible]);

  const accept = () => {
    localStorage.setItem('cookies-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookies-consent', 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('cookies.banner.ariaLabel')}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(92vw, 620px)',
            background: 'white',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            padding: '1.75rem',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {t('cookies.banner.text')}{' '}
              <Link to="/cookies" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>
                {t('cookies.banner.learnMore')}
              </Link>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              ref={acceptRef}
              onClick={accept}
              className="btn btn-primary"
              style={{ flex: 1, minWidth: '120px', padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
            >
              {t('cookies.banner.accept')}
            </button>
            <button
              onClick={reject}
              className="btn"
              style={{ flex: 1, minWidth: '120px', padding: '0.75rem 1.25rem', fontSize: '0.9rem', background: 'white', border: '1.5px solid var(--border-light)', color: 'var(--text-main)', fontWeight: 700 }}
            >
              {t('cookies.banner.reject')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
