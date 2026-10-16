import { Fragment } from 'react';

/** Ordinary inline text remains fully readable without JavaScript or motion. */
export function RevealWords({ text, className, emphasize }: { text: string; className: string; emphasize?: string }) {
  const start = emphasize ? text.indexOf(emphasize) : -1;
  const end = start < 0 ? -1 : start + (emphasize?.length ?? 0);
  let offset = 0;
  return (
    <p className={className}>
      {text.split(' ').map((word, index) => {
        const highlighted = offset >= start && offset < end;
        offset += word.length + 1;
        return (
          <Fragment key={index}>
            <span className="about-reveal-word">{highlighted ? <strong>{word}</strong> : word}</span>{' '}
          </Fragment>
        );
      })}
    </p>
  );
}
