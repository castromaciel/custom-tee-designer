import { useStore } from '@/hooks'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { FC } from 'react'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface ShirtProps { }

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh
  }
  materials: {
    lambert1: any
  }
}

const Shirt: FC<ShirtProps> = () => {
  const snap = useStore()

  const { nodes, materials } = useGLTF('./shirt_baked.glb') as GLTFResult

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((_state, delta) => easing.dampC(materials.lambert1.color, snap.primaryColor, 0.25, delta))

  const stateString = JSON.stringify(snap)

  return (
    <group
      key={stateString}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {
          snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )
        }

        {
          snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              depthTest={false}
            />
          )
        }
      </mesh>
    </group>
  )
}

export default Shirt
