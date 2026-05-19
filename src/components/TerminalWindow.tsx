import type { ReactNode } from "react";

export function TerminalWindow({
  title = "devmind",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[6px] glass-strong sheen group transition-transform duration-300 hover:-translate-y-[1px] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.04] transition-colors group-hover:bg-white/[0.10]" />
        <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.04] transition-colors group-hover:bg-white/[0.10]" />
        <span className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/[0.04] transition-colors group-hover:bg-white/[0.10]" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#666] transition-colors group-hover:text-[#a1a1a1]">
          {title}
        </span>
      </div>
      <div className="relative px-5 py-5">
        <div className="pointer-events-none absolute inset-0 scanline opacity-30" aria-hidden />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
