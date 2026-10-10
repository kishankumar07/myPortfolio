import { useEffect, useState, useRef } from "react";
import Logo from "./itemComponents/Logo";
import MenuIcon from "./itemComponents/MenuIcons";
import NavLinks from "./itemComponents/NavLinks";
import { themes } from "../utils/constants";
import { FaPalette, FaTimes, FaCheck } from "react-icons/fa";

const Navbar = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);

  // Load saved theme or set default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  // Handle selecting a specific theme
  const selectTheme = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    setCurrentTheme(themeName);
  };

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themePickerRef.current &&
        !themePickerRef.current.contains(event.target as Node)
      ) {
        setIsThemePickerOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsThemePickerOpen(false);
      }
    };

    if (isThemePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThemePickerOpen]);

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center xl:h-24 py-3 xl:py-0">
        {/* Left Section: Logo */}
        <Logo />

        {/* Right Section: Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Theme Picker Dropdown Button */}
        <div className="relative" ref={themePickerRef}>
          <button
            className={`btn btn-sm sm:btn-md btn-outline btn-primary rounded-xl px-3 sm:px-4 flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 mr-2 md:mr-0 ${
              isThemePickerOpen ? "btn-active ring-2 ring-primary/40" : ""
            }`}
            onClick={() => setIsThemePickerOpen((prev) => !prev)}
            aria-label="Change Color Theme"
            title={`Active Theme: ${currentTheme}`}
          >
            <FaPalette className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline font-semibold capitalize text-xs sm:text-sm">
              {currentTheme}
            </span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isThemePickerOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Theme Palette Popover Menu */}
          {isThemePickerOpen && (
            <div className="absolute right-0 top-full mt-3 w-[320px] sm:w-[380px] md:w-[420px] max-w-[92vw] p-4 sm:p-5 rounded-2xl bg-base-100 border border-base-300 shadow-2xl backdrop-blur-md z-50 animate__animated animate__fadeIn animate__faster">
              {/* Header */}
              <div className="flex items-start justify-between pb-3 mb-3 border-b border-base-300">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-base-content flex items-center gap-2">
                    <FaPalette className="w-4 h-4 text-primary" />
                    <span>Which theme would you like to see?</span>
                  </h3>
                  <p className="text-xs text-base-content/60 mt-0.5">
                    Click any round palette to preview & apply live
                  </p>
                </div>
                <button
                  onClick={() => setIsThemePickerOpen(false)}
                  className="btn btn-ghost btn-circle btn-xs text-base-content/70 hover:text-base-content"
                  aria-label="Close theme picker"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Palette Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {themes.map((themeName) => {
                  const isActive = currentTheme === themeName;
                  return (
                    <button
                      key={themeName}
                      onClick={() => selectTheme(themeName)}
                      className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 ring-2 ring-primary scale-105"
                          : "hover:bg-base-200 hover:scale-105"
                      }`}
                      title={`Switch to ${themeName} theme`}
                    >
                      {/* Round Color Palette */}
                      <div
                        data-theme={themeName}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md border-2 grid grid-cols-2 grid-rows-2 transition-transform duration-200 group-hover:rotate-12 ${
                          isActive ? "border-primary" : "border-base-300"
                        }`}
                      >
                        <span className="bg-primary w-full h-full block" />
                        <span className="bg-secondary w-full h-full block" />
                        <span className="bg-accent w-full h-full block" />
                        <span className="bg-neutral w-full h-full block" />

                        {isActive && (
                          <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                            <FaCheck className="w-3.5 h-3.5 text-white drop-shadow" />
                          </div>
                        )}
                      </div>

                      {/* Name below it */}
                      <span
                        className={`text-[11px] sm:text-xs tracking-tight text-center capitalize truncate w-full ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-base-content/80 group-hover:text-base-content font-medium"
                        }`}
                      >
                        {themeName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <MenuIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
