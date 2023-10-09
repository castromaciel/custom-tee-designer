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
        amount={1}
        radius={2}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={2}
        radius={6}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
