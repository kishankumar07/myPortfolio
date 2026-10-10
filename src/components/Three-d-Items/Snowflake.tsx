import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import * as THREE from 'three'
import { useMediaQuery } from 'react-responsive'

const Snowflake = (props: JSX.IntrinsicElements['group']) => {
  const mobile = useMediaQuery({ query: '(max-width: 768px), (pointer: coarse)' })
  const { nodes, materials } = useGLTF(mobile ? '/models/spiral_snowflakes_mobile.glb' : '/models/spiral_snowflakes.glb')
  const coneRef = useRef<THREE.Mesh>(null)

  const time = useRef(0);
  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    time.current += step;
    if (coneRef.current) {
      coneRef.current.rotation.y += step * Math.PI / 3;
      coneRef.current.rotation.x = Math.PI + .25 * (1 - Math.cos(time.current * Math.PI / 3));
      coneRef.current.rotation.z = .15 * (1 - Math.cos(time.current * Math.PI / 3));
    }
  });

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


export default Snowflake
