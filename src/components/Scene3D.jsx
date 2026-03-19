import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import ShoeModel from './ShoeModel'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'12px'}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.6rem',letterSpacing:'.3em',color:'#f5f3ee'}}>TSC</div>
        <div style={{width:160,height:1,background:'rgba(245,243,238,.08)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:'0 auto 0 0',background:'#c8a96e',width:`${progress}%`,transition:'width .1s'}}/>
        </div>
        <div style={{fontSize:'.55rem',letterSpacing:'.24em',color:'rgba(245,243,238,.25)'}}>{Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

export default function Scene3D() {
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
  return (
    <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}>
      <Canvas
        camera={{ position:[0,0,3.5], fov:42, near:0.05, far:50 }}
        gl={{
          antialias: dpr < 2,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={dpr}
        shadows
        onCreated={({gl}) => {
          gl.toneMapping = 3
          gl.toneMappingExposure = 1.35
          gl.shadowMap.autoUpdate = false
          gl.shadowMap.needsUpdate = true
        }}
        style={{background:'transparent'}}
      >
        <hemisphereLight args={[0x1a1a2e, 0x0a0a0a, 0.6]}/>
        <directionalLight position={[5,8,6]} intensity={2.5} color="#fff4e0"
          castShadow shadow-mapSize-width={512} shadow-mapSize-height={512}/>
        <directionalLight position={[-5,-2,3]} intensity={0.9} color="#d4aa70"/>
        <directionalLight position={[0,-6,-5]} intensity={1.1}/>
        <pointLight position={[-2,3,2]} intensity={2.2} color="#d4b87c" distance={14}/>
        <Suspense fallback={<Loader/>}>
          <ShoeModel/>
        </Suspense>
      </Canvas>
    </div>
  )
}
