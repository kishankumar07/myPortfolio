import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';

/** Keep loaded scenes, but spend GPU time only when they are visible. */
export default function SceneCanvas({ children, ...props }: CanvasProps) {
  const container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [scrolling, setScrolling] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 768px), (pointer: coarse)' });
  const reducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    });
    observer.observe(element);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!mobile || !visible) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => setScrolling(false), 140);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      setScrolling(false);
      window.removeEventListener('scroll', onScroll);
    };
  }, [mobile, visible]);

  const active = visible && pageVisible && !scrolling;
  return <div ref={container} className="scene-canvas" data-rendering={active ? 'active' : 'paused'} style={{ width: '100%', height: '100%', touchAction: 'pan-y' }}>
    {loaded && <Canvas {...props}
      dpr={mobile ? 1 : [1, 1.5]}
      frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 150 } }}
      style={{ touchAction: 'pan-y' }}
    ><Suspense fallback={null}>{children}</Suspense></Canvas>}
  </div>;
}
