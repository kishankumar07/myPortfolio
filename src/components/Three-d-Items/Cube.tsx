import { FC, useRef } from "react";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CubeProps {
  position: [number, number, number];
  scale: number;
}

const Cube: FC<CubeProps> = ({ position, scale }) => {
  const ref = useRef<THREE.Mesh>(null);

  // Run decorative motion only while the canvas is rendering.
  const time = useRef(0);
  useFrame((_, delta) => {
    const step = Math.min(delta, .05);
    time.current += step;
    if (ref.current) {
      ref.current.rotation.x += step * Math.PI / 3;
      ref.current.rotation.y += step * Math.PI / 3;
      ref.current.scale.setScalar(scale * (1.1 - .1 * Math.cos(time.current * Math.PI / 1.5)));
      (ref.current.material as THREE.MeshStandardMaterial).color.setRGB(.03, .52 + .03 * Math.sin(time.current), .85 + .1 * Math.sin(time.current));
    }
  });

  return (
    <mesh ref={ref} position={position} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0284c7" roughness={0.25} metalness={0.2} />
    </mesh>
  );
};

export default Cube;
