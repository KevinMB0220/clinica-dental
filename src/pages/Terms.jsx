import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const H2 = { fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' };

export default function Terms() {
  const { t } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const T = t('legal.terms', { returnObjects: true });

  return (
    <main id="main-content" tabIndex="-1" style={{ background: '#FDFDFF', minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav aria-label="Miga de pan" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>{t('legal.home')}</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>›</span>
          <span style={{ color: 'var(--text-muted)' }}>{T.breadcrumb}</span>
        </nav>

        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{T.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t('legal.lastUpdated')}: 17/05/2026</p>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <section aria-labelledby="t1"><h2 id="t1" style={H2}>{T.s1Title}</h2><p>{T.s1Text}</p></section>
            <section aria-labelledby="t2"><h2 id="t2" style={H2}>{T.s2Title}</h2><p>{T.s2Text}</p></section>

            <section aria-labelledby="t3">
              <h2 id="t3" style={H2}>{T.s3Title}</h2>
              <p>{T.s3Text}</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {T.s3Items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section aria-labelledby="t4"><h2 id="t4" style={H2}>{T.s4Title}</h2><p>{T.s4Text}</p></section>
            <section aria-labelledby="t5"><h2 id="t5" style={H2}>{T.s5Title}</h2><p>{T.s5Text}</p></section>
            <section aria-labelledby="t6"><h2 id="t6" style={H2}>{T.s6Title}</h2><p>{T.s6Text}</p></section>
            <section aria-labelledby="t7"><h2 id="t7" style={H2}>{T.s7Title}</h2><p>{T.s7Text}</p></section>

            <section aria-labelledby="t8">
              <h2 id="t8" style={H2}>{T.s8Title}</h2>
              <p>{T.s8Text.split('Privacy Policy')[0] || T.s8Text.split('Política de Privacidad')[0]}
                <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: 600 }}>{t('footer.privacy')}</Link>
                {T.s8Text.includes('Privacy Policy') ? T.s8Text.split('Privacy Policy')[1] : T.s8Text.split('Política de Privacidad')[1]}
              </p>
            </section>

            <section aria-labelledby="t9"><h2 id="t9" style={H2}>{T.s9Title}</h2><p>{T.s9Text}</p></section>
            <section aria-labelledby="t10"><h2 id="t10" style={H2}>{T.s10Title}</h2><p>{T.s10Text}</p></section>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.privacy')}</Link>
              <Link to="/cookies" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.cookies')}</Link>
              <Link to="/accessibility" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.accessibility')}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
