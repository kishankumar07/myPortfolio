import SceneCanvas from './SceneCanvas';
import * as THREE from 'three';
import Globe from './Three-d-Items/Globe';
import { useMediaQuery } from 'react-responsive';

export default function ContactGlobeScene() {
const isMobile = useMediaQuery({maxWidth:768});
return (                <SceneCanvas

                  gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.05,
                  }}
                  camera={{
                    position: [0, 0.2, 5.5],
                    fov: isMobile ? 48 : 42,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  {/* Studio lighting for bright, crisp Earth view */}
                  <ambientLight intensity={1.0} />
                  <directionalLight position={[10, 14, 12]} intensity={2.4} castShadow />
                  <directionalLight position={[-10, 8, 8]} intensity={1.2} color="#bae6fd" />
                  <pointLight position={[0, 6, 6]} intensity={1.2} color="#ffffff" />
                  <hemisphereLight color="#ffffff" groundColor="#0284c7" intensity={0.9} />

                  <Globe />
                </SceneCanvas>);
}
