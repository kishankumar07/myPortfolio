import { FC, useRef, useEffect } from "react";
import * as THREE from 'three';
import { gsap } from 'gsap';

interface CubeProps {
  position: [number, number, number];
  scale: number;
}

const Cube: FC<CubeProps> = ({ position, scale }) => {
  const ref = useRef<THREE.Mesh>(null);

  // GSAP animation for smooth rotation, elastic scaling, and soft color transition
  useEffect(() => {
    if (ref.current) {
      // Continuous rotation animation
      gsap.to(ref.current.rotation, {
        x: "+=6.28",  // Full rotation (2 * PI) on the X-axis
        y: "+=6.28",  // Full rotation (2 * PI) on the Y-axis
        duration: 6,  // Duration of 6 seconds
        repeat: -1,   // Loop infinitely
        ease: "none"  // Smooth constant speed rotation
      });

      // Elastic scale animation for subtle pulsating effect
      gsap.to(ref.current.scale, {
        x: scale * 1.2,
        y: scale * 1.2,
        z: scale * 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "elastic.out(1, 0.75)" // Elastic easing for smooth bounce effect
      });

      // Smooth color transition (gentle transition between colors)
      gsap.to((ref.current.material as THREE.MeshStandardMaterial).color, {
        r: 0.5,
        g: 0.7,
        b: 1, // Soft blue color shift
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, [scale]);

  return (
    <mesh ref={ref} position={position} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
};

export default Cube;
