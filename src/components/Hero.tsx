import { Canvas } from "@react-three/fiber";
import "animate.css";
import { Suspense, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "react-responsive";
import ComputerTable from "./Three-d-Items/ComputerTable";
import Cube from "./Three-d-Items/Cube";
import ReactLogo from "./Three-d-Items/ReactLogo";
import MaskedDiamond from "./Three-d-Items/MaskedDiamond";
import Snowflake from "./Three-d-Items/Snowflake";
import { cameraSettings } from "../utils/constants";

const Hero = () => {
  // Media Queries
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  // Memoized 3D Components to prevent unnecessary re-renders
  const MemoizedComputerTable = useMemo(
    () => (
      <ComputerTable
        position={[10, -50, 0]}
        rotation={[0, Math.PI, 0]}
        scale={[1, 1, 1]}
      />
    ),
    []
  );

  const MemoizedCube = useMemo(
    () => <Cube position={[90, -60, 0]} scale={16} />,
    []
  );

  const MemoizedReactLogo = useMemo(
    () => <ReactLogo position={[60, 60, 40]} scale={0.05} />,
    []
  );

  const MemoizedSnowflake = useMemo(
    () => <Snowflake position={[-100, 50, 0]} scale={0.5} />,
    []
  );

  return (
    <>
      <div className="hero bg-base-200 lg:h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between">
          {/* Hero Text */}
          <div
            className={`hero-text max-w-md text-center xl:ml-5 lg:text-left z-10 space-y-6 lg:space-y-8 ${
              isMobile ? "mb-4" : ""
            }`}
          >
            {/* Animated Heading */}
            <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold text-primary flex items-center">
              <span role="img" aria-label="hello hand" className="wave">
                👋
              </span>
              <p className="animate__animated animate__rubberBand">
                Hello, I'm Kishan
              </p>
            </h1>

            {/* Subheading */}
            <p className="lg:text-3xl md:text-2xl text-md text-primary animate__animated animate__swing">
              Full Stack Developer from India
            </p>

            {/* Button */}
            <button
              className="btn btn-primary rounded-lg"
              aria-label="Download My CV"
              onClick={() => {
                const link = document.createElement("a");
                // Use the Google Drive direct download link
                link.href =
                  "https://drive.google.com/uc?export=download&id=1JYs0b1DuIDZ7AmC1nOz6eDhBIOo0cVF4";
                link.download = "Kishan_CV.pdf"; 
                link.click();
              }}
            >
              Download My CV
            </button>
          </div>
         
          {/* 3D Canvas */}
          <div
            className={`w-full ${
              isDesktop
                ? "lg:w-[600px]"
                : isTablet
                ? "lg:h-[500px] w-[80%]"
                : "w-full"
            } ${isMobile ? "h-80" : "h-96"}`}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <p>Loading</p>
                  <span className="loading loading-dots loading-md text-primary"></span>
                </div>
              }
            >
              <Canvas
                dpr={Math.min(window.devicePixelRatio, isMobile ? 1 : 2)}
                camera={{
                  position: new THREE.Vector3(...cameraSettings.position),
                  fov: cameraSettings.fov,
                  near: cameraSettings.near,
                  far: cameraSettings.far,
                }}
              >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={1}
                  castShadow
                />

                {/* 3D Objects */}
                {MemoizedComputerTable}
                <MaskedDiamond position={[-90, -60, 0]} scale={20} />
                {MemoizedCube}
                {MemoizedReactLogo}
                {MemoizedSnowflake}

                {/* Camera Controls */}
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col bg-base-200">
        <div className="divider bg-base-200"></div>
      </div>
    </>
  );
};

export default Hero;
