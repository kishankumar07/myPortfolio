import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaMedium, FaGithub, FaHouse } from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer bg-base-300/40 border-t border-base-300 py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Brand Crest & Copyright */}
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649682/eagle_logo__xy4e1c.png"
            alt="KTA Brand Logo"
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform cursor-pointer drop-shadow-sm"
          />
          <p className="text-sm sm:text-base font-semibold text-base-content/85">
            Copyright &copy; {new Date().getFullYear()} — All rights reserved by{" "}
            <span className="text-primary font-bold">Kishan.ta</span>
          </p>
        </div>

        {/* Realistic Social Media Badges */}
        <div className="flex items-center space-x-3">
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/kishan-ta/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content/75 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/30 shadow-sm transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedinIn className="w-4 h-4" />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/kishankumar07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content/75 hover:text-base-content hover:bg-base-200 hover:border-base-content/30 shadow-sm transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-4 h-4" />
          </motion.a>

          {/* Medium */}
          <motion.a
            href="https://medium.com/@kishantashok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium Profile"
            className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content/75 hover:text-success hover:bg-success/10 hover:border-success/30 shadow-sm transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMedium className="w-4 h-4" />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/k_ta_6161/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="w-10 h-10 rounded-xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content/75 hover:text-[#e1306c] hover:bg-[#e1306c]/10 hover:border-[#e1306c]/30 shadow-sm transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Dynamic Animated "Back to Top" Pill */}
        <motion.button
          onClick={scrollToTop}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.6,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.08,
            y: -8,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.94 }}
          className="relative group px-5 py-2.5 rounded-full bg-base-100/90 hover:bg-primary hover:text-primary-content text-base-content/85 border border-base-300 hover:border-primary shadow-md hover:shadow-xl transition-all duration-300 flex items-center space-x-2.5 text-sm font-semibold backdrop-blur-md overflow-hidden"
        >
          {/* Shimmer light sweep across pill on hover */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></span>

          {/* Animated Pulsing Home Icon */}
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <FaHouse className="w-4 h-4 text-primary group-hover:text-primary-content transition-colors duration-300" />
          </motion.div>

          <span className="tracking-wide select-none">Back to Top</span>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
