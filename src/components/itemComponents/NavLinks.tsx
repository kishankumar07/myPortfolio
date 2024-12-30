import { NAV_LINKS } from "../../utils/constants";
import { Link } from "react-scroll";

interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => (
      <>
        {NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            to={link.toLowerCase()}
            smooth={true}
            duration={500}
            className={
              `relative text-base-content text-lg font-medium px-3 py-2 transition-all duration-500 ease-in-out bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary lg:text-2xl cursor-pointer ${className}`
            }
          >
            {link}
          </Link>
        ))}
      </>
    );

export default NavLinks;    