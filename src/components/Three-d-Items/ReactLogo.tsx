import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from "three"

interface ReactLogoProps {
  position: [number, number, number];
  scale: number;
}

const ReactLogo = ({ position, scale }: ReactLogoProps) => {
  const { nodes, materials } = useGLTF('/models/react_logo.glb');
  const ref = useRef<THREE.Group>(null);

  // GSAP animation for scale and rotation
  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(ref.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

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

useGLTF.preload('/models/react_logo.glb');

export default ReactLogo;
