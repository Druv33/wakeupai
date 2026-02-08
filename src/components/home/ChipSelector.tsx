import { cn } from "@/lib/utils";

interface ChipSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const ChipSelector = ({ label, options, selected, onSelect }: ChipSelectorProps) => (
  <div>
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
      {label}
    </label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-full border transition-all font-medium",
            selected === option
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);
