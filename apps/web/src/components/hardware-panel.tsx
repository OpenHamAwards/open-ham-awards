import { type ReactNode } from "react";

interface HardwarePanelProps {
  children: ReactNode;
  className?: string;
}

export function HardwarePanel({ children, className = "" }: HardwarePanelProps) {
  return (
    <div
      className={`rounded-none border border-zinc-800 bg-zinc-800/80 p-4 panel-inset ${className}`}
    >
      {children}
    </div>
  );
}
