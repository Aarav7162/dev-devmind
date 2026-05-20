import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Lock, MonitorOff, ShieldOff, ArrowRight } from "lucide-react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalTyper } from "@/components/TerminalTyper";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL } from "@/components/SiteChrome";

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const heroFrames = [
  `$ devmind start
[daemon] focus mode armed
[daemon] watching window titles ...`,
  `[detect] chrome :: youtube.com
[intercept] taking over screen in 0ms
┌─ DEVMIND ── FOCUS BREACH ───────────────┐
│  process : chrome.exe                   │
│  blocked : youtube.com                  │
│  breathe in ... hold ... breathe out    │
│  ●●●●●●○○○○                             │
│  unlock in 00:04                        │
└─────────────────────────────────────────┘`,
  `$ devmind status
daemon         : running   (pid 8421)
interceptions  : 2 / 2   (today · free)
license        : free`,
];

/* ---------- HERO ---------- */

function Hero() {
  const haloRef = useRef<HTMLDivElement | null>(null);
  const lastBump = useRef(0);
  const onTick = useCallback(() => {
    const now = performance.now();
    if (now - lastBump.current < 60) return;
    lastBump.current = now;
    const el = haloRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "scale(1.03)";
    window.setTimeout(() => {
      if (!haloRef.current) return;
      haloRef.current.style.opacity = "";
      haloRef.current.style.transform = "";
    }, 140);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[#111] pb-24 pt-40">
      <div className="aurora" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-[0.25]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mx-auto max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-[4px] glass shimmer px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#a1a1a1]">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            v1.0 — windows daemon
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-[84px]">
            Ruthless Focus
            <br />
            <span className="text-[#666]">for Developers.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-[17px] leading-[1.55] text-[#a1a1a1] sm:text-[18px]">
            A local daemon that detects when you get distracted, locks your screen, and forces
            you to stare at a black terminal until the urge passes.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#install"
              className="group inline-flex items-center gap-2 rounded-[4px] bg-white px-4 py-2.5 text-[13.5px] font-medium text-black transition-all hover:bg-[#f2f2f2] hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.55)] lift press focus-ring"
            >
              Install DevMind
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-[4px] glass glass-hover sheen sheen-slow px-4 py-2.5 text-[13.5px] font-medium text-white lift press focus-ring"
            >
              Read the Docs
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <div
            ref={haloRef}
            aria-hidden
            className="halo-pulse pointer-events-none absolute -inset-6 -z-10 rounded-[24px] opacity-80 blur-2xl transition-[opacity,transform] duration-150"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(120,170,255,0.18), transparent 70%), radial-gradient(40% 40% at 80% 20%, rgba(200,150,255,0.14), transparent 70%)",
            }}
          />
          <TerminalWindow title="devmind — focus daemon">
            <TerminalTyper onTick={onTick} frames={heroFrames} className="min-h-[220px] text-[#e5e5e5]" />
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */

function HowItWorks() {
  const steps: Array<{
    n: string;
    title: string;
    desc: string;
    Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }> = [
    {
      n: "01",
      title: "Instant Interception",
      desc: "Runs silently using zero CPU. The millisecond you open YouTube, Reddit, or Twitter, DevMind detects the window title and takes over your entire screen.",
      Icon: MonitorOff,
    },
    {
      n: "02",
      title: "The Blackout Screen",
      desc: "Your screen is locked in a pure black window. You cannot click away. You are forced to follow a 10-second deep breathing exercise before you are allowed to choose what to do next.",
      Icon: Lock,
    },
    {
      n: "03",
      title: "100% Local & Un-bypassable",
      desc: "No browser extensions you can disable in two clicks. This is a system-level Windows daemon that cannot be bypassed without actively killing the process.",
      Icon: ShieldOff,
    },
  ];
  return (
    <section id="how" className="border-b border-[#111] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-16 max-w-2xl">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#666]">
            // mechanism
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Three primitives. <span className="text-[#666]">Zero willpower required.</span>
          </h2>
        </motion.div>
        <div className="grid border-y border-[#111] md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`group relative p-8 transition-colors hover:bg-white/[0.02] md:p-10 ${
                i < steps.length - 1 ? "md:border-r md:border-[#111]" : ""
              } ${i > 0 ? "border-t border-[#111] md:border-t-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <s.Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                <span className="font-mono text-[11px] text-[#444]">{s.n}</span>
              </div>
              <h3 className="mt-8 text-[17px] font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-[#a1a1a1]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BLOCKLIST SECTION (improvised) ---------- */

function Blocklist() {
  const items = [
    "youtube.com", "reddit.com", "twitter.com", "x.com",
    "instagram.com", "tiktok.com", "facebook.com", "netflix.com",
    "hackernews", "discord.com", "twitch.tv", "+ custom rules",
  ];
  return (
    <section className="border-b border-[#111] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12 max-w-2xl">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#666]">
            // default blocklist
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Pre-armed. <span className="text-[#666]">Fully editable.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-[#a1a1a1]">
            Ships with the worst offenders blocked out of the box. Add or remove anything with{" "}
            <code className="rounded-[3px] border border-[#1f1f1f] bg-[#0a0a0a] px-1.5 py-0.5 font-mono text-[12.5px] text-white">
              devmind block &lt;domain&gt;
            </code>
            .
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-[#1f1f1f] bg-[#1f1f1f] sm:grid-cols-3 md:grid-cols-4">
          {items.map((it) => (
            <div
              key={it}
              className="bg-black px-4 py-4 font-mono text-[12.5px] text-[#a1a1a1]"
            >
              <span className="text-[#444]">$ </span>
              {it}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INSTALL ---------- */

function Install() {
  return (
    <section id="install" className="border-b border-[#111] py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#666]">
            // install · windows only
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            One command. <span className="text-[#666]">PowerShell.</span>
          </h2>
        </motion.div>

        <motion.div {...fade} className="space-y-5">
          <TerminalWindow title="windows · powershell">
            <pre className="font-mono text-[13px] leading-7 text-[#e5e5e5]">
              <span className="text-[#666]"># installs the devmind daemon and registers it on boot</span>{"\n"}
              <span className="text-white">iwr</span> -useb https://aarav7162.github.io/dev-devmind/install.ps1 | <span className="text-white">iex</span>
            </pre>
          </TerminalWindow>

          <TerminalWindow title="then, in any terminal">
            <pre className="font-mono text-[13px] leading-7 text-[#e5e5e5]">
              <span className="text-white">devmind</span> start
            </pre>
          </TerminalWindow>
        </motion.div>

        <p className="mt-8 text-center text-[12px] text-[#666]">
          macOS &amp; Linux support coming soon. Need help? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#a1a1a1] hover:text-white">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */

function Pricing() {
  return (
    <section id="pricing" className="border-b border-[#111] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-16 max-w-2xl">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#666]">
            // pricing
          </div>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Simple. <span className="text-[#666]">No subscriptions. Ever.</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[4px] border border-[#1f1f1f] md:grid-cols-2">
          {/* Free */}
          <motion.div {...fade} className="relative glass sheen sheen-slow border-b border-[#1f1f1f] p-8 md:border-b-0 md:border-r">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#a1a1a1]">
                Free
              </span>
              <span className="font-mono text-[11px] text-[#444]">/forever</span>
            </div>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl font-semibold tracking-[-0.03em]">₹0</span>
            </div>
            <p className="mt-4 text-[14px] text-[#a1a1a1]">2 interceptions per day. After that, you're on your own.</p>
            <ul className="mt-8 space-y-2.5 text-[13.5px] text-[#a1a1a1]">
              <li className="flex gap-2"><span className="text-[#444]">—</span> All CLI commands</li>
              <li className="flex gap-2"><span className="text-[#444]">—</span> System-level daemon</li>
              <li className="flex gap-2"><span className="text-[#444]">—</span> Custom blocklist</li>
              <li className="flex gap-2"><span className="text-[#444]">—</span> Daily focus stats</li>
            </ul>
            <a
              href="#install"
              className="mt-10 block rounded-[4px] glass glass-hover sheen sheen-slow py-2.5 text-center text-[13px] font-medium text-white lift press focus-ring"
            >
              Install Free
            </a>
          </motion.div>

          {/* Pro */}
          <motion.div
            {...fade}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative glass-strong sheen p-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-white">
                Pro
              </span>
              <span className="rounded-[3px] border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a1a1a1]">
                Lifetime
              </span>
            </div>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl font-semibold tracking-[-0.03em]">₹499</span>
              <span className="text-[13px] text-[#666]">one-time</span>
            </div>
            <p className="mt-4 text-[14px] text-[#a1a1a1]">Unlimited interceptions. No subscriptions. Ever.</p>
            <ul className="mt-8 space-y-2.5 text-[13.5px] text-white/90">
              <li className="flex gap-2"><span className="text-white">→</span> Unlimited daily interceptions</li>
              <li className="flex gap-2"><span className="text-white">→</span> Everything in Free</li>
              <li className="flex gap-2"><span className="text-white">→</span> Priority email support</li>
              <li className="flex gap-2"><span className="text-white">→</span> All future updates, forever</li>
            </ul>
            <a
              href="#pay"
              className="mt-10 block rounded-[4px] bg-white py-2.5 text-center text-[13px] font-medium text-black transition-all hover:bg-[#e5e5e5] hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.55)] lift press focus-ring"
            >
              Buy Lifetime — ₹499
            </a>
          </motion.div>
        </div>

        <motion.div
          {...fade}
          id="pay"
          className="mx-auto mt-8 flex max-w-4xl flex-col items-center gap-5 rounded-[4px] glass sheen sheen-slow p-6 sm:flex-row"
        >
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[4px] bg-white p-2">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => {
                const x = i % 10;
                const y = Math.floor(i / 10);
                const filled = (x * 7 + y * 13 + ((x + y) % 3)) % 3 !== 0;
                return filled ? <rect key={i} x={x * 10} y={y * 10} width="10" height="10" fill="#000" /> : null;
              })}
              <rect x="0" y="0" width="30" height="30" fill="white" stroke="#000" strokeWidth="4" />
              <rect x="10" y="10" width="10" height="10" fill="#000" />
              <rect x="70" y="0" width="30" height="30" fill="white" stroke="#000" strokeWidth="4" />
              <rect x="80" y="10" width="10" height="10" fill="#000" />
              <rect x="0" y="70" width="30" height="30" fill="white" stroke="#000" strokeWidth="4" />
              <rect x="10" y="80" width="10" height="10" fill="#000" />
            </svg>
          </div>
          <div className="text-center text-[13.5px] text-[#a1a1a1] sm:text-left">
            <div className="font-mono text-white">UPI: 8850783566@fam</div>
            <p className="mt-2">
              Send ₹499, then email your transaction ID to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white underline-offset-2 hover:underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              to get your license key within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function DevMindPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Blocklist />
        <Install />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  );
}
