import { useCameraPosition } from '@/canvas/hooks'
import { FC, ReactNode } from 'react'

interface CameraRigProps {
  children: ReactNode | ReactNode[]
}

const CameraRig: FC<CameraRigProps> = ({ children }) => {
  const { groupRef } = useCameraPosition()

  return (
    <group ref={groupRef}>
      { children }
    </group>
  )
}

export default CameraRig
