import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Mask, useMask } from "@react-three/drei";
import * as THREE from "three";

interface MaskedDiamondProps {
  position?: [number, number, number];
  scale?: number;
  jumpHeight?: number; // Height of the jump
  speed?: number; // Speed of the jump
}

const MaskedDiamond: React.FC<MaskedDiamondProps> = ({
  position = [0, 0, 0],
  scale = 1,
  jumpHeight = 10,
  speed = 3,
}) => {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf"
  );
  const groupRef = useRef<THREE.Group>(null);
  const stencil = useMask(1, false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime(); // Time in seconds

      // Yoyo effect using a sine wave and energy boost
      const yOffset =
        Math.abs(Math.sin(time * speed)) * jumpHeight * Math.pow(0.8, time % 1);

      groupRef.current.position.y = position[1] + yOffset;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Stencil Mask */}
      <Mask id={1}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshStandardMaterial color="white" />
      </Mask>

      {/* Target Model (Diamond Shape) */}
      <primitive object={scene} {...stencil} />
    </group>
  );
};

export default MaskedDiamond;
