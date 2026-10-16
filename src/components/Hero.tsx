import { useEffect, useRef, useState } from 'react';
import './HeroIntro.css';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mediaReady, setMediaReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const nextFrame = requestAnimationFrame(() => setMediaReady(true));
      pendingFrame = nextFrame;
    });
    let pendingFrame = frame;
    return () => cancelAnimationFrame(pendingFrame);
  }, []);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !mediaReady) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;
    const sync = () => {
      if (motion.matches || userPaused.current || !inView || document.hidden) {
        video.pause();
      } else {
        void video.play().catch(() => setPaused(true));
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(section);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [mediaReady]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => setPaused(true));
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <section ref={sectionRef} className="cinema-hero hero-intro" aria-labelledby="hero-title">
      <div className="cinema-hero-media" aria-hidden="true">
        <video ref={videoRef} className="cinema-hero-video" muted loop playsInline
          preload="none" poster="/media/hero-poster.jpg"
          onPlay={() => setPaused(false)} onPause={() => setPaused(true)}
          onError={() => setUnavailable(true)}>
          {mediaReady && <><source src="/media/hero-film-mobile.mp4" media="(max-width: 768px)" type="video/mp4" /><source src="/media/hero-film.mp4" type="video/mp4" /></>}
        </video>
      </div>
      <div className="cinema-hero-shade" aria-hidden="true" />
      <div className="cinema-hero-content">
          <div className="hero-text restored-hero-copy space-y-5 lg:space-y-6">
            {/* Animated Heading */}
            <h1 id="hero-title" className="hero-intro-step text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary flex items-center justify-center lg:justify-start gap-2">
              <span className="">
                Hello, I'm Kishan
              </span>
            </h1>

            {/* Professional Headline */}
            <h2 className="hero-intro-step text-lg sm:text-xl md:text-2xl font-bold text-primary leading-snug">
              IT Support Specialist &amp; Web Developer
            </h2>

            {/* Supporting Description with balanced typography to eliminate orphan words */}
            <p className="hero-intro-step text-base sm:text-lg text-base-content/85 leading-relaxed [text-wrap:balance] max-w-lg mx-auto lg:mx-0">
              Keeping teams connected, systems dependable, and ideas moving from concept to the web.
            </p>

            {/* Location Line */}
            <p className="hero-intro-step text-sm font-semibold text-primary/80 flex items-center justify-center lg:justify-start gap-1.5 tracking-wide">
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
            <div className="hero-intro-step flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a
                className="btn btn-primary rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold"
                aria-label="Download My CV"
                href="https://drive.google.com/file/d/1BRfx67jYoOU7bQ8CVbRpZFOJuXcePbqB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download My CV
              </a>

              <a
                href="#experience"
                className="btn btn-outline btn-primary rounded-xl px-6 hover:bg-primary hover:text-primary-content transition-all duration-300 font-semibold cursor-pointer"
                aria-label="View My Experience"
              >
                View My Experience
              </a>
            </div>

            {/* Mobile Scroll Cue */}
            <div className="hero-intro-step flex lg:hidden justify-center pt-2 ">
              <a
                href="#skills"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-primary transition-colors cursor-pointer py-1.5 px-3.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm"
                aria-label="Scroll down to Skills section"
              >
                <span>Scroll to explore</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

      </div>
      <div className="cinema-hero-footer"><a className="hero-intro-cue" href="#about">Scroll to explore <span aria-hidden="true">↓</span></a>
        {!unavailable && <button type="button" className="cinema-hero-playback" onClick={toggleVideo} aria-label={paused ? 'Play background video' : 'Pause background video'}>{paused ? <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg> : <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg>}<span>{paused ? 'Play film' : 'Pause film'}</span></button>}
      </div>
    </section>
  );
}
