import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const SUPPORT_EMAIL = "dev.devmind@gmail.com";

export function Logo({ size = 26, downloadable = false }: { size?: number; downloadable?: boolean }) {
  // Rounded liquid-glass orb housing the real DevMind mark (logo.png)
  const inner = (
    <span
      aria-label="DevMind"
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[8px] sheen sheen-slow"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(130% 130% at 28% 18%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.10) 24%, rgba(18,18,20,0.96) 58%, #000 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.40), inset 0 -6px 12px rgba(0,0,0,0.55), 0 6px 18px -8px rgba(255,255,255,0.22), 0 0 0 0.5px rgba(0,0,0,0.6)",
      }}
    >
      <img
        src="/logo.png"
        alt="DevMind logo"
        width={size}
        height={size}
        draggable
        className="relative z-[1] h-full w-full select-none object-cover"
        style={{ borderRadius: 8 }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-[6%] h-[55%] w-[55%] rounded-full opacity-60 blur-[3px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.75), transparent 70%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-[2px] rounded-full opacity-50"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
      />
    </span>
  );

  if (downloadable) {
    return (
      <a
        href="/logo.png"
        download="devmind-logo.png"
        aria-label="Download DevMind logo"
        title="Download DevMind logo"
        className="focus-ring rounded-[8px]"
        onClick={(e) => e.stopPropagation()}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-[#1a1a1a] bg-black/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="group flex items-center gap-2 press">
          <Logo size={22} />
          <span className="text-[15px] font-semibold tracking-tight transition-colors group-hover:text-white">DevMind</span>
        </Link>
        <div className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            to="/docs"
            className="hidden rounded-[4px] px-3 py-1.5 text-[13px] text-[#a1a1a1] transition-colors hover:bg-white/[0.04] hover:text-white focus-ring sm:inline-block"
          >
            Docs
          </Link>
          <Link
            to="/about"
            className="hidden rounded-[4px] px-3 py-1.5 text-[13px] text-[#a1a1a1] transition-colors hover:bg-white/[0.04] hover:text-white focus-ring sm:inline-block"
          >
            About
          </Link>
          <Link
            to="/"
            hash="pricing"
            className="hidden rounded-[4px] px-3 py-1.5 text-[13px] text-[#a1a1a1] transition-colors hover:bg-white/[0.04] hover:text-white focus-ring sm:inline-block"
          >
            Pricing
          </Link>
          <Link
            to="/"
            hash="install"
            className="ml-2 inline-flex items-center rounded-[4px] bg-white px-3.5 py-1.5 text-[13px] font-medium text-black transition-all hover:bg-[#e5e5e5] hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.45)] lift press focus-ring"
          >
            Install DevMind
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <div>
              <div className="text-[14px] font-semibold tracking-tight">DevMind</div>
              <div className="text-[12px] text-[#666]">
                Ruthless focus for developers.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#a1a1a1] md:justify-center">
            <Link to="/docs" className="hover:text-white">Docs</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/" hash="pricing" className="hover:text-white">Pricing</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">{SUPPORT_EMAIL}</a>
          </div>
          <div className="text-[13px] text-[#666] md:text-right">
            Built by Aarav Kapasi.
          </div>
        </div>
        <div className="mt-10 border-t border-[#111] pt-6 text-center text-[11px] uppercase tracking-[0.18em] text-[#444]">
          © 2025 DevMind — All systems operational
        </div>
      </div>
    </footer>
  );
}
