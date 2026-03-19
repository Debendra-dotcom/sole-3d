import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ShoeModel — 7-scene scroll-driven 3D animation.
 *
 * Reads window.scrollY directly each frame.
 * When Lenis is active (window.__lenis), we read
 * lenis.scroll instead for perfectly synced smoothness.
 *
 * Keyframes per scene: rx, ry, rz, px, py, scale, camZ
 * Mobile keyframes reduce posX swing so shoe doesn't clip.
 */

// ── Desktop keyframes ─────────────────────────────────────────
const KF_DESKTOP = [
  { rx:0.00, ry:0.18, rz:0.00, px: 0.52, py:-0.04, sc:1.05, cz:3.50 },  // 0 HERO
  { rx:0.12, ry:2.70, rz:0.06, px:-0.62, py: 0.02, sc:1.12, cz:3.40 },  // 1 HEEL  ← left
  { rx:1.48, ry:0.25, rz:0.00, px: 0.00, py:-0.18, sc:1.18, cz:3.10 },  // 2 SOLE  top-down
  { rx:-0.10,ry:-0.85,rz:-0.05,px:-0.55, py: 0.00, sc:1.60, cz:3.00 },  // 3 FRONT ← left, sc matches scene4
  { rx:0.20, ry:3.90, rz:0.07, px:-0.28, py: 0.10, sc:1.60, cz:2.90 },  // 4 ZOOM
  { rx:0.15, ry:5.30, rz:-0.04,px: 0.88, py: 0.48, sc:0.68, cz:4.20 },  // 5 FEATURES
  { rx:0.10, ry:6.50, rz:0.00, px:-1.10, py:-0.55, sc:0.72, cz:4.00 },  // 6 FINAL
]

// ── Tablet keyframes (≤1024px) — less posX swing ─────────────
const KF_TABLET = [
  { rx:0.00, ry:0.18, rz:0.00, px: 0.30, py: 0.10, sc:0.95, cz:3.80 },  // 0 HERO
  { rx:0.10, ry:2.70, rz:0.05, px:-0.35, py: 0.05, sc:1.05, cz:3.70 },  // 1 HEEL
  { rx:1.48, ry:0.25, rz:0.00, px: 0.00, py:-0.10, sc:1.10, cz:3.30 },  // 2 SOLE
  { rx:-0.08,ry:-0.85,rz:-0.04,px:-0.30, py: 0.02, sc:1.45, cz:3.20 },  // 3 FRONT ← left, sc matches scene4
  { rx:0.18, ry:3.90, rz:0.06, px:-0.15, py: 0.10, sc:1.45, cz:3.10 },  // 4 ZOOM
  { rx:0.12, ry:5.30, rz:-0.03,px: 0.55, py: 0.45, sc:0.65, cz:4.40 },  // 5 FEATURES
  { rx:0.08, ry:6.50, rz:0.00, px:-0.65, py:-0.40, sc:0.68, cz:4.20 },  // 6 FINAL
]

// ── Mobile keyframes (≤768px) — centred, bottom area ─────────
const KF_MOBILE = [
  { rx:0.00, ry:0.20, rz:0.00, px: 0.00, py: 0.30, sc:0.80, cz:4.20 },
  { rx:0.10, ry:2.70, rz:0.04, px: 0.00, py: 0.28, sc:0.82, cz:4.20 },
  { rx:1.45, ry:0.25, rz:0.00, px: 0.00, py: 0.25, sc:0.85, cz:3.80 },
  { rx:-0.08,ry:-0.85,rz:-0.03,px: 0.00, py: 0.28, sc:0.82, cz:4.20 },
  { rx:0.18, ry:3.90, rz:0.05, px: 0.00, py: 0.30, sc:1.10, cz:3.50 },
  { rx:0.12, ry:5.30, rz:-0.02,px: 0.30, py: 0.50, sc:0.60, cz:5.00 },
  { rx:0.06, ry:6.50, rz:0.00, px:-0.30, py: 0.50, sc:0.62, cz:4.80 },
]

const N = KF_DESKTOP.length

const lerp  = (a,b,t) => a+(b-a)*t
const clamp = (v,lo,hi) => Math.min(Math.max(v,lo),hi)
const ss    = x => { const t=clamp(x,0,1); return t*t*(3-2*t) }
const ek    = (k,dt) => 1-Math.exp(-k*dt)

// Pre-allocated vectors — never new inside useFrame
const _box = new THREE.Box3()
const _ctr = new THREE.Vector3()
const _sz  = new THREE.Vector3()

function getKF() {
  const w = window.innerWidth
  if (w <= 768)  return KF_MOBILE
  if (w <= 1024) return KF_TABLET
  return KF_DESKTOP
}

export default function ShoeModel() {
  const meshRef = useRef()
  const { camera } = useThree()
  const { scene: mdl } = useGLTF('/models/shoe.glb')

  const V = useRef({
    rx: KF_DESKTOP[0].rx, ry: KF_DESKTOP[0].ry, rz: KF_DESKTOP[0].rz,
    px: KF_DESKTOP[0].px, py: KF_DESKTOP[0].py, sc: KF_DESKTOP[0].sc, t: 0
  })

  useEffect(() => {
    if (!mdl) return
    _box.setFromObject(mdl)
    _box.getCenter(_ctr)
    _box.getSize(_sz)
    const s = 1.8 / Math.max(_sz.x, _sz.y, _sz.z)
    mdl.scale.setScalar(s)
    mdl.position.copy(_ctr).multiplyScalar(-s)
    mdl.rotation.y = Math.PI * 0.08
    // Fix texture encoding
    mdl.traverse(c => {
      if (c.isMesh && c.material?.map) {
        c.material.map.encoding = THREE.sRGBEncoding
        c.material.needsUpdate = true
      }
    })
  }, [mdl])

  useFrame((_, dt) => {
    if (!meshRef.current) return
    const v = V.current
    const d = Math.min(dt, 0.05)
    v.t += d

    // Read from Lenis when available, else raw scrollY
    const scrollY = window.__lenis ? window.__lenis.scroll : window.scrollY
    const KF = getKF()

    const sf = clamp(scrollY / window.innerHeight, 0, N - 1)
    const si = clamp(Math.floor(sf), 0, N - 2)
    const st = ss(sf - si)
    const A = KF[si], B = KF[Math.min(si + 1, N - 1)]

    // Single lerp pass — k=9 reaches 90% in 256ms
    const lf = ek(9, d)
    v.rx = lerp(v.rx, lerp(A.rx, B.rx, st), lf)
    v.ry = lerp(v.ry, lerp(A.ry, B.ry, st), lf)
    v.rz = lerp(v.rz, lerp(A.rz, B.rz, st), lf)
    v.px = lerp(v.px, lerp(A.px, B.px, st), lf)
    v.py = lerp(v.py, lerp(A.py, B.py, st), lf)
    v.sc = lerp(v.sc, lerp(A.sc, B.sc, st), lf)
    camera.position.z = lerp(camera.position.z, lerp(A.cz, B.cz, st), ek(6, d))

    // Subtle idle float
    const fy = Math.sin(v.t * 0.68) * 0.028
    const fx = Math.cos(v.t * 0.41) * 0.010

    meshRef.current.rotation.x = v.rx + fx * 0.15
    meshRef.current.rotation.y = v.ry
    meshRef.current.rotation.z = v.rz + fx * 0.04
    meshRef.current.position.x = v.px + fx
    meshRef.current.position.y = v.py + fy
    meshRef.current.scale.setScalar(v.sc)
  })

  return <group ref={meshRef}><primitive object={mdl} /></group>
}

useGLTF.preload('/models/shoe.glb')
