import { type ReactNode } from "react";

interface HardwarePanelProps {
  children: ReactNode;
  className?: string;
}

export function HardwarePanel({ children, className = "" }: HardwarePanelProps) {
  return (
    <div
      className={`rounded-sm border border-zinc-700 bg-zinc-800/80 p-6 panel-inset ${className}`}
    >
      {children}
    </div>
  );
}
