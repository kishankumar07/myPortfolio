import SectionHeading from './SectionHeading';
import useEducationReveal from './useEducationReveal';
import './EducationReveal.css';
import DeferredScene from './DeferredScene';

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';




import { FaGraduationCap, FaUniversity, FaSchool, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';

const EducationScene = lazy(() => import('./EducationScene'));

const Education = () => {
  const educationRevealRef = useEducationReveal();

  return (
    <div ref={educationRevealRef} id="education" className="education-section bg-base-200 py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Education Heading */}
        <div className="text-center mb-12 space-y-3">
          <SectionHeading>Education</SectionHeading>
          <p className="text-base sm:text-lg text-base-content/75 max-w-xl mx-auto">
            Building the technical foundation behind my career in IT and technology.
          </p><button type="button" className="education-replay" aria-label="Replay education animation" onClick={() => educationRevealRef.current?.dispatchEvent(new Event('education-replay'))}>Replay animation <span aria-hidden="true">↻</span></button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* 3D Model Showcase */}
          <div className="education-books-entrance w-full min-w-0 lg:w-1/2 flex items-center justify-center">
            <div className="relative isolate overflow-hidden w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] max-w-lg cursor-grab active:cursor-grabbing">
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-sm font-medium text-base-content/70">Loading 3D Books...</p>
                  </div>
                }
              >
<DeferredScene kind="books"><EducationScene /></DeferredScene>
              </Suspense>
            </div>
          </div>

          {/* Education Content Cards */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="education-reveal-list w-full lg:w-1/2"
          >
            
            {/* Degree Card: Bachelor of Technology */}
            <div className="education-reveal-item"><motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-base-100/90 backdrop-blur-md rounded-2xl border border-base-300/80 hover:border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Top Gradient Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>

              <div className="education-reveal-content p-6 sm:p-7 space-y-5">
                {/* Header Row */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <FaGraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                        Bachelor of Technology (B.Tech)
                      </h3>
                      <span className="text-xs font-mono font-semibold text-primary/90 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[11px]" />
                        2016 – 2020
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-secondary">
                      Electronics and Communication Engineering
                    </p>
                  </div>
                </div>

                {/* University & Location Info */}
                <div className="space-y-2 text-sm text-base-content/85 pl-1 border-l-2 border-primary/20 ml-2">
                  <div className="flex items-center gap-2 pl-3 font-medium">
                    <FaUniversity className="text-primary text-xs shrink-0" />
                    <span>Dr. APJ Abdul Kalam Technological University</span>
                  </div>
                  <div className="flex items-center gap-2 pl-3 text-xs text-base-content/70">
                    <FaMapMarkerAlt className="text-primary text-xs shrink-0" />
                    <span>Thiruvananthapuram, Kerala, India</span>
                  </div>
                </div>

                {/* Structured Stat Metric Panel */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-base-200/70 border border-base-300/60 flex flex-col justify-center">
                    <span className="text-[11px] font-medium text-base-content/60 uppercase tracking-wider">
                      Academic Score
                    </span>
                    <span className="text-base font-bold text-primary flex items-center gap-1.5 mt-0.5">
                      <FaAward className="text-xs text-primary" />
                      CGPA: 7.15 / 10
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-base-200/70 border border-base-300/60 flex flex-col justify-center">
                    <span className="text-[11px] font-medium text-base-content/60 uppercase tracking-wider">
                      Specialization
                    </span>
                    <span className="text-sm font-bold text-base-content/90 truncate mt-0.5">
                      ECE Engineering
                    </span>
                  </div>
                </div>
              </div>
            </motion.div><div className="education-connection" aria-hidden="true"><span className="education-connection-fill" /></div></div>

            {/* Schooling Card: St. Jude Public School */}
            <div className="education-reveal-item"><motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-base-100/90 backdrop-blur-md rounded-2xl border border-base-300/80 hover:border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Top Gradient Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-secondary via-accent to-primary"></div>

              <div className="education-reveal-content p-6 sm:p-7 space-y-5">
                {/* Header Row */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent border border-secondary/25 text-secondary flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <FaSchool className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                      Higher Secondary & Secondary Education
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-secondary">
                      St. Jude Public School
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 pl-4 border-l-2 border-secondary/20 ml-2 text-xs text-base-content/70">
                  <FaMapMarkerAlt className="text-secondary text-xs shrink-0" />
                  <span>Thrissur, Kerala, India</span>
                </div>

                {/* Structured Dual Stat Cards for 12th and 10th */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* 12th Grade */}
                  <div className="p-3.5 rounded-xl bg-base-200/70 border border-base-300/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-base-content/60 font-medium">
                      <span>12th Grade (Higher Secondary)</span>
                      <span className="font-mono text-[11px]">2014–15</span>
                    </div>
                    <div className="text-base font-bold text-primary flex items-center gap-1.5">
                      <FaAward className="text-xs text-primary" />
                      CGPA: 9.26
                    </div>
                  </div>

                  {/* 10th Grade */}
                  <div className="p-3.5 rounded-xl bg-base-200/70 border border-base-300/60 space-y-1">
                    <div className="flex items-center justify-between text-xs text-base-content/60 font-medium">
                      <span>10th Grade (Secondary)</span>
                      <span className="font-mono text-[11px]">2012–13</span>
                    </div>
                    <div className="text-base font-bold text-primary flex items-center gap-1.5">
                      <FaAward className="text-xs text-primary" />
                      CGPA: 10.0
                    </div>
                  </div>
                </div>
              </div>
            </motion.div></div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex w-full flex-col mt-16">
        <div className="divider my-0"></div>
      </div>
    </div>
  );
};

export default Education;
