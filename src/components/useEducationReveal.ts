import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export default function useEducationReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const books = section.querySelector('.education-books-entrance');
      const entries = section.querySelectorAll('.education-reveal-item');
      const list = section.querySelector('.education-reveal-list');
      const line = section.querySelector('.education-connection-fill');
      const timelines: gsap.core.Animation[] = [];
      let booksReady = false;
      const bookTween = books ? gsap.fromTo(books, { y: 65, rotation: -6, opacity: .35 }, {
        y: 0, rotation: 0, opacity: 1, duration: 1.35, ease: 'power2.out', paused: true, immediateRender: false,
      }) : null;
      const settleBooks = () => { if (booksReady) bookTween?.restart(); };
      const ready = () => {
        booksReady = true;
        if (books && ScrollTrigger.isInViewport(books, .15)) settleBooks();
      };
      window.addEventListener('education-books-ready', ready);
      if (books) ScrollTrigger.create({ trigger: books, start: 'top 80%', onEnter: settleBooks, onEnterBack: settleBooks });

      entries.forEach((entry, index) => {
        const parts = entry.querySelector('.education-reveal-content')?.children;
        const timeline = gsap.timeline({ paused: true });
        timeline.fromTo(entry, { x: 24, y: 35, opacity: .15 }, {
          x: 0, y: 0, opacity: 1, duration: .9, ease: 'power2.out',
        });
        if (parts) timeline.fromTo(Array.from(parts), { opacity: .25, y: 12 }, {
          opacity: 1, y: 0, stagger: .16, duration: .65, ease: 'power1.out',
        }, .25);
        timelines.push(timeline);
        ScrollTrigger.create({ trigger: entry, start: 'top 80%', onEnter: () => timeline.delay(index * .18).restart(true), onLeaveBack: () => timeline.pause(0) });
      });
      if (line && list) {
        const tween = gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top center', duration: 1.6, ease: 'power1.inOut', paused: true });
        timelines.push(tween);
        ScrollTrigger.create({ trigger: list, start: 'top 75%', onEnter: () => tween.restart(), onLeaveBack: () => tween.pause(0) });
      }
      const replay = () => {
        settleBooks();
        timelines.forEach((animation, i) => animation.delay(i * .25).restart(true));
      };
      section.addEventListener('education-replay', replay);
      return () => {
        window.removeEventListener('education-books-ready', ready);
        section.removeEventListener('education-replay', replay);
      };
    });
    return () => media.revert();
  }, []);
  return ref;
}
