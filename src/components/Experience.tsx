import { motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { experiences } from "../utils/constants";

const Experience = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isAbove970 = useMediaQuery({ minWidth: 970 });

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const getAlignmentClass = (index: number) => {
    if (isSmall || isMobile) return "text-center mx-auto";
    return index % 2 === 0 ? "text-left ml-auto" : "text-left mr-auto";
  };

  const getPointerClass = () => {
    return "absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-sm border-2 border-base-100 shadow-lg z-20";
  };

  return (
    <div id={`experience`} className="experience-section bg-base-200 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
        Professional Experience
      </h2>
      <motion.div
        className="relative w-full mx-auto max-w-5xl px-4 "
        initial="hidden"
        animate={controls}
        viewport={{ once: true }}
      >
        {/* Clean Animated Timeline */}
        {isAbove970 && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary origin-top z-10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Pointers */}
            {experiences.map((_, index) => (
              <motion.div
                key={index}
                className={getPointerClass()}
                style={{
                  top: `${(index + 1) * (100 / (experiences.length + 1))}%`,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Experience Cards */}
        <div className="flex flex-col items-center gap-10 md:gap-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col w-full max-w-md card bg-base-100 shadow-lg ${getAlignmentClass(
                index
              )}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.3,
                type: "spring",
                stiffness: 120,
              }}
            >
              {/* Experience Card */}
              <motion.div
                className="card-body p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 z-20"
                whileHover={{
                  boxShadow: "0px 0px 20px rgba(0, 162, 255, 0.5)",
                }}
              >
                <h3 className="card-title text-base md:text-xl font-bold text-primary">
                  {exp.year}
                </h3>
                <p className="text-md md:text-primary text-secondary font-medium">
                  {exp.company}
                </p>
                <p className="text-sm italic mb-4">{exp.role}</p>
                <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="flex w-full flex-col ">
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default Experience;
