import { motion } from "framer-motion";
import { 
  FaWindows, FaTools, FaLaptop, FaEnvelope, FaPrint, FaHeadset, 
  FaMicrosoft, FaIdBadge, FaUserShield, FaSitemap, FaServer, 
  FaNetworkWired, FaGlobe, FaRoute, FaProjectDiagram, FaWifi, FaShieldAlt, 
  FaBoxes, FaHandshake, FaFileAlt, FaTicketAlt, FaCode 
} from "react-icons/fa";
import { SiOdoo, SiVirtualbox } from "react-icons/si";

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
      { name: "Odoo ERP Support", icon: SiOdoo },
      { name: "IT Asset Management", icon: FaBoxes },
      { name: "Vendor Coordination", icon: FaHandshake },
      { name: "IT Documentation", icon: FaFileAlt },
      { name: "ITSM & Ticket Management", icon: FaTicketAlt },
      { name: "Web Development & Website Management", icon: FaCode },
    ]
  }
];

const Skills = () => {


  return (
    <div id={`about`} className="about-and-skills  p-6  bg-base-200 overflow-hidden">
      {/* About Me Section */}
      <section className="about-me-section mb-12">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-primary mb-8">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Photo */}
          <motion.img
            src="https://res.cloudinary.com/da2gbgkqj/image/upload/v1786948883/2_poyxcp.png"
            alt="Your Name"
            className="w-40 h-40 md:w-44 md:h-44 lg:w-64 lg:h-64 object-cover rounded-full shadow-lg outline-red-200 outline"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {/* About Text */}
          <motion.div className="text-base-content max-w-3xl text-center md:text-left px-4 md:px-8">
            <div className="text-base md:text-lg lg:text-xl font-medium tracking-wide leading-relaxed space-y-6">
    <p>
      Hi, I’m Kishan, an IT Support Specialist and Web Developer based in Dubai, UAE, with over 2 years of experience across IT support, and web technologies. I currently support business operations through Microsoft 365 administration, Windows support, network troubleshooting, IT asset management, vendor coordination, and hands-on experience working with Odoo ERP systems for business process support and implementation assistance.
    </p>
    <p>
      My focus is on keeping users productive, systems reliable, and everyday technology running smoothly. Alongside my core IT responsibilities, I bring experience in web development and continue to strengthen my knowledge of Active Directory, Windows Server, virtualization, and cloud technologies.
    </p>
  </div>
</motion.div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-primary mt-24 mb-5">Skills</h2>

        <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-8">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary/90 mb-6 text-center md:text-left border-b border-base-300 pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 justify-center">
                {category.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={index}
                      className="skill-card h-full py-6 px-4 bg-base-200 rounded-xl flex flex-col justify-center items-center shadow-lg border border-base-300 hover:ring-2 hover:ring-primary/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3" />
                      <p className="text-xs md:text-sm lg:text-base text-center font-medium leading-tight whitespace-normal break-words">
                        {skill.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
