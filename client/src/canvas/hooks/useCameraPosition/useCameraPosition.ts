import state from '@/store'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { Group } from 'three'
import { useSnapshot } from 'valtio'

const useCameraPosition = () => {
  const groupRef = useRef<Group>(null);
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    let targetPosition: [number, number, number] = [-0.4, 0, 2]

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2]
      if (isMobile) targetPosition = [0, 0.2, 2.5]
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    easing.damp3(
      state.camera.position,
      targetPosition,
      0.25,
      delta
    )

    easing.dampE(
      groupRef.current!.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })

  return {
    groupRef,
  }
}

export default useCameraPosition