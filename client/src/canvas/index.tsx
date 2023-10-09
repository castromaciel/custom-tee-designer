import { Center, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { FC } from 'react'
import { Backdrop, CameraRig, Shirt } from './partials'

interface CanvasProps { }

const CanvasModel: FC<CanvasProps> = () => (
  <Canvas
    shadows
    camera={{ position: [0, 0, 0], fov: 35 }}
    gl={{ preserveDrawingBuffer: true }}
    className='w-full max-w-full h-full transition-all ease-in'
  >
    <ambientLight intensity={0.5} />
    <Environment preset='city' />

    <CameraRig>
      <Backdrop />

      <Center>
        <Shirt />
      </Center>
    </CameraRig>
  </Canvas>
)

export default CanvasModel
