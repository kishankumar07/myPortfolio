import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const Snowflake = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/spiral_snowflakes.glb')
  const coneRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (coneRef.current) {
      // Continuous rotation on Y-axis (spinning like a top)
      gsap.to(coneRef.current.rotation, {
        y: '+=6.28', // Full rotation on Y-axis
        repeat: -1,  // Infinite loop
        duration: 6, // Increased duration for slower rotation
        ease: 'none' // Smooth, consistent rotation
      })

      // Tilting motion on X-axis (wobbling effect)
      gsap.to(coneRef.current.rotation, {
        x: '+=0.5',    // Tilt forward
        duration: 3,   // Increased duration for slower wobble
        repeat: -1,    // Infinite loop
        yoyo: true,    // Back and forth motion
        ease: 'sine.inOut', // Smooth easing for a wobble effect
      })

      // Optional: Slight tilt on Z-axis for a more dynamic motion
      gsap.to(coneRef.current.rotation, {
        z: '+=0.3',    // Slight wobble sideways
        duration: 3,   // Matches the X-axis wobble duration
        repeat: -1,    // Infinite loop
        yoyo: true,    // Back and forth motion
        ease: 'sine.inOut',
      })
    }
  }, [])

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={coneRef}
        castShadow
        receiveShadow
        geometry={(nodes.Object_2 as THREE.Mesh).geometry}
        material={materials.color_8079359}
        position={[0, 0, 0]} // Centered position
        rotation={[Math.PI, 0, 0]} // Point facing downward initially
      />
    </group>
  )
}

useGLTF.preload('/models/spiral_snowflakes.glb')

export default Snowflake
