import { useEffect, useState } from "react";
import Logo from "./itemComponents/Logo";
import MenuIcon from "./itemComponents/MenuIcons";
import NavLinks from "./itemComponents/NavLinks";
import { themes } from "../utils/constants";

const Navbar = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  // Load saved theme or set default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <nav className="bg-base-100 shadow-md  relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center ">
        {/* Left Section: Logo */}
        <Logo />

        {/* Right Section: Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Theme Toggle Button */}
        <button
          className="btn btn-circle btn-primary btn-outline shadow-lg mr-6 md:mr-0"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m8-8h-1M4 12H3m15.364 7.364l-.707-.707m-12.02 0l-.707.707m12.02-12.02l-.707-.707m-12.02 0l-.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <MenuIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
