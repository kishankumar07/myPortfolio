import { NAV_LINKS } from "../../utils/constants";


interface NavLinksProps {
  className?: string;
}

const NavLinks = ({ className }: NavLinksProps) => (
      <>
        {NAV_LINKS.map((link, index) => (
          <a
            key={index}
            href={`#${link.toLowerCase()}`}
            className={
              `relative text-base-content text-lg font-medium px-3 py-2 transition-all duration-500 ease-in-out bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary xl:text-2xl cursor-pointer ${className}`
            }
          >
            {link}
          </a>
        ))}
      </>
    );

export default NavLinks;    