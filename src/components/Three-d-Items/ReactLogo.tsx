import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

interface ReactLogoProps {
  position: [number, number, number];
  scale: number;
}

const ReactLogo = ({ position, scale }: ReactLogoProps) => {
  const { nodes, materials } = useGLTF('/models/react_logo.glb');
  const ref = useRef<THREE.Group>(null);

  // Share the canvas loop so offscreen motion does not consume CPU.
  const time = useRef(0);
  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    time.current += step;
    if (ref.current) {
      ref.current.rotation.y = Math.PI * (1 - Math.cos(time.current * Math.PI / 2));
      ref.current.scale.setScalar(1.25 - .25 * Math.cos(time.current * Math.PI / 2));
    }
  });

  return (
    <group ref={ref} position={position}>
      <group scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes['React-Logo_Material002_0'] as THREE.Mesh).geometry}
          material={materials['Material.002']}
          position={[0, 7.935, 18.102]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[39.166, 39.166, 52.734]}
        />
      </group>
    </group>
  );
};


export default ReactLogo;
