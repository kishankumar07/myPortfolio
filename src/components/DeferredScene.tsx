import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

class SceneBoundary extends Component<{children: ReactNode; fallback: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/** Load GPU libraries only near the illustration; keep form and text independent. */
export default function DeferredScene({ children, kind = 'earth' }: {children: ReactNode; kind?: 'earth' | 'books'}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setSupported(Boolean(context));
      context?.getExtension('WEBGL_lose_context')?.loseContext();
      setReady(true);
      observer.disconnect();
    }, {rootMargin: '160px'});
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const fallback = <div className={`scene-fallback scene-fallback-${kind}`} role="img" aria-label={kind === 'earth' ? 'Earth globe' : 'Education illustration'}>{kind === 'books' ? 'Education & continuous learning' : null}</div>;
  return <div ref={ref} style={{width:'100%',height:'100%'}}>
    {ready && (supported ? <SceneBoundary fallback={fallback}><Suspense fallback={fallback}>{children}</Suspense></SceneBoundary> : fallback)}
  </div>;
}
