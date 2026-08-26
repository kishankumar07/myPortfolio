import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { experiences } from "../utils/constants";

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  location?: string;
  skills?: string[];
  details: string[];
}

const Experience = () => {
  const isMobile = useMediaQuery({ maxWidth: 970 });

  return (
    <div id="experience" className="experience-section bg-base-200 py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-primary">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-base-content/75 max-w-xl mx-auto">
            A track record of providing IT support, system administration, and web solutions.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative w-full">
          {/* Vertical Center Line for Desktop */}
          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-60 z-0" />
          )}

          {/* Cards List */}
          <div className="flex flex-col gap-10 md:gap-14">
            {(experiences as ExperienceItem[]).map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center w-full ${
                    isMobile
                      ? "justify-center"
                      : isLeft
                      ? "md:justify-start"
                      : "md:justify-end"
                  }`}
                >
                  {/* Timeline Center Node (Desktop) */}
                  {!isMobile && (
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-base-100 border-4 border-primary shadow-lg flex items-center justify-center text-primary z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: index * 0.15 }}
                    >
                      <FaBriefcase className="w-4 h-4" />
                    </motion.div>
                  )}

                  {/* Experience Card */}
                  <motion.div
                    className={`w-full md:w-[46%] group ${
                      isMobile ? "max-w-xl" : ""
                    }`}
                    initial={{ opacity: 0, x: isMobile ? 0 : isLeft ? -50 : 50, y: isMobile ? 30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <div className="relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl border border-base-300/80 hover:border-primary/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-1.5">
                      {/* Top Gradient Accent Bar */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent group-hover:h-2 transition-all duration-300" />

                      <div className="p-6 md:p-7 space-y-4">
                        {/* Header: Year Badge & Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 shadow-sm">
                            <FaCalendarAlt className="text-[11px]" />
                            {exp.year}
                          </span>
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-base-content/70">
                              <FaMapMarkerAlt className="text-primary text-xs" />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        {/* Role & Company Title */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm md:text-base font-semibold text-secondary">
                            <FaBuilding className="text-xs shrink-0" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Responsibilities & Achievements */}
                        <ul className="space-y-2.5 text-sm md:text-base text-base-content/85 pt-1">
                          {exp.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="w-2 h-2 rounded-full bg-primary/80 mt-2 shrink-0 group-hover:scale-125 group-hover:bg-primary transition-transform" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech & Competency Tags */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="pt-4 border-t border-base-300/60">
                            <div className="flex flex-wrap gap-1.5">
                              {exp.skills.map((skill, sIndex) => (
                                <span
                                  key={sIndex}
                                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-base-200/80 text-base-content/75 border border-base-300 hover:border-primary/40 hover:text-primary hover:bg-base-200 transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col mt-16">
        <div className="divider my-0"></div>
      </div>
    </div>
  );
};

export default Experience;
