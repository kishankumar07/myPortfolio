import { useEffect } from 'react';
import FitScene from './FitScene';
import SceneCanvas from './SceneCanvas';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Books from './Three-d-Items/Books';
import { useMediaQuery } from 'react-responsive';

function BooksReady() {
  useEffect(() => { window.dispatchEvent(new Event('education-books-ready')); }, []);
  return null;
}

export default function EducationScene() {
  const touch = useMediaQuery({ query: "(pointer: coarse)" });
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  // Set 3D model properties dynamically based on screen size (properly scaled with full visibility)
  const modelProps = {
    scale: isSmall ? 13 : isMobile ? 14.5 : isTablet ? 16 : 18,
    position: isSmall
      ? [0, -0.35, 0]
      : isMobile
      ? [0, -0.35, 0]
      : isTablet
      ? [0, -0.4, 0]
      : [0, -0.45, 0],
    rotation: [0, -Math.PI, 0],
  };

return (                <SceneCanvas

                  gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                  }}
                  camera={{
                    position: [0, 3.6, 9.8],
                    fov: isMobile ? 42 : 38,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  {/* Multi-Point Studio Lighting for Bright Open Book Definition */}
                  <ambientLight intensity={1.3} />

                  {/* Key Directional Sun Light */}
                  <directionalLight
                    position={[10, 18, 12]}
                    intensity={2.2}
                    castShadow
                  />

                  {/* Soft Fill Light from Left */}
                  <directionalLight
                    position={[-12, 14, 10]}
                    intensity={1.3}
                    color="#dbeafe"
                  />

                  {/* Top Spotlight on Open Pages */}
                  <pointLight
                    position={[0, 12, 8]}
                    intensity={1.4}
                    distance={60}
                    color="#fffbeb"
                  />

                  {/* Ground Bounce Light */}
                  <hemisphereLight
                    color="#ffffff"
                    groundColor="#cbd5e1"
                    intensity={0.9}
                  />

                  {/* Gentle Hover Animation */}
                  <FitScene margin={1.06}>
                  <Float
                    speed={1.4}
                    rotationIntensity={0.05}
                    floatIntensity={0.12}
                    floatingRange={[-0.08, 0.08]}
                  >
                    <Books {...modelProps} /><BooksReady />
                  </Float>
                  </FitScene>

                  {/* Soft Floor Contact Shadow */}
                  <ContactShadows
                    frames={1}
                    resolution={256}
                    position={[0, -1.0, 0]}
                    opacity={0.3}
                    scale={12}
                    blur={2.4}
                    far={8}
                    color="#0f172a"
                  />

                  {!touch && <OrbitControls
                    makeDefault
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                    minPolarAngle={Math.PI / 6}
                    enableDamping={true}
                    dampingFactor={0.06}
                  />}
                </SceneCanvas>);
}
