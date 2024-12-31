import { BsHouseUp } from "react-icons/bs";
// import { FaAnglesUp, FaUpwork } from "react-icons/fa6";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer p-10 bg-base-200">
      <aside className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          {/* Eagle Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="36"
            height="36"
            className="fill-current"
          >
            <path d="M12 2C8.7 2 6 4.7 6 8c0 3.1 2.4 5.7 5.5 5.9-.7.6-1.2 1.3-1.5 2.1-.3.7-.2 1.5.3 2.1l2 2.6c.6.8 1.7.9 2.3.3l1.5-1.7c.7-.8.7-2 0-2.8-.4-.5-.9-.7-1.4-.8 1.2-2.7 3.8-4.4 6.7-4.3C20 6 17.5 4 14 4c-.6 0-1.1.1-1.6.2-.6-.9-1.5-1.5-2.5-1.5C9.6 2 8.5 2.5 8 3.2c-.3-.2-.6-.2-.9-.3C7.1 2.2 7 2 7 2H6zM10 15c.2-.7.4-1.3.8-2 1-.5 1.8-.8 2.8-.9-.9-.3-1.7-.7-2.5-1.3.8-.8 1.3-1.9 1.7-3.1.1-.2.3-.4.5-.6C13 6.9 15 5.4 15 5c1.6-2.5 3-5 4-7-2.5.4-4.4 1.9-6 3.6-2 2.7-3 5.6-3.5 7.8z"></path>
          </svg>

          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Copyright &copy; {new Date().getFullYear()} - All rights reserved by
            Kishan.ta
          </p>
        </div>
        <nav className="flex space-x-6 mt-4 md:mt-0">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kishan-ta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.732-.795-1.732-1.732s.766-1.732 1.732-1.732c.966 0 1.732.795 1.732 1.732s-.766 1.732-1.732 1.732zm13.5 10.268h-3v-4.918c0-2.955-3.5-2.724-3.5 0v4.918h-3v-9h3v1.658c1.396-2.586 6.5-2.777 6.5 2.476v4.866z" />
            </svg>
          </a>

          {/* Medium */}
          <a
            href="https://medium.com/@kishantashok"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1043.63 592.71"
              width="24"
              height="24"
              className="fill-current"
            >
              <g>
                <path d="M588.67 296.14c0 159.42-132.51 288.46-296.29 288.46S0 455.56 0 296.14 132.51 7.68 296.29 7.68s292.38 129.48 292.38 288.46zM960.26 296.14c0 153.52-55.81 278.4-124.69 278.4s-124.69-124.88-124.69-278.4 55.81-278.4 124.69-278.4 124.69 124.88 124.69 278.4zM1043.63 296.14c0 129.28-37.3 234.25-83.36 234.25-46.05 0-83.36-104.97-83.36-234.25S914.22 61.89 960.26 61.89c46.05 0 83.37 104.97 83.37 234.25z" />
              </g>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/k_ta_6161/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.314.974.975 1.252 2.241 1.314 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.34 2.633-1.314 3.608-.975.974-2.241 1.252-3.608 1.314-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.34-3.608-1.314-.974-.975-1.252-2.241-1.314-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.34-2.633 1.314-3.608.975-.974 2.241-1.252 3.608-1.314 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.257 0-3.667.012-4.947.072-1.355.062-2.77.38-3.841 1.452-1.071 1.071-1.39 2.486-1.452 3.841-.059 1.28-.072 1.69-.072 4.947s.012 3.667.072 4.947c.062 1.355.38 2.77 1.452 3.841 1.071 1.071 2.486 1.39 3.841 1.452 1.28.059 1.69.072 4.947.072s3.667-.012 4.947-.072c1.355-.062 2.77-.38 3.841-1.452 1.071-1.071 1.39-2.486 1.452-3.841.059-1.28.072-1.69.072-4.947s-.012-3.667-.072-4.947c-.062-1.355-.38-2.77-1.452-3.841-1.071-1.071-2.486-1.39-3.841-1.452-1.28-.059-1.69-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.294 0-4.162-1.868-4.162-4.162s1.868-4.162 4.162-4.162 4.162 1.868 4.162 4.162-1.868 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441 1.441.645 1.441 1.441-.645 1.441-1.441 1.441z" />
            </svg>
          </a>

          {/* Twitter */}
          {/* <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="24" height="24" className="fill-current">
  <path d="M22.04 18.22L33.12 3.36c.19-.25.24-.58.13-.87a.77.77 0 0 0-.72-.49h-6.33c-.25 0-.49.12-.64.31L18 13.95 10.44 2.31A.8.8 0 0 0 9.8 2H3.47c-.3 0-.58.18-.72.46a.84.84 0 0 0 .1.91l11.02 14.9-11.2 14.9c-.2.25-.25.6-.13.89s.4.49.72.49h6.33c.25 0 .49-.12.64-.31L18 22.05l7.56 11.64c.15.23.4.31.64.31h6.33c.3 0 .58-.18.72-.46a.84.84 0 0 0-.1-.91L22.04 18.22z" />
</svg>

          </a> */}
        </nav>

        {/* Add Back to Top Button Here */}
        <button
          onClick={scrollToTop}
          className="mt-4 p-2 rounded-full bg-gray-500 text-white  shadow hover:bg-blue-900 transition-all flex items-center space-x-2 animate-bounce stop-bounce-on-hover"
        >
          <BsHouseUp className="text-2xl" />
          <span>Back to top</span>
        </button>
      </aside>
    </footer>
  );
};

export default Footer;
