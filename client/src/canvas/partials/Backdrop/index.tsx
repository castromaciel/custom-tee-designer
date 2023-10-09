import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { ReactThreeFiber } from '@react-three/fiber';
import { useRef } from 'react';

type SoftShadowMaterialProps = {
  map: THREE.Texture;
  color?: ReactThreeFiber.Color;
  alphaTest?: number;
  blend?: number;
};

interface AccumulativeContext {
  lights: Map<any, any>
  temporal: boolean
  frames: number
  blend: number
  count: number
  /** Returns the plane geometry onto which the shadow is cast */
  getMesh: () => THREE.Mesh<THREE.PlaneGeometry, SoftShadowMaterialProps & THREE.ShaderMaterial>
  /** Resets the buffers, starting from scratch */
  reset: () => void
  /** Updates the lightmap for a number of frames accumulartively */
  update: (frames?: number) => void
}

const Backdrop = () => {
  const shadowsRef = useRef<AccumulativeContext>(null)

  return (
    <AccumulativeShadows
      ref={shadowsRef}
      temporal
      frames={60}
      alphaTest={0.55}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={10}
        radius={15}
        intensity={0.95}
        ambient={0.55}
        position={[12, 12, -27]}
      />
      <RandomizedLight
        amount={4}
        radius={8}
        intensity={0.55}
        ambient={0.95}
        position={[-12, 12, -25]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
