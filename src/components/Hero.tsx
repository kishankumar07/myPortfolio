import { Canvas } from "@react-three/fiber";
import "animate.css";
import { Suspense, useMemo } from "react";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";
import ComputerTable from "./Three-d-Items/ComputerTable";
import Cube from "./Three-d-Items/Cube";
import ReactLogo from "./Three-d-Items/ReactLogo";
import MaskedDiamond from "./Three-d-Items/MaskedDiamond";
import Snowflake from "./Three-d-Items/Snowflake";

const Hero = () => {
  // Responsive Media Queries
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  // Responsive table scale (reduced size to highlight desk & surrounding floating items)
  const tableScale: [number, number, number] = useMemo(
    () => (isMobile ? [0.58, 0.58, 0.58] : isTablet ? [0.68, 0.68, 0.68] : [0.78, 0.78, 0.78]),
    [isMobile, isTablet]
  );

  const tablePosition: [number, number, number] = useMemo(
    () => [0, -50, 0],
    []
  );

  const MemoizedComputerTable = useMemo(
    () => (
      <ComputerTable
        position={tablePosition}
        rotation={[0, Math.PI, 0]}
        scale={tableScale}
      />
    ),
    [tablePosition, tableScale]
  );

  // Floating badges with perfectly balanced, refined size and clear clearance from the desk
  const MemoizedCube = useMemo(
    () => (
      <Cube
        position={isMobile ? [64, -48, 15] : isTablet ? [70, -48, 15] : [78, -48, 15]}
        scale={isMobile ? 6.5 : isTablet ? 8 : 9.5}
      />
    ),
    [isMobile, isTablet]
  );

  const MemoizedReactLogo = useMemo(
    () => (
      <ReactLogo
        position={isMobile ? [64, 30, 15] : isTablet ? [70, 32, 16] : [76, 35, 18]}
        scale={isMobile ? 0.024 : isTablet ? 0.028 : 0.034}
      />
    ),
    [isMobile, isTablet]
  );

  const MemoizedSnowflake = useMemo(
    () => (
      <Snowflake
        position={isMobile ? [-66, 30, 10] : isTablet ? [-72, 32, 12] : [-80, 36, 12]}
        scale={isMobile ? 0.22 : isTablet ? 0.26 : 0.32}
      />
    ),
    [isMobile, isTablet]
  );

  const MemoizedDiamond = useMemo(
    () => (
      <MaskedDiamond
        position={isMobile ? [-66, -48, 15] : isTablet ? [-72, -48, 15] : [-78, -48, 15]}
        scale={isMobile ? 8.5 : isTablet ? 10 : 12}
      />
    ),
    [isMobile, isTablet]
  );

  // Camera settings calibrated for complete downward isometric perspective with generous margins
  const cameraZ = isMobile ? 245 : isTablet ? 230 : 215;
  const cameraY = isMobile ? 65 : 58;

  return (
    <>
      <div className="hero bg-base-200 min-h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden py-6 lg:py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">

          {/* Left: Hero Text */}
          <div className="hero-text w-full lg:w-1/2 max-w-xl text-center lg:text-left z-10 space-y-5 lg:space-y-6">
            {/* Animated Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary flex items-center justify-center lg:justify-start gap-2">
              <span role="img" aria-label="hello hand" className="wave text-4xl sm:text-5xl">
                👋
              </span>
              <span className="animate__animated animate__rubberBand">
                Hello, I'm Kishan
              </span>
            </h1>

            {/* Professional Headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary animate__animated animate__fadeInUp leading-snug">
              IT Support Specialist | Microsoft 365 | Windows & Network Support
            </h2>

            {/* Supporting Description with balanced typography to eliminate orphan words */}
            <p className="text-base sm:text-lg text-base-content/85 animate__animated animate__fadeInUp leading-relaxed [text-wrap:balance] max-w-lg mx-auto lg:mx-0">
              Supporting users, systems, and business operations through reliable IT solutions, proactive troubleshooting, and secure technology management.
            </p>

            {/* Location Line */}
            <p className="text-sm font-semibold text-primary/80 flex items-center justify-center lg:justify-start gap-1.5 animate__animated animate__fadeInUp tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary shrink-0 opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Based in Dubai, UAE</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a
                className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold"
                aria-label="Download My CV"
                href="https://drive.google.com/file/d/10jXLjYNFC2b4K-vd9pFRr-JCP0W3g7Rx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download My CV
              </a>

              <Link
                to="experience"
                smooth={true}
                duration={500}
                className="btn btn-outline btn-primary rounded-xl px-6 hover:bg-primary hover:text-primary-content transition-all duration-300 font-semibold"
                aria-label="View My Experience"
              >
                View My Experience
              </Link>
            </div>
          </div>

          {/* Right: 3D Canvas Showcase */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative">
            <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[540px] xl:h-[600px] max-w-full cursor-grab active:cursor-grabbing">
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm font-medium text-base-content/70">Loading 3D Workspace...</p>
                  </div>
                }
              >
                <Canvas
                  dpr={[1, 2]}
                  gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                  }}
                  camera={{
                    position: [0, cameraY, cameraZ],
                    fov: 46,
                    near: 0.1,
                    far: 1000,
                  }}
                >
                  {/* Rich Studio & Accent Lighting Setup */}
                  <ambientLight intensity={1.3} />

                  {/* Key Directional Light for crisp definition */}
                  <directionalLight
                    position={[15, 40, 25]}
                    intensity={2.4}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                  />

                  {/* Soft Fill Light from left to brighten shadow areas */}
                  <directionalLight
                    position={[-30, 25, 20]}
                    intensity={1.3}
                    color="#dbeafe"
                  />

                  {/* Soft Rim Light from behind */}
                  <directionalLight
                    position={[0, 35, -35]}
                    intensity={1.5}
                    color="#ffffff"
                  />

                  {/* Front Spotlight on Desk & Keyboard */}
                  <pointLight
                    position={[0, 25, 60]}
                    intensity={1.3}
                    distance={280}
                    color="#ffffff"
                  />

                  {/* Cyber Cyan Accent Light */}
                  <pointLight
                    position={[60, 25, 25]}
                    intensity={1.5}
                    distance={220}
                    color="#38bdf8"
                  />

                  {/* Tech Violet Accent Light */}
                  <pointLight
                    position={[-60, 25, 25]}
                    intensity={1.3}
                    distance={220}
                    color="#c084fc"
                  />

                  {/* Hemisphere Bounce Light for clear undersides */}
                  <hemisphereLight
                    color="#ffffff"
                    groundColor="#cbd5e1"
                    intensity={0.9}
                  />

                  {/* Dynamic Floating 3D Scene */}
                  <Float
                    speed={1.4}
                    rotationIntensity={0.05}
                    floatIntensity={0.15}
                    floatingRange={[-2, 2]}
                  >
                    {MemoizedComputerTable}
                    {MemoizedDiamond}
                    {MemoizedCube}
                    {MemoizedReactLogo}
                    {MemoizedSnowflake}
                  </Float>

                  {/* Realistic Soft Floor Contact Shadows */}
                  <ContactShadows
                    position={[0, -51, 0]}
                    opacity={0.45}
                    scale={240}
                    blur={2.4}
                    far={80}
                    color="#0f172a"
                  />

                  {/* Smooth Interactive Camera Controls targeted at the desk center */}
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    target={[0, -20, 0]}
                    maxPolarAngle={Math.PI / 2 - 0.05}
                    minPolarAngle={Math.PI / 6}
                    enableDamping={true}
                    dampingFactor={0.06}
                  />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col bg-base-200">
        <div className="divider bg-base-200 my-0"></div>
      </div>
    </>
  );
};

export default Hero;
