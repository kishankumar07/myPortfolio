import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { experiences, projects, skills } from "./utils/constants";

const chapters = [
  ["surface", "Surface", "00"],
  ["skills", "Skills", "01"],
  ["experience", "Experience", "02"],
  ["projects", "Projects", "03"],
  ["education", "Education", "04"],
  ["contact", "Contact", "05"],
];
const cv =
  "https://drive.google.com/file/d/10jXLjYNFC2b4K-vd9pFRr-JCP0W3g7Rx/view?usp=sharing";
const social = [
  ["LinkedIn", "https://www.linkedin.com/in/kishan-ta/"],
  ["GitHub", "https://github.com/kishankumar07"],
  ["Medium", "https://medium.com/@kishantashok"],
  ["Instagram", "https://www.instagram.com/k_ta_6161/"],
];

function Orb({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`network-orb ${small ? "small-orb" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" fill="none">
        <defs>
          <radialGradient id={small ? "orb-small" : "orb-glow"}>
            <stop stopColor="#95faff" stopOpacity=".16" />
            <stop offset="1" stopColor="#82e9ef" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="250"
          cy="250"
          r="245"
          fill={`url(#${small ? "orb-small" : "orb-glow"})`}
        />
        <g stroke="currentColor" strokeWidth=".8">
          <circle cx="250" cy="250" r="180" />
          {[35, 75, 120, 155].map((r) => (
            <ellipse key={r} cx="250" cy="250" rx={r} ry="180" />
          ))}
          {[130, 175, 220, 265, 310, 355].map((y) => (
            <ellipse
              key={y}
              cx="250"
              cy={y}
              rx={Math.sqrt(180 ** 2 - (y - 250) ** 2)}
              ry="22"
            />
          ))}
          <ellipse
            cx="250"
            cy="250"
            rx="233"
            ry="70"
            transform="rotate(-30 250 250)"
            strokeDasharray="3 7"
          />
          <path
            d="M112 134 349 123 409 333 218 421 93 299 112 134 409 333M93 299 349 123 218 421Z"
            opacity=".65"
          />
        </g>
        {[
          [112, 134],
          [349, 123],
          [409, 333],
          [218, 421],
          [93, 299],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="9" fill="#b6fbf1" opacity=".13" />
            <circle cx={x} cy={y} r="3" fill="#c7fff7" />
          </g>
        ))}
      </svg>
      <span className="orb-label">CONNECTED SYSTEMS · HUMAN SOLUTIONS</span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(
      ["from_name", "reply_to", "message"].map((key) => [
        key,
        String(data.get(key) ?? "").trim(),
      ]),
    );
    if (Object.values(values).some((value) => !value)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        values,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-pair">
        <label>
          Your name
          <input
            name="from_name"
            autoComplete="name"
            placeholder="Full name"
            required
            maxLength={120}
          />
        </label>
        <label>
          Email address
          <input
            name="reply_to"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Your message
        <textarea
          name="message"
          placeholder="Tell me what you have in mind…"
          required
          rows={4}
          maxLength={5000}
        />
      </label>
      <button
        className="text-action"
        disabled={status === "sending"}
        type="submit"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <span className="circle-arrow">↗</span>
      </button>
      <p className={`form-status ${status}`} role="status">
        {status === "success"
          ? "Thank you. Your message has been sent!"
          : status === "error"
            ? "Your message could not be sent. Check the fields and try again, or connect on LinkedIn."
            : ""}
      </p>
    </form>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.4;
        let index = 0;
        chapters.forEach(([id], i) => {
          if (
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) <= marker
          )
            index = i;
        });
        setActive(index);
        setProgress(
          window.scrollY /
            Math.max(
              1,
              document.documentElement.scrollHeight - window.innerHeight,
            ),
        );
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className={`ocean-site ${paused ? "motion-paused" : ""}`}>
      <a className="skip-link" href="#skills">
        Skip introduction
      </a>
      <div className="ocean-particles" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            style={
              {
                "--x": `${(i * 43 + 7) % 100}%`,
                "--y": `${(i * 31 + 13) % 100}%`,
                "--delay": `${-i * 1.7}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <header className="site-header">
        <a
          className="wordmark"
          href="#surface"
          aria-label="Kishan T A, back to surface"
        >
          <span className="wave-mark">≋</span>
          <span>
            KISHAN T A<small>BELOW THE SURFACE</small>
          </span>
        </a>
        <nav
          id="main-navigation"
          className={menu ? "top-nav open" : "top-nav"}
          aria-label="Main navigation"
        >
          {[
            ["experience", "Experience"],
            ["projects", "Selected work"],
            ["contact", "Let’s talk ↗"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <span className="header-location">
          <i /> DUBAI, UAE
        </span>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="main-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close −" : "Menu +"}
        </button>
      </header>
      <nav className="depth-nav" aria-label="Explore portfolio chapters">
        <span className="depth-number">
          {chapters[active][2]}
          <small> / 05</small>
        </span>
        <span className="depth-title">{chapters[active][1]}</span>
        <div className="depth-track">
          <span style={{ height: `${progress * 100}%` }} />
          {chapters.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={active === i ? "location" : undefined}
              className={active === i ? "active" : ""}
            >
              <b>{label}</b>
            </a>
          ))}
        </div>
        <a className="return-up" href="#surface" aria-label="Return to surface">
          ↑
        </a>
      </nav>
      <main>
        <section id="surface" className="surface-section">
          <div className="surface-image" />
          <div className="sun-rays" aria-hidden="true" />
          <div className="surface-content">
            <p className="eyebrow lime">
              IT SPECIALIST. WEB DEVELOPER. PROBLEM SOLVER.
            </p>
            <h1>
              There’s more
              <br />
              beneath the <em>surface.</em>
            </h1>
            <div className="hero-intro">
              <span className="intro-line" />
              <p>
                I’m Kishan. I connect people, systems,
                <br className="desktop-break" /> and ideas through technology.
              </p>
            </div>
            <a className="text-action" href="#skills">
              Explore my world<span className="circle-arrow">↓</span>
            </a>
          </div>
          <Orb />
          <div className="surface-footer">
            <span>00 — AT THE SURFACE</span>
            <span>IT SUPPORT & FULL STACK DEVELOPMENT</span>
            <a href="#skills">SCROLL TO DISCOVER ↓</a>
          </div>
        </section>
        <section id="skills" className="chapter skills-section">
          <div className="chapter-top">
            <span>01 / 05</span>
            <span>THE TOOLKIT</span>
            <span>SKILLS & CAPABILITIES</span>
          </div>
          <div className="section-heading">
            <p className="eyebrow">A LITTLE DEEPER</p>
            <h2>
              Good technology.
              <br />
              <em>Better everyday.</em>
            </h2>
            <p>
              Supporting users, systems, and business operations through
              reliable IT solutions, proactive troubleshooting, and secure
              technology management.
            </p>
          </div>
          <div className="capabilities">
            <article>
              <span className="capability-icon">⌘</span>
              <h3>Keeping things running.</h3>
              <p>
                Windows & network support, Microsoft 365, Outlook, user
                administration, and day-to-day IT operations.
              </p>
              <div className="tags">
                {[
                  "Microsoft 365",
                  "Windows",
                  "Network support",
                  "Odoo ERP",
                ].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
            <article>
              <span className="capability-icon">&lt;/&gt;</span>
              <h3>Building what comes next.</h3>
              <p>
                Full-stack applications, considered interfaces, and reliable
                backend services. From the first request to deployment.
              </p>
              <div className="tags">
                {["React.js", "TypeScript", "Node.js", "MongoDB"].map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          </div>
          <details className="all-skills">
            <summary>
              Explore the full development toolkit <span>+</span>
            </summary>
            <div className="tags">
              {skills.map((skill) => (
                <span key={skill.name}>{skill.name}</span>
              ))}
            </div>
          </details>
          <a className="chapter-next" href="#experience">
            CONTINUE TO EXPERIENCE <span>↓</span>
          </a>
        </section>
        <section id="experience" className="chapter experience-section">
          <div className="chapter-top">
            <span>02 / 05</span>
            <span>THE JOURNEY</span>
            <span>EXPERIENCE</span>
          </div>
          <div className="section-heading">
            <p className="eyebrow">BENEATH EVERY SOLUTION, EXPERIENCE</p>
            <h2>
              A career built
              <br />
              on <em>connections.</em>
            </h2>
            <p>
              From telecom infrastructure to full-stack development and everyday
              IT. Different challenges, the same curiosity.
            </p>
          </div>
          <div className="experience-list">
            {experiences.map((exp, i) => (
              <details
                key={exp.company}
                className="experience-item"
                open={i === 0}
              >
                <summary>
                  <span className="experience-date">
                    {exp.year}
                    <small>{exp.location}</small>
                  </span>
                  <span className="experience-title">
                    <strong>{exp.role}</strong>
                    <span>{exp.company}</span>
                  </span>
                  <span className="expand-icon">+</span>
                </summary>
                <ul>
                  {exp.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <a
            className="text-action cv-link"
            href={cv}
            target="_blank"
            rel="noreferrer"
          >
            View my CV <span className="circle-arrow">↗</span>
          </a>
          <a className="chapter-next" href="#projects">
            CONTINUE TO SELECTED WORK <span>↓</span>
          </a>
        </section>
        <section id="projects" className="chapter projects-section">
          <div className="chapter-top">
            <span>03 / 05</span>
            <span>THE EXPLORATIONS</span>
            <span>SELECTED WORK</span>
          </div>
          <div className="section-heading">
            <p className="eyebrow">IDEAS, BROUGHT TO LIFE</p>
            <h2>
              Proof in the <em>making.</em>
            </h2>
            <p>
              A collection of applications exploring commerce, authentication,
              and the systems that work behind the scenes.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <article
                key={project.title}
                className={`project-card ${i === 0 ? "featured-project" : ""}`}
              >
                <a
                  className="project-image"
                  href={project.Documentation}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Explore ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} application preview`}
                    loading="lazy"
                  />
                  <span className="project-open">↗</span>
                </a>
                <div className="project-info">
                  <span className="eyebrow">EXPLORATION 0{i + 1}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a
                      href={project.Documentation}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read the project ↗
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a className="chapter-next" href="#education">
            CONTINUE TO THE FOUNDATION <span>↓</span>
          </a>
        </section>
        <section id="education" className="chapter education-section">
          <div className="chapter-top">
            <span>04 / 05</span>
            <span>THE FOUNDATION</span>
            <span>EDUCATION</span>
          </div>
          <div className="education-layout">
            <div className="section-heading">
              <p className="eyebrow">ROOTED IN CURIOSITY</p>
              <h2>
                Always
                <br />
                <em>going deeper.</em>
              </h2>
              <p>
                The technical foundation behind my career in IT and technology.
              </p>
              <Orb small />
            </div>
            <div className="education-list">
              <article>
                <p className="eyebrow">2016 — 2020</p>
                <h3>Bachelor of Technology</h3>
                <p className="education-subject">
                  Electronics and Communication Engineering
                </p>
                <p>Dr. APJ Abdul Kalam Technological University</p>
                <p className="muted">Thiruvananthapuram, Kerala, India</p>
                <span className="score">CGPA 7.15 / 10</span>
              </article>
              <article>
                <p className="eyebrow">THE EARLY CHAPTERS</p>
                <h3>St. Jude Public School</h3>
                <p>Higher Secondary & Secondary Education</p>
                <p className="muted">Thrissur, Kerala, India</p>
                <div className="school-scores">
                  <span>
                    12th · 2014–15<strong>CGPA 9.26</strong>
                  </span>
                  <span>
                    10th · 2012–13<strong>CGPA 10.0</strong>
                  </span>
                </div>
              </article>
            </div>
          </div>
          <a className="chapter-next" href="#contact">
            ONE MORE CONNECTION <span>↓</span>
          </a>
        </section>
        <section id="contact" className="chapter contact-section">
          <div className="chapter-top">
            <span>05 / 05</span>
            <span>THE NEXT CHAPTER</span>
            <span>LET’S CONNECT</span>
          </div>
          <div className="contact-layout">
            <div className="section-heading">
              <p className="eyebrow lime">
                GOOD THINGS START WITH A CONVERSATION
              </p>
              <h2>
                Let’s make
                <br />
                <em>a connection.</em>
              </h2>
              <p>
                Have an opportunity, a project, or an interesting challenge? I’d
                love to hear from you.
              </p>
              <span className="location-note">
                <i /> Based in Dubai, UAE
              </span>
              <div className="social-links">
                {social.map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="journey-end">
            <span>EVERY DEEP DIVE STARTS AT THE SURFACE.</span>
            <a className="text-action" href="#surface">
              Back to the surface <span className="circle-arrow">↑</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#surface">KISHAN T A</a>
        <span>© {new Date().getFullYear()} Kishan.ta</span>
        <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Resume motion" : "Pause motion"} {paused ? "▷" : "Ⅱ"}
        </button>
      </footer>
    </div>
  );
}
