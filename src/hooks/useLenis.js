import { useEffect, useRef } from 'react'

/**
 * useLenis — initialises @studio-freight/lenis smooth scroll.
 * Returns lenis ref so components can call lenis.scrollTo().
 */
export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    let lenis
    let rafId

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1.0,
        smoothWheel: true,
        smoothTouch: false,
        normalizeWheel: true,
        orientation: 'vertical',
      })

      lenisRef.current = lenis
      // Global ref so ShoeModel.jsx can read lenis.scroll
      window.__lenis = lenis

      function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      window.__lenis = null
    }
  }, [])

  return lenisRef
}
