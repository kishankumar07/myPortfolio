import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import {
  FaWindows, FaTools, FaLaptop, FaEnvelope, FaPrint, FaHeadset,
  FaMicrosoft, FaIdBadge, FaUserShield, FaSitemap, FaServer,
  FaNetworkWired, FaGlobe, FaRoute, FaProjectDiagram, FaWifi, FaShieldAlt,
  FaBoxes, FaHandshake, FaFileAlt, FaTicketAlt, FaCode, FaRobot,
  FaReact, FaNodeJs, FaPython, FaJs,
  FaChevronLeft, FaChevronRight, FaCompass, FaTh, FaPlay, FaPause
} from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiOdoo, SiVirtualbox, SiNextdotjs, SiMongodb, SiPostgresql,
  SiAdobephotoshop, SiAdobeillustrator, SiTypescript
} from "react-icons/si";

// Rich Curated Skills for the Interactive Orbital Showcase
interface SkillItem {
  id: string;
  name: string;
  category: "all" | "microsoft" | "networking" | "operations" | "web";
  categoryLabel: string;
  icon: IconType;
  color: string;
  glowColor: string;
  description: string;
  highlights: string[];
}

const orbitalSkills: SkillItem[] = [
  {
    id: "m365",
    name: "Microsoft 365",
    category: "microsoft",
    categoryLabel: "Microsoft & Systems",
    icon: FaMicrosoft,
    color: "#00A4EF",
    glowColor: "rgba(0, 164, 239, 0.35)",
    description: "Enterprise administration of Exchange Online, user access, SharePoint permissions, Outlook troubleshooting, and security licensing.",
    highlights: ["Entra ID", "Exchange", "SharePoint", "User Provisioning"],
  },
  {
    id: "windows",
    name: "Windows 10/11 & Server",
    category: "microsoft",
    categoryLabel: "Microsoft & Systems",
    icon: FaWindows,
    color: "#0078D6",
    glowColor: "rgba(0, 120, 214, 0.35)",
    description: "Workstation deployment, domain joining, Active Directory, Group Policy Objects (GPO), and Windows Server maintenance.",
    highlights: ["Active Directory", "GPO", "Windows Server", "OS Deployment"],
  },
  {
    id: "react",
    name: "React.js",
    category: "web",
    categoryLabel: "Web Development",
    icon: FaReact,
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.35)",
    description: "Developing modern component-driven web applications with dynamic state, modular architectures, custom hooks, and Vite.",
    highlights: ["Hooks & State", "Component Design", "Vite", "SPA Architecture"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "web",
    categoryLabel: "Web Development",
    icon: SiNextdotjs,
    color: "#000000",
    glowColor: "rgba(168, 85, 247, 0.35)",
    description: "Full-stack production applications with Server-Side Rendering (SSR), Static Generation (SSG), and optimized API routing.",
    highlights: ["SSR & SSG", "API Routes", "Performance", "Vercel Deploy"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "web",
    categoryLabel: "Web Development",
    icon: SiTypescript,
    color: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.35)",
    description: "Scalable frontend development with strict type-safety, interface contracts, generics, and seamless compiler integration.",
    highlights: ["Type Safety", "Interface Contracts", "Generics", "Clean Code"],
  },
  {
    id: "odoo",
    name: "Odoo ERP",
    category: "operations",
    categoryLabel: "IT Operations & ERP",
    icon: SiOdoo,
    color: "#714B67",
    glowColor: "rgba(113, 75, 103, 0.45)",
    description: "Practical ERP support, module workflows, user access rights, technical coordination, and business process automation.",
    highlights: ["ERP Modules", "User Access", "Process Workflows", "Business Support"],
  },
  {
    id: "network",
    name: "Networking & Infrastructure",
    category: "networking",
    categoryLabel: "Networking & Support",
    icon: FaNetworkWired,
    color: "#0EA5E9",
    glowColor: "rgba(14, 165, 233, 0.35)",
    description: "TCP/IP configuration, DNS/DHCP routing, LAN/WAN diagnostics, Wi-Fi connectivity troubleshooting, and secure VPN assistance.",
    highlights: ["TCP/IP", "DNS & DHCP", "Wi-Fi Analysis", "VPN Access"],
  },
  {
    id: "ai-tools",
    name: "AI Tools & Automation",
    category: "operations",
    categoryLabel: "IT Operations & ERP",
    icon: FaRobot,
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    description: "Leveraging Claude and ChatGPT for script automation, PowerShell generation, and accelerating daily IT issue diagnosis.",
    highlights: ["Workflow Automation", "Scripting", "Diagnostics", "AI Acceleration"],
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "web",
    categoryLabel: "Web Development",
    icon: FaJs,
    color: "#F7DF1E",
    glowColor: "rgba(247, 223, 30, 0.35)",
    description: "Modern JavaScript programming with asynchronous paradigms, Promises, DOM manipulation, and interactive web behaviors.",
    highlights: ["Async/Await", "ES6+ Standards", "DOM Manipulation", "REST APIs"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "web",
    categoryLabel: "Web Development",
    icon: FaNodeJs,
    color: "#339933",
    glowColor: "rgba(51, 153, 51, 0.35)",
    description: "Backend API engineering, Express.js microservices, middleware routing, and asynchronous server architecture.",
    highlights: ["Express.js", "RESTful APIs", "Microservices", "NPM Ecosystem"],
  },
  {
    id: "python",
    name: "Python Scripting",
    category: "web",
    categoryLabel: "Web Development",
    icon: FaPython,
    color: "#3776AB",
    glowColor: "rgba(55, 118, 171, 0.35)",
    description: "Task automation scripting, data extraction utilities, backend scripts, and system maintenance helpers.",
    highlights: ["Scripting", "Automation", "Utilities", "Data Extraction"],
  },
  {
    id: "databases",
    name: "Databases (PostgreSQL & MongoDB)",
    category: "web",
    categoryLabel: "Web Development",
    icon: SiPostgresql,
    color: "#4169E1",
    glowColor: "rgba(65, 105, 225, 0.35)",
    description: "Relational SQL database queries alongside NoSQL document stores with MongoDB, modeling data for scalable web apps.",
    highlights: ["PostgreSQL", "MongoDB", "Data Schemas", "CRUD Queries"],
  },
  {
    id: "hardware",
    name: "Hardware Troubleshooting",
    category: "networking",
    categoryLabel: "Networking & Support",
    icon: FaTools,
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.35)",
    description: "Diagnostic workstation analysis, hardware component upgrades, printer configurations, and peripheral support.",
    highlights: ["Diagnostics", "Printers", "Peripherals", "Preventive Care"],
  },
  {
    id: "itsm",
    name: "ITSM & Ticket Management",
    category: "operations",
    categoryLabel: "IT Operations & ERP",
    icon: FaTicketAlt,
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.35)",
    description: "Helpdesk ticket resolution, SLA compliance, IT asset tracking, vendor management, and technical documentation.",
    highlights: ["Helpdesk SLA", "Asset Tracking", "Vendor Relations", "IT Documentation"],
  },
  {
    id: "virtualization",
    name: "Virtualization & Remote Support",
    category: "microsoft",
    categoryLabel: "Microsoft & Systems",
    icon: SiVirtualbox,
    color: "#185ABD",
    glowColor: "rgba(24, 90, 189, 0.35)",
    description: "Virtual machine deployment with Hyper-V and VirtualBox, test environments, and secure remote support tooling.",
    highlights: ["Hyper-V", "VirtualBox", "Remote Support", "Test Labs"],
  }
];

// Complete Categorized Skills list for Full Grid View
const skillCategories = [
  {
    title: "END-USER SUPPORT",
    skills: [
      { name: "Windows 10/11", icon: FaWindows },
      { name: "Hardware Troubleshooting", icon: FaTools },
      { name: "Software Troubleshooting", icon: FaLaptop },
      { name: "Outlook Support", icon: FaEnvelope },
      { name: "Printers & Peripherals", icon: FaPrint },
      { name: "Remote User Support", icon: FaHeadset },
    ]
  },
  {
    title: "MICROSOFT & SYSTEMS",
    skills: [
      { name: "Microsoft 365", icon: FaMicrosoft },
      { name: "Microsoft Entra ID", icon: FaIdBadge },
      { name: "User & Access Management", icon: FaUserShield },
      { name: "Active Directory", icon: FaSitemap },
      { name: "Windows Server", icon: FaServer },
      { name: "Hyper-V & VirtualBox", icon: SiVirtualbox },
    ]
  },
  {
    title: "NETWORKING & INFRASTRUCTURE",
    skills: [
      { name: "TCP/IP", icon: FaNetworkWired },
      { name: "DNS", icon: FaGlobe },
      { name: "DHCP", icon: FaRoute },
      { name: "LAN/WAN", icon: FaProjectDiagram },
      { name: "Wi-Fi Troubleshooting", icon: FaWifi },
      { name: "VPN Support", icon: FaShieldAlt },
    ]
  },
  {
    title: "IT OPERATIONS & BUSINESS SYSTEMS",
    skills: [
      { name: "AI Tools & Automation (Claude / ChatGPT)", icon: FaRobot },
      { name: "Odoo ERP Support", icon: SiOdoo },
      { name: "IT Asset Management", icon: FaBoxes },
      { name: "Vendor Coordination", icon: FaHandshake },
      { name: "IT Documentation", icon: FaFileAlt },
      { name: "ITSM & Ticket Management", icon: FaTicketAlt },
    ]
  },
  {
    title: "WEB DEVELOPMENT, SCRIPTING & DESIGN",
    skills: [
      { name: "JavaScript", icon: FaJs },
      { name: "React.js", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Python", icon: FaPython },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Website Management", icon: FaCode },
      { name: "Adobe Photoshop", icon: SiAdobephotoshop },
      { name: "Adobe Illustrator", icon: SiAdobeillustrator },
    ]
  }
];

const categoryFilters = [
  { id: "all", label: "Featured Core" },
  { id: "microsoft", label: "Microsoft & Systems" },
  { id: "networking", label: "Networking & Support" },
  { id: "operations", label: "IT Operations & ERP" },
  { id: "web", label: "Web & Scripting" },
] as const;

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  // Mode: Orbital Wheel vs Complete Grid
  const [viewMode, setViewMode] = useState<"orbital" | "grid">("orbital");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Filter skills according to selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "all") return orbitalSkills;
    return orbitalSkills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Ensure active index is within bounds when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const activeSkill = filteredSkills[activeIndex] || filteredSkills[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredSkills.length);
  }, [filteredSkills.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredSkills.length) % filteredSkills.length);
  }, [filteredSkills.length]);

  // Auto-play timer (pauses when hovered or user explicitly pauses)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || viewMode !== "orbital") return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, viewMode, handleNext]);

  // Orbital dimensions based on responsive breakpoint
  const radiusX = isMobile ? 140 : isTablet ? 200 : 255;
  const radiusY = isMobile ? 95 : isTablet ? 140 : 185;
  const maxVisibleDiff = isMobile ? 2 : 3;

  return (
    <div id="about" className="about-and-skills py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 bg-base-200 overflow-hidden">
      {/* About Me Section */}
      <section className="about-me-section relative max-w-6xl mx-auto mb-20 md:mb-28" aria-labelledby="about-heading">
        {/* Subtle, Low-Visibility Datacenter Watermark Background */}
        <div
          className="absolute inset-0 -mx-4 sm:-mx-8 lg:-mx-12 -my-6 pointer-events-none select-none overflow-hidden z-0"
          aria-hidden="true"
        >
          <img
            src="/datacenter-bg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-[0.045] dark:opacity-[0.07] filter grayscale contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_82%)]"
          />
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-primary mb-10 md:mb-14"
          >
            About Me
          </h2>

          {/* Two-Column Responsive Layout */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-14">
            {/* Left Column: Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="shrink-0 flex justify-center w-full lg:w-auto"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full p-1.5 bg-base-100 shadow-xl border border-base-300 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
                <img
                  src="https://res.cloudinary.com/da2gbgkqj/image/upload/v1786948883/2_poyxcp.png"
                  alt="Kishan - IT Support Specialist and Web Developer"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Column: About Content */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-2xl text-base-content"
            >
              {/* Clean, readable paragraphs without inner highlights */}
              <div className="space-y-4 md:space-y-5 text-base md:text-lg text-base-content/80 leading-relaxed font-normal text-left">
                <p>
                  Hi, I'm Kishan, an IT Support Specialist and Web Developer based in Dubai, UAE. I work at the intersection of IT operations, business systems, and web technologies, helping businesses maintain reliable IT environments and improve their digital workflows.
                </p>

                <p>
                  My experience spans Microsoft 365 administration, Windows support, network troubleshooting, IT infrastructure, and Odoo ERP systems. Alongside IT support, I build and maintain modern web applications using React, Next.js, Node.js, and TypeScript.
                </p>

                <p>
                  I am passionate about solving technical challenges, exploring emerging technologies, and finding smarter ways to work through automation and AI. I focus on turning complex technical problems into practical, reliable solutions that make everyday business operations easier.
                </p>
              </div>

              {/* Core Technology Badges */}
             
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Animated Orbital Showcase */}
      <section id="skills" className="skills-section max-w-6xl mx-auto" aria-labelledby="skills-heading">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-primary tracking-tight"
          >
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-base-content/75 max-w-xl mx-auto">
            Interactive exploration of my multi-disciplinary capabilities across enterprise IT, networking, ERP systems, and web development.
          </p>

          {/* Mode Switcher: Orbital Concept vs Complete Grid */}
          <div className="flex justify-center pt-2">
            <div className="inline-flex p-1 rounded-2xl bg-base-100 border border-base-300 shadow-sm">
              <button
                onClick={() => setViewMode("orbital")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === "orbital"
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/70 hover:text-base-content"
                }`}
                aria-label="Orbital Wheel View"
              >
                <FaCompass className="w-3.5 h-3.5" />
                <span>Orbital Wheel</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/70 hover:text-base-content"
                }`}
                aria-label="All Skills Grid View"
              >
                <FaTh className="w-3.5 h-3.5" />
                <span>All Skills Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* ORBITAL WHEEL VIEW */}
        {viewMode === "orbital" && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto px-2">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-content shadow-md shadow-primary/20 scale-105"
                      : "bg-base-100 text-base-content/75 border border-base-300 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Orbital Stage Arena */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-4xl mx-auto rounded-3xl bg-base-100/80 backdrop-blur-md border border-base-300 p-6 sm:p-10 shadow-xl overflow-hidden min-h-[500px] sm:min-h-[540px] flex flex-col items-center justify-between"
            >
              {/* Dynamic Ambient Background Glow matching the active skill */}
              <div
                className="absolute inset-0 pointer-events-none transition-colors duration-700 ease-out z-0"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${activeSkill.glowColor}, transparent 65%)`,
                }}
              />

              {/* Orbital Arch and Orbiting Nodes Area */}
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center z-10 select-none">
                {/* SVG Track Line representing the orbital curve */}
                <svg
                  className="absolute w-full h-full overflow-visible pointer-events-none"
                  viewBox="-300 -60 600 240"
                >
                  {/* Subtle outer dashed glow path */}
                  <path
                    d={`M -${radiusX} ${radiusY} A ${radiusX} ${radiusY} 0 0 1 ${radiusX} ${radiusY}`}
                    fill="none"
                    stroke={activeSkill.color}
                    strokeWidth="2.5"
                    strokeOpacity="0.4"
                    strokeDasharray="6 6"
                    className="transition-colors duration-700"
                  />
                  {/* Inner subtle reference path */}
                  <path
                    d={`M -${radiusX * 0.8} ${radiusY * 0.9} A ${radiusX * 0.8} ${radiusY * 0.9} 0 0 1 ${radiusX * 0.8} ${radiusY * 0.9}`}
                    fill="none"
                    stroke="currentColor"
                    className="text-base-content/15"
                    strokeWidth="1"
                  />
                </svg>

                {/* Orbiting Skill Nodes */}
                {filteredSkills.map((skill, index) => {
                  const N = filteredSkills.length;
                  let diff = index - activeIndex;
                  if (diff > N / 2) diff -= N;
                  if (diff < -N / 2) diff += N;

                  const isVisible = Math.abs(diff) <= maxVisibleDiff;
                  const isActive = diff === 0;

                  // Angular distribution along the arc
                  const angleDeg = diff * (isMobile ? 32 : 25);
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const x = Math.sin(angleRad) * radiusX;
                  const y = -Math.cos(angleRad) * radiusY + radiusY;

                  const Icon = skill.icon;

                  return (
                    <motion.button
                      key={skill.id}
                      onClick={() => setActiveIndex(index)}
                      animate={{
                        x,
                        y,
                        scale: isActive ? (isMobile ? 1.2 : 1.3) : Math.max(0.65, 1 - Math.abs(diff) * 0.14),
                        opacity: !isVisible ? 0 : Math.max(0.35, 1 - Math.abs(diff) * 0.22),
                        zIndex: isActive ? 40 : 20 - Math.abs(diff),
                      }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 220, damping: 24 }
                      }
                      aria-label={`Select ${skill.name}`}
                      className={`absolute w-12 h-12 sm:w-14 sm:h-14 -ml-6 -mt-6 sm:-ml-7 sm:-mt-7 rounded-2xl flex items-center justify-center cursor-pointer transition-colors ${
                        isActive
                          ? "ring-4 ring-offset-2 ring-offset-base-100 shadow-2xl"
                          : "bg-base-100 border border-base-300 hover:border-primary/40 shadow-md hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: isActive ? `${skill.color}25` : undefined,
                        borderColor: isActive ? skill.color : undefined,
                        boxShadow: isActive ? `0 0 30px ${skill.color}60` : undefined,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform"
                        style={{ color: skill.id === "nextjs" ? "var(--fallback-bc, currentColor)" : skill.color }}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Skill Central Spotlight Information */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto pt-2"
                >
                  {/* Central Illuminated Active Skill Icon */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2.5 border shadow-xl transition-all duration-300"
                    style={{
                      backgroundColor: `${activeSkill.color}18`,
                      borderColor: `${activeSkill.color}55`,
                      boxShadow: `0 8px 25px ${activeSkill.color}35`,
                    }}
                  >
                    <activeSkill.icon
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      style={{ color: activeSkill.id === "nextjs" ? "var(--fallback-bc, currentColor)" : activeSkill.color }}
                    />
                  </div>

                  {/* Category Pill with Skill Color Accent */}
                  <span
                    className="text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 border"
                    style={{
                      color: activeSkill.color,
                      borderColor: `${activeSkill.color}40`,
                      backgroundColor: `${activeSkill.color}15`,
                    }}
                  >
                    {activeSkill.categoryLabel}
                  </span>

                  {/* Skill Name */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight mb-2">
                    {activeSkill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-base-content/80 leading-relaxed mb-4 max-w-sm">
                    {activeSkill.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                    {activeSkill.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-base-200/90 text-base-content/85 border border-base-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation & Auto-play Controls */}
                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Skill"
                      className="btn btn-circle btn-sm btn-outline border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-200 shadow-sm"
                    >
                      <FaChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    {/* Auto-play toggle button */}
                    <button
                      onClick={() => setIsAutoPlaying((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-base-content/75 bg-base-200/80 border border-base-300 hover:border-primary/40 hover:text-primary transition-all"
                      aria-label={isAutoPlaying ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
                    >
                      {isAutoPlaying ? (
                        <>
                          <FaPause className="w-2.5 h-2.5 text-primary" />
                          <span>Auto-Play ON</span>
                        </>
                      ) : (
                        <>
                          <FaPlay className="w-2.5 h-2.5 text-base-content/60" />
                          <span>Paused</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleNext}
                      aria-label="Next Skill"
                      className="btn btn-circle btn-sm btn-outline border-base-300 hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-200 shadow-sm"
                    >
                      <FaChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots Indicator */}
              <div className="flex justify-center gap-1.5 mt-5 z-10">
                {filteredSkills.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to ${s.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-base-content/20 hover:bg-base-content/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FULL CATEGORIZED GRID VIEW */}
        {viewMode === "grid" && (
          <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-6">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="skill-category">
                <h3 className="text-lg md:text-xl font-semibold text-primary mb-6 text-center md:text-left border-b border-base-300 pb-2">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-center">
                  {category.skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={index}
                        className="skill-card h-full py-6 px-4 bg-base-100 rounded-2xl flex flex-col justify-center items-center shadow-md border border-base-300 hover:border-primary/50 hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3" />
                        <p className="text-xs md:text-sm font-medium text-center leading-tight whitespace-normal break-words text-base-content/90">
                          {skill.name}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="flex w-full flex-col mt-16 md:mt-20">
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default Skills;
