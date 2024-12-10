interface DividerProps {
  text?: string;
}

export function Divider({ text = "or" }: DividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-muted" />
      </div>
      {text && (
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">{text}</span>
        </div>
      )}
    </div>
  );
} 