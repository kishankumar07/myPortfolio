import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export function useAboutScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const copy = section.querySelector('.about-intro-copy');
      const words = section.querySelectorAll('.about-reveal-word');
      const portrait = section.querySelector('.about-portrait-panel');
      if (!copy || !words.length) return;
      gsap.fromTo(words, { opacity: .3 }, {
        opacity: 1, stagger: .08, ease: 'none',
        scrollTrigger: { trigger: copy, start: 'top 82%', end: 'bottom 48%', scrub: .4, invalidateOnRefresh: true },
      });
      if (portrait) gsap.fromTo(portrait, { y: 18 }, {
        y: -12, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .6, invalidateOnRefresh: true },
      });
    });
    return () => media.revert();
  }, []);
  return ref;
}
