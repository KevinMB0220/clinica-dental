import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const H2 = { fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' };
const H3 = { fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' };

export default function Accessibility() {
  const { t } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const A = t('legal.accessibility', { returnObjects: true });

  return (
    <main id="main-content" tabIndex="-1" style={{ background: '#FDFDFF', minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav aria-label="Miga de pan" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>{t('legal.home')}</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>›</span>
          <span style={{ color: 'var(--text-muted)' }}>{A.breadcrumb}</span>
        </nav>

        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{A.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t('legal.lastUpdated')}: 17/05/2026</p>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p>{A.intro}</p>
            <p><strong>{A.standard}</strong></p>

            <section aria-labelledby="a1">
              <h2 id="a1" style={H2}>{A.measuresTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  [A.perception, A.perceptionItems],
                  [A.operability, A.operabilityItems],
                  [A.understandability, A.understandabilityItems],
                  [A.robustness, A.robustnessItems],
                ].map(([heading, items]) => (
                  <div key={heading}>
                    <h3 style={H3}>{heading}</h3>
                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="a2">
              <h2 id="a2" style={H2}>{A.limitationsTitle}</h2>
              <p>{A.limitationsText}</p>
            </section>

            <section aria-labelledby="a3">
              <h2 id="a3" style={H2}>{A.contactTitle}</h2>
              <p>{A.contactText}</p>
              <p style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{A.contactInfo}</p>
            </section>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.privacy')}</Link>
              <Link to="/terms" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.terms')}</Link>
              <Link to="/cookies" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.cookies')}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
