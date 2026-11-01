import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Environment, Float, Stars } from '@react-three/drei'
import { useRef } from 'react'

function MetallicSphere() {
  const ref = useRef()
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={ref} args={[1, 128, 128]} scale={2.2}>
        <MeshDistortMaterial
          color="#a1a1aa" /* metallic gray */
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#6d28d9" />
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <MetallicSphere />
    </Canvas>
  )
}
