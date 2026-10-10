import { useEffect } from 'react';

/** Match the background to the actual palette brightness, including custom themes. */
export default function TechBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const lightness = getComputedStyle(root).getPropertyValue('--b1').trim().split(/\s+/)[0];
      const value = parseFloat(lightness);
      const normalized = lightness.endsWith('%') ? value / 100 : value;
      root.dataset.backgroundTone = Number.isFinite(normalized) && normalized < 0.6 ? 'dark' : 'light';
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
  }, []);
  return <div className="portfolio-tech-backdrop" aria-hidden="true" />;
}
