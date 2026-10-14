import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-scroll'
import Scene3D from './components/Scene3D'
import { useLenis } from './hooks/useLenis'

/* ── Scene data ────────────────────────────────────────────── */
const SCENES = [
  {
    id:'sc0', scrollId:'home', align:'l',
    label:'New Collection 2025',
    title:[<>SOLE <span className="g">3D</span></>],
    body:'Luxury sneakers, precision-engineered. Every step, perfected.',
    cta:true,
  },
  {
    id:'sc1', scrollId:'story', align:'r',
    label:'Engineered Comfort',
    title:['THE HEEL'],
    body:'Precision heel cup with adaptive flex technology. Reduces fatigue across long distances, cradling your foot with surgical accuracy.',
    stats:[{n:'12°',l:'Ideal pitch'},{n:'3×',l:'Impact absorption'}],
  },
  {
    id:'sc2', scrollId:'sole', align:'l',
    label:'Ground Contact',
    title:['THE SOLE'],
    body:'Carbon-reinforced outsole with 128 independent lug points. Every terrain conquered with brutal efficiency and zero slip.',
    stats:[{n:'128',l:'Lug points'},{n:'98%',l:'Grip retention'}],
  },
  {
    id:'sc3', scrollId:'front', align:'r',
    label:'Natural Motion',
    title:['THE FRONT'],
    body:'A toebox that breathes with your foot. Micro-perforated leather allows airflow while maintaining structural integrity.',
    stats:[{n:'0.4mm',l:'Material flex'},{n:'40%',l:'More breathable'}],
  },
  {
    id:'sc4', scrollId:'material', align:'l',
    label:'Craftsmanship',
    title:[<>FULL <span className="g">GRAIN</span> LEATHER</>],
    body:'Sourced from Italian tanneries. Aged in open-air drums for 6 weeks. The surface develops character — every crease a memory.',
    stats:[{n:'6wk',l:'Tanning'},{n:'Italy',l:'Origin'}],
  },
  {
    id:'sc5', scrollId:'features', align:'c',
    label:"Why We're Different",
    titleSmall:true,
    title:[<>BUILT <span className="g">DIFFERENT<br/></span></>],
    grid:true,
  },
  {
    id:'sc6', scrollId:'reviews', align:'c',
    label:'What People Say',
    titleSmall:true,
    title:[<>STEP INTO <span className="g">THE FUTURE</span></>],
    testi:true,
    contact:true,
  },
]

const FEATURES = [
  {icon:'M12 1L1 7v7l11 9 11-9V7L12 1z', title:'Premium Leather', body:'Full-grain Italian leather aged 6 weeks for unmatched durability.'},
  {icon:'M12 3a9 9 0 100 18A9 9 0 0012 3z', title:'Air Cushion', body:'Micro-air pocket midsole absorbs impact across every stride.'},
  {icon:'M3 20L12 3l9 17H3z', title:'Carbon Sole', body:'Carbon-fiber outsole: rigid where needed, flexible where it counts.'},
  {icon:'M5 12a7 7 0 1014 0 7 7 0 00-14 0z', title:'Lifetime Support', body:'Free resoling and conditioning for the entire life of the shoe.'},
]
const TESTIS = [
  {text:'"SOLE 3D is the way to go. Love the design and build quality."', auth:'Marcus T. — Dallas, TX'},
  {text:'"Worth every single penny. The quality is absolutely unmatched."', auth:'Priya K. — New York, NY'},
  {text:'"Superb fit and comfort. Literally the next level experience."', auth:'James R. — Chicago, IL'},
]

const N   = SCENES.length
const BG  = ['01','02','03','04','05','06','07']
const lerp  = (a,b,t) => a+(b-a)*t
const clamp = (v,lo,hi) => Math.min(Math.max(v,lo),hi)
const ek    = (k,dt) => 1-Math.exp(-k*dt)

/* ── Nav items that link with react-scroll ─────────────────── */
const NAV_LINKS = [
  {label:'Story',    to:'story'},
  {label:'Features', to:'features'},
  {label:'Reviews',  to:'reviews'},
  {label:'Contact',  to:'reviews'},
]

export default function App() {
  const lenisRef   = useLenis()
  const panelRefs  = useRef([])
  const panelTypes = useRef([])
  const pbRef      = useRef(null)
  const bgnRef     = useRef(null)
  const shintRef   = useRef(null)
  const dotsRef    = useRef(null)
  const curRef     = useRef(null)
  const ringRef    = useRef(null)
  const mouse      = useRef({x:0,y:0,rx:0,ry:0})
  const [mobileOpen, setMobileOpen] = useState(false)
  const isFine     = typeof window !== 'undefined' && window.matchMedia('(pointer:fine)').matches

  /* Custom cursor */
  useEffect(() => {
    if (!isFine) return
    const onMove = e => { mouse.current.x=e.clientX; mouse.current.y=e.clientY }
    document.addEventListener('mousemove', onMove, {passive:true})
    const big = () => {
      if(curRef.current){curRef.current.style.width='14px';curRef.current.style.height='14px'}
      if(ringRef.current){ringRef.current.style.width='42px';ringRef.current.style.height='42px'}
    }
    const sm = () => {
      if(curRef.current){curRef.current.style.width='7px';curRef.current.style.height='7px'}
      if(ringRef.current){ringRef.current.style.width='28px';ringRef.current.style.height='28px'}
    }
    document.querySelectorAll('a,button,[data-goto]').forEach(el=>{
      el.addEventListener('mouseenter',big)
      el.addEventListener('mouseleave',sm)
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [isFine])

  /* Cache panel types once mounted */
  useEffect(() => {
    panelTypes.current = panelRefs.current.map(p => {
      if (!p) return 'l'
      if (p.classList.contains('r')) return 'r'
      if (p.classList.contains('c')) return 'c'
      return 'l'
    })
  }, [])

  /* Main animation RAF */
  useEffect(() => {
    let rafId, lastSI=-1
    const m = mouse.current
    const DT = 1/60

    function frame() {
      rafId = requestAnimationFrame(frame)

      // Use lenis.scroll for perfect sync when lenis is active
      const scrollY   = window.__lenis ? window.__lenis.scroll : window.scrollY
      const maxScroll = (N-1)*window.innerHeight
      const progress  = clamp(scrollY/maxScroll, 0, 1)
      const sf        = clamp(scrollY/window.innerHeight, 0, N-1)

      if (pbRef.current)
        pbRef.current.style.transform = `scaleX(${progress})`

      if (shintRef.current)
        shintRef.current.style.opacity = clamp(1-sf*2.2, 0, 1)

      const siR = Math.round(sf)
      if (siR !== lastSI) {
        if (bgnRef.current) bgnRef.current.textContent = BG[clamp(siR,0,N-1)]
        lastSI = siR
        dotsRef.current?.querySelectorAll('.dot')
          .forEach((d,i) => d.classList.toggle('on', i===siR))
      }
      if (bgnRef.current)
        bgnRef.current.style.transform = `translateY(${-(sf%1)*26}px)`

      // Panel slide-in/out
      for (let i=0; i<panelRefs.current.length; i++) {
        const p = panelRefs.current[i]
        if (!p) continue
        const dist  = sf - i
        const adist = Math.abs(dist)
        if (adist > 1.8) { p.style.visibility='hidden'; continue }
        p.style.visibility = 'visible'
        const op = clamp(1-adist*1.3, 0, 1)
        const sc = lerp(0.93, 1, clamp(1-adist*0.85, 0, 1))
        const isMobile = window.innerWidth <= 768
        let tx=0, ty=0
        const type = panelTypes.current[i]
        if (isMobile) {
          // on mobile, panels slide vertically only
          ty = clamp(dist * 45, -75, 75)
        } else if (type==='c') {
          ty = clamp(dist*52, -88, 88)
        } else if (type==='r') {
          tx = clamp(dist*-72, -105, 105)
        } else {
          tx = clamp(dist*72, -105, 105)
        }
        p.style.transform     = `translate(${tx}px,${ty}px) scale(${sc})`
        p.style.opacity       = op
        p.style.pointerEvents = adist<0.45?'all':'none'
      }

      // Cursor
      if (isFine) {
        m.rx = lerp(m.rx, m.x, ek(14,DT))
        m.ry = lerp(m.ry, m.y, ek(14,DT))
        if (curRef.current)  { curRef.current.style.left=m.x+'px';   curRef.current.style.top=m.y+'px' }
        if (ringRef.current) { ringRef.current.style.left=m.rx+'px'; ringRef.current.style.top=m.ry+'px' }
      }
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [isFine])

  /* Keyboard nav */
  useEffect(() => {
    const keys = e => {
      const cur = Math.round((window.__lenis?.scroll ?? window.scrollY)/window.innerHeight)
      const next = e.key==='ArrowDown'||e.key==='PageDown' ? Math.min(cur+1,N-1)
                 : e.key==='ArrowUp'  ||e.key==='PageUp'   ? Math.max(cur-1,0)
                 : null
      if (next===null) return
      if (window.__lenis) window.__lenis.scrollTo(next*window.innerHeight, {duration:1.2})
      else window.scrollTo({top:next*window.innerHeight, behavior:'smooth'})
    }
    document.addEventListener('keydown', keys)
    return () => document.removeEventListener('keydown', keys)
  }, [])

  /* Dot click navigation */
  const goToScene = i => {
    const target = i * window.innerHeight
    if (window.__lenis) window.__lenis.scrollTo(target, {duration:1.2})
    else window.scrollTo({top:target, behavior:'smooth'})
  }

  /* Close mobile nav on scroll */
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('scroll', close, {passive:true})
    return () => window.removeEventListener('scroll', close)
  }, [])

  const setRef = i => el => { panelRefs.current[i] = el }

  /* react-scroll offset accounts for sticky nav height */
  const SCROLL_OFFSET = typeof window !== 'undefined' && window.innerWidth <= 768 ? -60 : -80

  return (
    <>
      {/* Custom cursor (desktop only) */}
      {isFine && <><div id="cur" ref={curRef}/><div id="cur-ring" ref={ringRef}/></>}

      {/* Fixed UI */}
      <div id="pb"    ref={pbRef}/>
      <div id="bgn"   ref={bgnRef}>01</div>
      <div id="shint" ref={shintRef}><div className="sh-line"/><p>Scroll</p></div>

      {/* Scene dots */}
      <div id="dots" ref={dotsRef}>
        {SCENES.map((_,i) => (
          <div key={i} className={`dot${i===0?' on':''}`} onClick={()=>goToScene(i)}/>
        ))}
      </div>

      {/* ── NAV ── */}
      <nav id="nav">
        {/* Logo — react-scroll to top */}
        <Link
          className="nav-logo"
          to="home"
          smooth
          duration={1200}
          offset={SCROLL_OFFSET}
        >
          SOLE 3D <span>2025</span>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                smooth
                duration={1200}
                offset={SCROLL_OFFSET}
                spy
                activeClass="active"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          id="menu-btn"
          className={mobileOpen ? 'open' : ''}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menu"
        >
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile full-screen nav */}
      <div id="mobile-nav" className={mobileOpen ? 'open' : ''}>
        {NAV_LINKS.map(l => (
          <Link
            key={l.to}
            to={l.to}
            smooth
            duration={1200}
            offset={SCROLL_OFFSET}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="mob-nav-foot">New York, NY · +1 (555) 123-4567</div>
      </div>

      {/* ── 3D Canvas ── */}
      <Scene3D/>

      {/* ── SCROLL CONTENT — 7 scenes × 100vh ── */}
      <div id="content">
        {SCENES.map((sc, i) => (
          <div
            className="scene"
            key={sc.id}
            id={sc.scrollId}   /* react-scroll targets this id */
          >
            <div className="pin">
              <div
                className={`panel${sc.align==='r'?' r':sc.align==='c'?' c':''}`}
                ref={setRef(i)}
              >
                <div className="pc">
                  <span className="p-label">{sc.label}</span>

                  <div className="p-title" style={sc.titleSmall?{fontSize:'clamp(2.2rem,5vw,4rem)'}:{}}>
                    {sc.title}
                  </div>

                  {sc.body && <p className="p-body">{sc.body}</p>}

                  {sc.stats && (
                    <div className="p-stats">
                      {sc.stats.map(s => (
                        <div key={s.l}>
                          <div className="st-n">{s.n}</div>
                          <div className="st-l">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sc.cta && (
                    <div className="p-cta">
                      <Link className="btn" to="story" smooth duration={1200} offset={SCROLL_OFFSET}>
                        Explore Story
                      </Link>
                      <Link className="btn-o" to="features" smooth duration={1200} offset={SCROLL_OFFSET}>
                        See Features →
                      </Link>
                    </div>
                  )}

                  {sc.grid && (
                    <div className="feat-grid">
                      {FEATURES.map(f => (
                        <div className="fc" key={f.title}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d={f.icon} stroke="#c8a96e" strokeWidth="1.1"/>
                          </svg>
                          <h4>{f.title}</h4>
                          <p>{f.body}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sc.testi && (
                    <div className="t-strip">
                      {TESTIS.map(t => (
                        <div className="tc" key={t.auth}>
                          <div className="tc-stars">★★★★★</div>
                          <div className="tc-text">{t.text}</div>
                          <div className="tc-auth">{t.auth}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {sc.contact && (
                    <>
                      <div className="contact-details">
                        <a className="contact-detail" href="mailto:hello@sole3d.demo">
                          <span className="contact-label">Email</span>
                          <span className="contact-value">hello@sole3d.demo</span>
                        </a>
                        <a className="contact-detail" href="tel:+15551234567">
                          <span className="contact-label">Phone</span>
                          <span className="contact-value">+1 (555) 123-4567</span>
                        </a>
                        <div className="contact-detail">
                          <span className="contact-label">Address</span>
                          <span className="contact-value">123 Fashion Avenue, New York, NY</span>
                        </div>
                        <a className="contact-detail" href="https://www.instagram.com/sole3d/" target="_blank" rel="noreferrer">
                          <span className="contact-label">Instagram</span>
                          <span className="contact-value">@sole3d</span>
                        </a>
                        <div className="contact-detail">
                          <span className="contact-label">Working Hours</span>
                          <span className="contact-value">Monday–Saturday, 10 AM–7 PM</span>
                        </div>
                      </div>
                      <p className="demo-note">Demo information only. These are not real contact details.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <footer>
          <div className="footer-brand">
            <span>© 2025 SOLE 3D</span>
            <span>Luxury Sneakers Since 1998</span>
            <span className="footer-demo">Demo information only. These are not real contact details.</span>
          </div>
          <div className="footer-contact">
            <a href="mailto:hello@sole3d.demo">hello@sole3d.demo</a>
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
            <span>123 Fashion Avenue, New York, NY</span>
            <a href="https://www.instagram.com/sole3d/" target="_blank" rel="noreferrer">@sole3d</a>
            <span>Monday–Saturday, 10 AM–7 PM</span>
          </div>
        </footer>
      </div>
    </>
  )
}
