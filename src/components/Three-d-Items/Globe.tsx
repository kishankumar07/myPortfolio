import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Convert Lat/Lon to 3D Cartesian coordinates on sphere
const latLonToVector3 = (lat: number, lon: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
};

// Create crisp UAE Flag Canvas Texture
const createUAEFlagTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;

  // Horizontal Stripes
  const stripeH = h / 3;
  // Green
  ctx.fillStyle = '#00732F';
  ctx.fillRect(0, 0, w, stripeH);
  // White
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, stripeH, w, stripeH);
  // Black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, stripeH * 2, w, stripeH);

  // Left Vertical Red Bar (28% width)
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, w * 0.28, h);

  // Subtle realistic border
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Create crisp Indian Tiranga Flag Canvas Texture
const createIndiaFlagTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const w = canvas.width;
  const h = canvas.height;
  const stripeH = h / 3;

  // Saffron / Kesari (Top)
  ctx.fillStyle = '#FF9933';
  ctx.fillRect(0, 0, w, stripeH);

  // White (Middle)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, stripeH, w, stripeH);

  // India Green (Bottom)
  ctx.fillStyle = '#138808';
  ctx.fillRect(0, stripeH * 2, w, stripeH);

  // Ashoka Chakra (Center)
  const cx = w / 2;
  const cy = h / 2;
  const radius = stripeH * 0.42;

  ctx.strokeStyle = '#000080';
  ctx.fillStyle = '#000080';
  ctx.lineWidth = 2.5;

  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Center hub
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // 24 Spokes
  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI) / 12;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
  }

  // Subtle realistic border
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, w, h);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Reusable 3D Flag Pin Component
const FlagPin = ({
  texture,
  accentColor,
}: {
  texture: THREE.CanvasTexture;
  accentColor: string;
}) => {
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (rippleRef.current) {
      const scale = 1 + (Date.now() * 0.0025) % 1.6;
      const opacity = Math.max(0, 0.75 - (scale - 1) * 0.5);
      rippleRef.current.scale.set(scale, scale, scale);
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <group>
      {/* Flagpole (Silver metallic) */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.18, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Gold Top Finial Ball */}
      <mesh position={[0, 0.185, 0]}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Flag Banner */}
      <mesh position={[0.065, 0.13, 0]}>
        <planeGeometry args={[0.13, 0.08]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.4} />
      </mesh>

      {/* Base Ground Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[0.02, 0.045, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulsing Ripple Ring */}
      <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.045, 0.075, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const EarthMesh = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load local NASA high-resolution textures directly from /public/textures/
  const [earthTexture, cloudsTexture] = useTexture([
    '/textures/earth_day.jpg',
    '/textures/earth_clouds.png',
  ]);

  const uaeFlagTexture = useMemo(() => createUAEFlagTexture(), []);
  const indiaFlagTexture = useMemo(() => createIndiaFlagTexture(), []);

  // 1. UAE (Dubai): 25.2048° N, 55.2708° E
  const { uaePos, uaeQuat } = useMemo(() => {
    const pos = latLonToVector3(25.2048, 55.2708, 2.0);
    const vPos = new THREE.Vector3(...pos);
    const normal = vPos.clone().normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return { uaePos: pos, uaeQuat: quat };
  }, []);

  // 2. India (Kerala): 10.8505° N, 76.2711° E
  const { keralaPos, keralaQuat } = useMemo(() => {
    const pos = latLonToVector3(10.8505, 76.2711, 2.0);
    const vPos = new THREE.Vector3(...pos);
    const normal = vPos.clone().normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return { keralaPos: pos, keralaQuat: quat };
  }, []);

  useFrame((_, delta) => {
    // Planetary rotation
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.12;
    }
    // Atmospheric clouds parallax rotation
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.16;
    }
  });

  return (
    <group dispose={null}>
      {/* 1. Photorealistic NASA Blue Marble Earth Sphere */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.05}
        />

        {/* UAE 3D Flag Pin */}
        <group position={uaePos} quaternion={uaeQuat}>
          <FlagPin texture={uaeFlagTexture} accentColor="#ef4444" />
        </group>

        {/* India (Kerala) 3D Flag Pin */}
        <group position={keralaPos} quaternion={keralaQuat}>
          <FlagPin texture={indiaFlagTexture} accentColor="#f97316" />
        </group>
      </mesh>

      {/* 2. Real Cloud Layer with Parallax Rotation */}
      <mesh ref={cloudsRef} scale={1.015}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Outer Atmospheric Rayleigh Glow */}
      <mesh scale={1.035}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const Globe = () => {
  return (
    <group scale={0.82}>
      <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.12}>
        <EarthMesh />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.06}
        rotateSpeed={0.8}
      />
    </group>
  );
};

export default Globe;
