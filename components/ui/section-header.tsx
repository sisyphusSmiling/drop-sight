interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-mono font-bold tracking-tight">{title}</h2>
    </div>
  );
} 