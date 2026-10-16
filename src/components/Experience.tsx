import SectionHeading from './SectionHeading';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import './ExperienceScroll.css';
gsap.registerPlugin(ScrollTrigger);
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import {
  FaLaptopCode,
  FaCode,
  FaNetworkWired,
  FaHeadset,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import { experiences } from "../utils/constants";

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  location?: string;
  skills?: string[];
  details: string[];
}

const roleIcons = [FaLaptopCode, FaCode, FaNetworkWired, FaHeadset];

const Experience = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || shouldReduceMotion) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 800px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)', () => {
      const rows = Array.from(stage.querySelectorAll<HTMLElement>('.exp-scroll-row'));
      const path = stage.querySelector<SVGPathElement>('.exp-flight-path');
      const signal = stage.querySelector<SVGGElement>('.exp-travel-signal');
      const trail = stage.querySelector<SVGPathElement>('.exp-flight-trail');
      if (!path || !signal || !trail) return;
      const length = path.getTotalLength();
      stage.classList.add('is-enhanced');
      const tallest = Math.max(...rows.map(row => row.querySelector<HTMLElement>(':scope > .w-full')?.getBoundingClientRect().height ?? row.getBoundingClientRect().height));
      if (tallest + 70 > window.innerHeight - 110) {
        stage.classList.remove('is-enhanced');
        return;
      }
      stage.style.height = `${Math.min(window.innerHeight - 135, Math.max(tallest + 90, window.innerHeight * .72))}px`;
      const paintSignal = (progress: number) => {
        const distance = progress * length;
        const point = path.getPointAtLength(distance);
        const next = path.getPointAtLength(Math.min(length, distance + 1));
        const previous = path.getPointAtLength(Math.max(0, distance - 1));
        const angle = Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI + 90;
        signal.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
        trail.style.strokeDasharray = `${distance} ${length}`;
      };
      paintSignal(0);
      gsap.set(rows.slice(1), { autoAlpha: 0, y: 150, scale: .94, rotationX: -7 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stage, start: 'top 105px', end: () => `+=${window.innerHeight * 3.4}`,
          pin: true, scrub: .65, anticipatePin: 1, invalidateOnRefresh: true,
        },
        onUpdate: () => {
          paintSignal(timeline.progress());
          let current = 0;
          for (let i = 1; i < rows.length; i++) if (timeline.time() >= timeline.labels[`role-${i}`] - .35) current = i;
          setActiveIndex(previous => previous === current ? previous : current);
        },
      });
      timelineRef.current = timeline;
      timeline.addLabel('role-0', 0).to({}, { duration: .7 });
      rows.slice(1).forEach((row, i) => {
        timeline.to(rows[i], { autoAlpha: 0, y: -100, scale: .93, rotationX: 6, duration: .55, ease: 'power1.inOut' });
        timeline.to(row, { autoAlpha: 1, y: 0, scale: 1, rotationX: 0, duration: 1, ease: 'power2.out' }, '>');
        timeline.addLabel(`role-${i + 1}`).to({}, { duration: .8 });
      });
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh);
      return () => {
        timelineRef.current = null;
        stage.classList.remove('is-enhanced');
        stage.style.removeProperty('height');
      };
    });
    return () => media.revert();
  }, [shouldReduceMotion]);

  const scrollToExperience = (index: number) => {
    const timeline = timelineRef.current;
    const trigger = timeline?.scrollTrigger;
    if (timeline && trigger) {
      const time = timeline.labels[`role-${index}`] + .2;
      window.scrollTo({ top: trigger.start + (time / timeline.duration()) * (trigger.end - trigger.start), behavior: 'instant' });
      return;
    }
    document.getElementById(`exp-card-${index}`)?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <div id="experience" className="experience-section exp-scroll-section bg-base-200 py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 shadow-sm">
            Career Journey
          </span>
          <SectionHeading>Professional Experience</SectionHeading>
          <p className="text-base sm:text-lg text-base-content/75 max-w-xl mx-auto leading-relaxed">
            A proven track record spanning IT operations, systems administration, network infrastructure, and full-stack development.
          </p>

          {/* Quick Company Jump Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {(experiences as ExperienceItem[]).map((exp, idx) => (
              <button
                key={idx}
                onClick={() => scrollToExperience(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  idx === activeIndex
                    ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary hover:text-primary-content shadow-sm"
                    : "bg-base-100 text-base-content/80 border border-base-300 hover:border-primary/40 hover:text-primary"
                }`}
                aria-label={`Jump to ${exp.company}`}
                aria-current={idx === activeIndex ? "step" : undefined}
              >
                {idx === 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                )}
                <span>{exp.company}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="relative w-full exp-scroll-stage" ref={stageRef}>
          <div className="exp-scroll-guide"><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span><span>CAREER JOURNEY / 0{activeIndex + 1} — 04</span><a href="#education">Continue to education ↓</a></div>
          <svg className="exp-flight" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            <defs><filter id="exp-signal-glow" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="5" /></filter></defs>
            <path className="exp-flight-path" d="M 500 45 C 610 100 390 155 500 215 S 610 320 500 370 S 390 470 500 555" />
            <path className="exp-flight-trail" d="M 500 45 C 610 100 390 155 500 215 S 610 320 500 370 S 390 470 500 555" />
            <g className="exp-travel-signal"><circle r="19" className="exp-signal-halo" filter="url(#exp-signal-glow)" /><path d="M 0 -13 L 9 11 L 0 6 L -9 11 Z" className="exp-signal-arrow" /><circle r="2" cy="1" className="exp-signal-core" /></g>
          </svg>
          {/* Vertical Timeline Gradient Line (Desktop: Center) */}
          {!isMobile && (
            <div className="exp-static-line absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent/40 rounded-full opacity-50 z-0 pointer-events-none" />
          )}

          {/* Vertical Timeline Gradient Line (Mobile: Left) */}
          {isMobile && (
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent/40 rounded-full opacity-50 z-0 pointer-events-none" />
          )}

          {/* Cards List */}
          <div className="exp-scroll-cards flex flex-col gap-10 md:gap-14">
            {(experiences as ExperienceItem[]).map((exp, index) => {
              const isLeft = index % 2 === 0;
              const Icon = roleIcons[index] || FaBriefcase;
              const isCurrent = index === 0;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  id={`exp-card-${index}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`exp-scroll-row relative flex items-center w-full ${
                    isMobile
                      ? "flex-row justify-start"
                      : isLeft
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {/* Timeline Center Node (Desktop) */}
                  {!isMobile && (
                    <motion.div
                      className={`exp-static-node absolute left-1/2 transform -translate-x-1/2 w-11 h-11 rounded-2xl flex items-center justify-center z-10 transition-all duration-300 shadow-md ${
                        isCurrent
                          ? "bg-primary text-primary-content ring-4 ring-primary/25 shadow-primary/30"
                          : isHovered
                          ? "bg-secondary text-secondary-content ring-4 ring-secondary/25 scale-110"
                          : "bg-base-100 border-2 border-primary/50 text-primary"
                      }`}
                      initial={false}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 20, delay: index * 0.1 }
                      }
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                  )}

                  {/* Timeline Node (Mobile) */}
                  {isMobile && (
                    <div
                      className={`absolute left-5 transform -translate-x-1/2 w-9 h-9 rounded-xl flex items-center justify-center z-10 shadow-sm ${
                        isCurrent
                          ? "bg-primary text-primary-content ring-2 ring-primary/30"
                          : "bg-base-100 border border-primary/60 text-primary"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`exp-chapter ${isLeft ? 'exp-chapter-right' : 'exp-chapter-left'}`} aria-hidden="true"><span className="exp-chapter-number">0{index + 1}</span><span className="exp-chapter-year">{exp.year}</span><span className="exp-chapter-company">{exp.company}</span><Icon /></div>
                  {/* Experience Card */}
                  <motion.div
                    className={`w-full md:w-[46%] ${
                      isMobile ? "pl-12" : ""
                    }`}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 140,
                            damping: 18,
                            delay: index * 0.1,
                          }
                    }
                  >
                    <div
                      className={`relative bg-base-100 rounded-2xl shadow-md hover:shadow-2xl border transition-all duration-300 overflow-hidden group hover:-translate-y-1.5 ${
                        isCurrent
                          ? "border-primary/50 shadow-primary/5 ring-1 ring-primary/20"
                          : "border-base-300 hover:border-primary/50"
                      }`}
                    >
                      {/* Top Animated Accent Bar */}
                      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent group-hover:h-2 transition-all duration-300" />

                      <div className="p-6 sm:p-7 space-y-4">
                        {/* Header: Year Badge + Live Active Indicator + Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 shadow-sm">
                              <FaCalendarAlt className="text-[11px]" />
                              {exp.year}
                            </span>

                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Active Role
                              </span>
                            )}
                          </div>

                          {exp.location && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-base-content/70">
                              <FaMapMarkerAlt className="text-primary text-xs" />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        {/* Role & Company Header */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm sm:text-base font-semibold text-secondary">
                            <FaBuilding className="text-xs shrink-0" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Responsibilities Details */}
                        <ul className="space-y-2.5 text-sm sm:text-base text-base-content/85 pt-1">
                          {exp.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>


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
      <div className="flex w-full flex-col mt-16 md:mt-20">
        <div className="divider my-0"></div>
      </div>
    </div>
  );
};

export default Experience;

