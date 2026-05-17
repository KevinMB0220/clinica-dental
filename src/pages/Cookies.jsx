import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const H2 = { fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' };

export default function Cookies() {
  const { t } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const C = t('legal.cookies', { returnObjects: true });

  return (
    <main id="main-content" tabIndex="-1" style={{ background: '#FDFDFF', minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav aria-label="Miga de pan" style={{ marginBottom: '2rem', fontSize: '0.85rem' }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>{t('legal.home')}</Link>
          <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>›</span>
          <span style={{ color: 'var(--text-muted)' }}>{C.breadcrumb}</span>
        </nav>

        <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{C.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t('legal.lastUpdated')}: 17/05/2026</p>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p>{C.intro}</p>

            <section aria-labelledby="c1">
              <h2 id="c1" style={H2}>{C.tableTitle}</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-input)' }}>
                      {C.tableHeaders.map(h => (
                        <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-main)', borderBottom: '2px solid var(--border-light)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {C.tableRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{row[0]}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row[1]}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row[2]}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>{row[3]}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{ color: row[4] === 'No' ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>{row[4]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="c2">
              <h2 id="c2" style={H2}>{C.managementTitle}</h2>
              <p>{C.managementText}</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {C.browsers.map(([browser, path]) => (
                  <li key={browser}><strong>{browser}:</strong> {path}</li>
                ))}
              </ul>
            </section>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.privacy')}</Link>
              <Link to="/terms" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.terms')}</Link>
              <Link to="/accessibility" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>{t('footer.accessibility')}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
