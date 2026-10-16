import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionHeading({ children, id, className = '' }: SectionHeadingProps) {
  return <h2 id={id} className={`section-heading ${className}`}>{children}<span className="heading-dot" aria-hidden="true">.</span></h2>;
}