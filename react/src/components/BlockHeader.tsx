type BlockHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function BlockHeader({ title, description, className = 'block-header' }: BlockHeaderProps) {
  return (
    <header className={className}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}

