export default function Footer() {
  return (
    <footer style={{ padding: '2rem 0', marginTop: 'auto', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <p>&copy; {new Date().getFullYear()} Turrialba Dental Care. All rights reserved.</p>
          <a href="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Admin Login</a>
        </div>
      </div>
    </footer>
  );
}
