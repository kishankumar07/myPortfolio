import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { projects } from "../utils/constants";

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
    <div id={`projects`} className="projects-section bg-base-200  p-6">
      <h2 className="text-3xl text-primary font-bold text-center  mb-8">My Projects</h2>
      <div className={`grid ${gridCols} gap-6`}>
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
              className="rounded-md w-full h-48 object-contain mb-4 "
            />
            <h3 className="text-xl font-semibold text-base-content mb-2">{project.title}</h3>
            <p className="text-base text-base-content mb-4 text-center">
              {project.description}
            </p>
            <div className="flex space-x-4">
              {project.Documentation && (
                <a
                  href={project.Documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content hover:underline"
                >
                 Documentation
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content hover:underline"
                >
                  GitHub
                </a>
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
