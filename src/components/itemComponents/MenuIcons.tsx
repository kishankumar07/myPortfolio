import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../../utils/constants";



// Menu icon on small screen's hamburger and cross icon
const MenuIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setIsMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <button ref={menuButton}
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
        aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-primary-focus min-w-11 min-h-11 inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
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
  <div id="mobile-navigation" className="absolute top-12 right-0 w-44 bg-base-100 z-50  rounded-xl">
    <div className="w-full flex justify-center  ">
      <div className="flex flex-col items-center space-y-4   w-full sm:max-w-xs md:max-w-md lg:max-w-lg ">
        {NAV_LINKS.map((link, index) => (
          <a
            key={index}
            href={`#${link.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="text-base-content text-sm sm:text-base md:text-lg font-medium transition-all duration-500 ease-in-out bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary px-2 sm:px-4 py-2 rounded-md text-center cursor-pointer"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  </div>
)}

  </div>
  );
};

export default MenuIcon;
