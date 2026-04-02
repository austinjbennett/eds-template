import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  value: ReactNode;
  tone?: 'default' | 'positive' | 'negative';
};

export default function Card({ title, value, tone = 'default' }: CardProps) {
  const toneClassName = tone === 'default' ? '' : `is-${tone}`;

  return (
    <article className={`reusable-card ${toneClassName}`.trim()}>
      <p className="reusable-card-title">{title}</p>
      <p className="reusable-card-value">{value}</p>
    </article>
  );
}
