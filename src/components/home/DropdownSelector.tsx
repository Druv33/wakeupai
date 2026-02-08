import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownSelectorProps {
  label: string;
  helperText?: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export const DropdownSelector = ({
  label,
  helperText,
  options,
  selected,
  onSelect,
}: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative space-y-1.5" ref={dropdownRef}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full flex items-center justify-between",
          "px-4 py-3 rounded-xl",
          "bg-secondary/50 hover:bg-secondary/70",
          "border border-border/30 hover:border-border/50",
          "text-sm font-medium text-foreground",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30",
          isOpen && "bg-secondary/70 border-border/50 ring-2 ring-primary/10"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 ml-2",
            "transition-transform duration-200 ease-out",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {helperText && (
        <p className="text-[11px] text-muted-foreground/60 leading-relaxed pl-1">
          {helperText}
        </p>
      )}

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 top-[calc(100%-1.5rem)]">
          <div
            ref={listRef}
            role="listbox"
            className={cn(
              "w-full max-h-[240px] overflow-y-auto overscroll-contain",
              "rounded-xl border border-border/40",
              "bg-popover shadow-lg shadow-black/10",
              "py-1.5 animate-fade-in"
            )}
          >
            {options.map((option) => {
              const isSelected = option === selected;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full flex items-center justify-between",
                    "px-4 py-2.5 text-sm text-left",
                    "transition-colors duration-100",
                    "focus:outline-none focus:bg-accent/50",
                    isSelected
                      ? "bg-primary/5 text-foreground font-medium"
                      : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
