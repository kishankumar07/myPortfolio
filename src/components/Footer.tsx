import { FaLinkedinIn, FaInstagram, FaMedium, FaGithub } from 'react-icons/fa6';
import { FiArrowUp, FiArrowUpRight, FiMapPin, FiDownload } from 'react-icons/fi';
import './Footer.css';

const profiles = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/kishan-ta/', Icon: FaLinkedinIn },
  { name: 'GitHub', href: 'https://github.com/kishankumar07', Icon: FaGithub },
  { name: 'Medium', href: 'https://medium.com/@kishantashok', Icon: FaMedium },
  { name: 'Instagram', href: 'https://www.instagram.com/k_ta_6161/', Icon: FaInstagram },
];

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  return <footer className="site-footer" aria-label="Portfolio footer">
    <div className="site-footer-inner">
      <div className="site-footer-invitation">
        <div><span className="site-footer-eyebrow">A CONVERSATION IS A GOOD PLACE TO START</span><h2>Let’s keep in touch<span aria-hidden="true">.</span></h2></div>
        <a href="#contact" className="site-footer-connect">Start a conversation <span><FiArrowUpRight aria-hidden="true" /></span></a>
      </div>

      <div className="site-footer-grid">
        <div className="site-footer-profile">
          <a href="#main-content" className="site-footer-brand" aria-label="Kishan T A — back to introduction"><img src="https://res.cloudinary.com/da2gbgkqj/image/upload/v1735649682/eagle_logo__xy4e1c.png" alt="" width="90" height="64" loading="lazy" /><span>Kishan T A<small>IT Support Specialist & Web Developer</small></span></a>
          <p>A practical approach to supporting people, connecting systems, and bringing ideas to the web.</p>
          <span className="site-footer-location"><FiMapPin aria-hidden="true" /> Based in Dubai, UAE</span>
          <div className="site-footer-socials" aria-label="Social profiles">{profiles.map(({ name, href, Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} Profile`}><Icon aria-hidden="true" /></a>)}</div>
          <a className="site-footer-cv" href="https://drive.google.com/file/d/1BRfx67jYoOU7bQ8CVbRpZFOJuXcePbqB/view?usp=sharing" target="_blank" rel="noopener noreferrer"><FiDownload aria-hidden="true" /> View my CV <FiArrowUpRight aria-hidden="true" /></a>
        </div>

        <nav className="site-footer-column" aria-labelledby="footer-explore"><h3 id="footer-explore">Explore</h3><ul>{[['About me', 'about'], ['Technical skills', 'skills'], ['Experience', 'experience'], ['Education', 'education']].map(([name, id]) => <li key={id}><a href={`#${id}`}>{name}</a></li>)}</ul></nav>
        <nav className="site-footer-column" aria-labelledby="footer-expertise"><h3 id="footer-expertise">What I work with</h3><ul>{['IT support & systems', 'Microsoft 365', 'Networks & infrastructure', 'Odoo ERP', 'Web development'].map(name => <li key={name}><span>{name}</span></li>)}</ul></nav>

      </div>

      <div className="site-footer-bottom"><p>© {new Date().getFullYear()} Kishan T A. All rights reserved.</p><span className="site-footer-built"><span>Built with</span><a className="site-footer-tech" href="https://react.dev/" target="_blank" rel="noopener noreferrer"><img src="/branding/react.svg" alt="" width="23" height="21" />React</a><span className="site-footer-tech-plus" aria-hidden="true">+</span><a className="site-footer-tech" href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img src="/branding/typescript.svg" alt="" width="20" height="20" />TypeScript</a></span><button type="button" onClick={backToTop}>Back to top <span><FiArrowUp aria-hidden="true" /></span></button></div>
    </div>
  </footer>;
}
