import { cn } from "@/lib/utils";

export const AdSlot = ({ position, className }: { position: string; className?: string }) => (
  <div
    data-ad-slot={position}
    className={cn("w-full", className)}
    aria-hidden="true"
  />
);
