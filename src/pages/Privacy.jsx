import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const H2 = { fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' };
const ROW = { borderBottom: '1px solid var(--border-light)' };

export default function Privacy() {
  const { t } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const p = t('legal.privacy', { returnObjects: true });

  return (
    <main id="main-content" tabIndex="-1" style={{ background: '#FDFDFF', minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav aria-label="Miga de pan" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>{t('legal.home')}</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>›</span>
          <span style={{ color: 'var(--text-muted)' }}>{p.breadcrumb}</span>
        </nav>

        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{p.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t('legal.lastUpdated')}: 17/05/2026</p>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <p>{p.intro}</p>

            <section aria-labelledby="p1">
              <h2 id="p1" style={H2}>{p.s1Title}</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  {p.s1Rows.map(([k, v]) => (
                    <tr key={k} style={ROW}>
                      <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', width: '35%', verticalAlign: 'top' }}>{k}</td>
                      <td style={{ padding: '0.6rem 0', verticalAlign: 'top' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section aria-labelledby="p2">
              <h2 id="p2" style={H2}>{p.s2Title}</h2>
              <p><strong>{p.s2Id}</strong></p>
              <p style={{ marginTop: '0.5rem' }}><strong>{p.s2Health}</strong></p>
              <p style={{ marginTop: '0.5rem' }}>{p.s2Tech}</p>
            </section>

            <section aria-labelledby="p3">
              <h2 id="p3" style={H2}>{p.s3Title}</h2>
              <p>{p.s3Intro}</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.s3Items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section aria-labelledby="p4">
              <h2 id="p4" style={H2}>{p.s4Title}</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                    {p.s4Head.map(h => <th key={h} style={{ padding: '0.5rem 1rem 0.5rem 0', textAlign: 'left', color: 'var(--text-main)' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {p.s4Rows.map(([f, b]) => (
                    <tr key={f} style={ROW}>
                      <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontWeight: 600, color: 'var(--text-main)', width: '35%' }}>{f}</td>
                      <td style={{ padding: '0.6rem 0' }}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section aria-labelledby="p5"><h2 id="p5" style={H2}>{p.s5Title}</h2><p>{p.s5Text}</p></section>
            <section aria-labelledby="p6"><h2 id="p6" style={H2}>{p.s6Title}</h2><p>{p.s6Text}</p></section>
            <section aria-labelledby="p7"><h2 id="p7" style={H2}>{p.s7Title}</h2><p>{p.s7Text}</p></section>

            <section aria-labelledby="p8">
              <h2 id="p8" style={H2}>{p.s8Title}</h2>
              <p>{p.s8Intro}</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.s8Items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p style={{ marginTop: '0.75rem' }}>{p.s8Contact}</p>
            </section>

            <section aria-labelledby="p9"><h2 id="p9" style={H2}>{p.s9Title}</h2><p>{p.s9Text}</p></section>
            <section aria-labelledby="p10"><h2 id="p10" style={H2}>{p.s10Title}</h2><p>{p.s10Text}</p></section>
            <section aria-labelledby="p11"><h2 id="p11" style={H2}>{p.s11Title}</h2><p>{p.s11Text}</p></section>

            <section aria-labelledby="p12">
              <h2 id="p12" style={H2}>{p.s12Title}</h2>
              <p>{p.s12Text.split('www.prodhab.go.cr')[0]}
                <a href="https://www.prodhab.go.cr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>www.prodhab.go.cr</a>
                {p.s12Text.split('www.prodhab.go.cr')[1]}
              </p>
            </section>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <Link to="/terms" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.terms')}</Link>
              <Link to="/cookies" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.cookies')}</Link>
              <Link to="/accessibility" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.accessibility')}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
