import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { skills } from "../utils/constants";

const Skills = () => {
  
  // Use media queries to detect screen sizes
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Define grid columns based on screen size using ternary operator
  const gridCols = isSmall
    ? "grid-cols-5"
    : isMobile
    ? "grid-cols-6"
    : isTablet
    ? "grid-cols-8"
    : "grid-cols-12";

  return (
    <div id={`about`} className="about-and-skills  p-6  bg-base-200 overflow-hidden">
      {/* About Me Section */}
      <section className="about-me-section mb-12">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-primary mb-8">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Photo */}
          <motion.img
            src="https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649330/my_picture1_g84eqo.jpg"
            alt="Your Name"
            className="w-40 h-40 md:w-44 md:h-44 lg:w-64 lg:h-64 rounded-full shadow-lg outline-red-200 outline"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {/* About Text */}
          <motion.div
  className="text-base-content max-w-lg text-center md:text-left px-6 py-4  rounded-lg shadow-xl transform transition-all hover:scale-105 outline"
  whileHover={{ scale: 1.02 }}
>
  <p className="text-md md:text-lg lg:text-xl font-semibold  tracking-wide leading-relaxed">
    Hi, I'm a passionate and results-driven full-stack developer with expertise in building modern web applications. I specialize in the MERN stack, microservices architecture, and 3D web development.
  </p>
</motion.div>

        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-primary mt-24 mb-5">Skills</h2>

        <div className={`grid ${gridCols} gap-6 justify-center items-center `}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-base-200 rounded-lg flex flex-col justify-center items-center shadow-lg border-gray-700 hover:ring-2 hover:ring-blue-500 "
              whileHover={{ scale: 1.1 }} // Zoom in on hover
              whileTap={{ scale: 0.95 }} // Zoom out on tap/click
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={skill.texture}
                alt={skill.name}
                className="skill-icon w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
              />
              <p className="mt-2 text-xs md:text-sm lg:text-base text-center font-medium truncate w-full ">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

{/* Divider */}
  <div className="flex w-full flex-col">
  <div className="divider"></div>
  </div>
  {/* Divider */}
    </div>

    
  );
};

export default Skills;
