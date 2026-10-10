import FloatingHeroScene from './FloatingHeroScene';
import 'animate.css';
import { Link } from 'react-scroll';

export default function Hero() {
  return <section className="floating-hero bg-base-200" aria-label="Introduction and interactive floating 3D scene">
    <div className="floating-hero-scene"><FloatingHeroScene /></div>
    <div className="floating-hero-vignette" aria-hidden="true" />
    <div className="floating-hero-content">          {/* Left: Hero Text */}
          <div className="hero-text floating-hero-copy space-y-5 lg:space-y-6">
            {/* Animated Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary flex items-center justify-center lg:justify-start gap-2">
              <span role="img" aria-label="hello hand" className="wave text-4xl sm:text-5xl">
                👋
              </span>
              <span className="animate__animated animate__rubberBand">
                Hello, I'm Kishan
              </span>
            </h1>

            {/* Professional Headline */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary animate__animated animate__fadeInUp leading-snug">
              IT Support Specialist | Microsoft 365 | Windows & Network Support
            </h2>

            {/* Supporting Description with balanced typography to eliminate orphan words */}
            <p className="text-base sm:text-lg text-base-content/85 animate__animated animate__fadeInUp leading-relaxed [text-wrap:balance] max-w-lg mx-auto lg:mx-0">
              Supporting users, systems, and business operations through reliable IT solutions, proactive troubleshooting, and secure technology management.
            </p>

            {/* Location Line */}
            <p className="text-sm font-semibold text-primary/80 flex items-center justify-center lg:justify-start gap-1.5 animate__animated animate__fadeInUp tracking-wide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary shrink-0 opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Based in Dubai, UAE</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a
                className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold"
                aria-label="Download My CV"
                href="https://drive.google.com/file/d/1BRfx67jYoOU7bQ8CVbRpZFOJuXcePbqB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download My CV
              </a>

              <Link
                to="experience"
                smooth={true}
                duration={500}
                className="btn btn-outline btn-primary rounded-xl px-6 hover:bg-primary hover:text-primary-content transition-all duration-300 font-semibold"
                aria-label="View My Experience"
              >
                View My Experience
              </Link>
            </div>
          </div>

</div>
  </section>;
}
