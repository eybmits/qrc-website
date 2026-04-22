import Link from 'next/link';

const actionStyle = {
  background: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(67, 104, 138, 0.14)',
  borderRadius: 999,
  boxShadow: 'var(--shadow-soft)',
  color: 'var(--accent-primary)',
  display: 'inline-flex',
  fontFamily: 'var(--font-ui), sans-serif',
  fontSize: '0.9rem',
  fontWeight: 700,
  padding: '0.78rem 1.05rem',
  textDecoration: 'none',
} as const;

export default function NotFound() {
  return (
    <section
      style={{
        margin: '0 auto',
        maxWidth: 760,
        minHeight: '100vh',
        padding: '7rem 1.5rem 4rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          border: '1px solid rgba(67, 104, 138, 0.12)',
          borderRadius: 24,
          boxShadow: 'var(--shadow-soft)',
          padding: '2rem 2rem 2.2rem',
        }}
      >
        <p
          style={{
            color: 'var(--accent-secondary)',
            fontFamily: 'var(--font-ui), sans-serif',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            marginBottom: '0.8rem',
            textTransform: 'uppercase',
          }}
        >
          404
        </p>
        <h1 style={{ marginTop: 0 }}>Page not found</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 620 }}>
          This route does not exist in the current QRC reading path. The quickest way back is the homepage, the main
          essay, or the review hub.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '1.4rem',
          }}
        >
          <Link href="/" style={actionStyle}>
            Go home
          </Link>
          <Link href="/qrc" style={actionStyle}>
            Open Part 2
          </Link>
          <Link href="/review" style={actionStyle}>
            Open review cards
          </Link>
        </div>
      </div>
    </section>
  );
}
