import { motion } from 'framer-motion';
import  { Suspense, lazy } from 'react'
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
// import Books from './Three-d-Items/Books';

const Books = lazy(() => import('./Three-d-Items/Books')); // Lazy load Books component

const Education = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Set 3D model properties dynamically based on screen size
  const modelProps = {
    scale: isSmall ? 30 : isMobile ? 30 : isTablet ? 24 : 34,
    position: isSmall
      ? [0, -1.5, 1]
      : isMobile
      ? [0, -1.5, 1]
      : isTablet
      ? [0, -2, 1]
      : [0, -2.5, 1],
    rotation: [0, -Math.PI, 0],
  };

  // Dynamic text size based on screen size
  const headingSize = isSmall
    ? 'text-xl'
    : isMobile
    ? 'text-2xl'
    : isTablet
    ? 'text-3xl'
    : 'text-4xl';

  const subHeadingSize = isSmall
    ? 'text-lg'
    : isMobile
    ? 'text-xl'
    : isTablet
    ? 'text-2xl'
    : 'text-3xl';

  const contentTextSize = isSmall
    ? 'text-sm'
    : isMobile
    ? 'text-base'
    : isTablet
    ? 'text-lg'
    : 'text-xl';

    // Disable shadows on mobile/tablet for better performance
  const lightingProps = {
    intensity: 0.7,
    position: [0, 10, 10] as [number, number, number],
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-200 overflow-hidden">
      {/* Education Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`${headingSize} font-bold text-3xl md:text-5xl xl:text-6xl text-primary text-center w-full mb-8 mt-0 `}
      >
        Education
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        {/* 3D Model */}
        <div
          className={`${
            isTablet ? 'w-1/2' : isMobile ? 'w-4/5' : 'w-5/6'
          } flex justify-center mb-8 md:mb-0 `}
          style={{ height: isSmall ? '200px' : isMobile ? '300px' : '400px' }}
        >
         {/* Wrapping the entire Canvas with Suspense for lazy loading */}
         <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <p>Loading</p>
                  <span className="loading loading-dots loading-md text-primary"></span>
                </div>
              }>
            <Canvas
              className="w-full h-full"
              camera={{
                position: [0, 3, 10],
                fov: isMobile ? 55 : 65, // Adjust FOV for smaller screens
                near: 0.1,
                far: 1000,
              }}
              frameloop="demand" // Reduce frame rate on mobile
            >
              <ambientLight intensity={0.7} />
              <directionalLight
                position={lightingProps.position}
                intensity={lightingProps.intensity}
              />
              {/* Lazy-loaded 3D Books component */}
              <Books {...modelProps} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </Suspense>
        </div>

        {/* Education Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`bg-base-200 text-base-content rounded-lg shadow-lg p-8 ${
            isTablet ? 'w-2/5' : 'w-full max-w-lg'
          }`}
        >
          {/* Bachelor of Technology */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="border-l-4 border-primary pl-4 mb-6"
          >
            <h3 className={`${subHeadingSize} font-semibold`}>
              Bachelor of Technology
            </h3>
            <p className={`${contentTextSize} mt-2`}>
              Electronics and Communication Engineering
            </p>
            <p className={`${contentTextSize} mt-2`}>
              <span className="font-medium">CGPA: 7.15</span>
            </p>
            <p className={`${contentTextSize} mt-1`}>
              Year: 2016-20
            </p>
            <h3 className={`${contentTextSize} mt-4 font-semibold`}>
                Dr. APJ Abdul Kalam Technological University
            </h3>
            <p className={`${contentTextSize} text-base-content/70`}>
              Thiruvananthapuram, Kerala, India
            </p>
          </motion.div>

          {/* St. Jude Public School */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="border-l-4 border-primary pl-4"
          >
            <p className={`${contentTextSize} mt-3`}>
              <span className="font-medium">12th Grade (CGPA: 9.26)</span>
              <br />
              Year: 2014–15
            </p>
            <p className={`${contentTextSize} mt-3`}>
              <span className="font-medium">10th Grade (CGPA: 10)</span>
              <br />
              Year: 2012–13
            </p>
            <h3 className={`${contentTextSize} font-semibold mt-4`}>
              St. Jude Public School
            </h3>
            <p className={`${contentTextSize}  text-base-content/80`}>
              Thrissur, Kerala, India
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col bg-base-200">
        <div className="divider bg-base-200"></div>
      </div>
    </div>
  );
};

export default Education;
