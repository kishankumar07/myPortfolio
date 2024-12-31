import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { projects } from "../utils/constants";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";

const Projects = () => {
  

  // Use media queries to detect screen sizes
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Define grid columns based on screen size
  const gridCols = isSmall
    ? "grid-cols-1"
    : isMobile
    ? "grid-cols-2"
    : isTablet
    ? "grid-cols-3"
    : "grid-cols-4";

  return (
    <div
    id={`projects`}
    className="projects-section bg-base-200 p-6"
  >
    <h2 className="text-3xl md:text-4xl xl:text-5xl text-primary font-bold text-center mb-8">
      My Projects
    </h2>
    <div
      className={`grid ${gridCols} gap-6`}
      style={{
        maxWidth: "100%", // Ensures the grid doesn't overflow
      }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="project-card bg-base-200 rounded-lg shadow-lg p-4 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="rounded-md w-full h-48 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold text-base-content mb-2">
            {project.title}
          </h3>
          <p className="text-base text-base-content mb-4 text-center">
            {project.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {project.Documentation && (
              <motion.a
                href={project.Documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-primary rounded-full flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <IoDocumentTextOutline className="text-lg" />
                <span>Documentation</span>
              </motion.a>
            )}
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-secondary rounded-full flex items-center space-x-2"
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub className="text-lg" />
                <span>GitHub</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  
    {/* Divider */}
    <div className="flex w-full flex-col">
      <div className="divider"></div>
    </div>
    {/* Divider */}
  </div>
  
  );
};

export default Projects;
