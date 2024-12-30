import { useState } from "react";
import { NAV_LINKS } from "../../utils/constants";
import { Link } from "react-scroll";


// Menu icon on small screen's hamburger and cross icon
const MenuIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-primary-focus focus:outline-none"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isMenuOpen && (
  <div className="absolute top-12 left-0 -ml-16 w-32 bg-base-100 z-50  rounded-xl">
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center space-y-4  p-4 w-full sm:max-w-xs md:max-w-md lg:max-w-lg">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.toLowerCase()}
            smooth={true}
            duration={500}
            className="text-base-content text-sm sm:text-base md:text-lg font-medium transition-all duration-500 ease-in-out bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary px-2 sm:px-4 py-2 rounded-md text-center cursor-pointer"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  </div>
)}

  </div>
  );
};

export default MenuIcon;
