export default function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.5rem 3rem',
    }}>
      {/* Gradient fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.92), transparent)',
        pointerEvents: 'none',
      }} />
      <a href="#" style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '1.6rem', letterSpacing: '0.1em',
        color: '#f5f3ee', textDecoration: 'none', position: 'relative',
      }}>
        SOLE 3D
      </a>
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', position: 'relative' }}>
        {['Story', 'Features', 'Reviews', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'rgba(245,243,238,0.5)', textDecoration: 'none',
                fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = '#c8a96e'}
              onMouseLeave={e => e.target.style.color = 'rgba(245,243,238,0.5)'}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
