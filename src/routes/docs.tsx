import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Menu, X, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL } from "@/components/SiteChrome";
import { TerminalWindow } from "@/components/TerminalWindow";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({
    meta: [
      { title: "Docs — DevMind" },
      {
        name: "description",
        content:
          "Install the DevMind focus daemon on Windows, configure your blocklist, and learn every CLI command.",
      },
      { property: "og:title", content: "DevMind Docs" },
      {
        property: "og:description",
        content: "Everything you need to install and run the DevMind focus daemon.",
      },
    ],
  }),
});

/* ---------- primitives ---------- */

function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-3 text-balance text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
      {children}
    </h1>
  );
}
function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-14 scroll-mt-24 text-[22px] font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}
function P({ children }: { children: ReactNode }) {
  return <p className="my-4 text-[15px] leading-[1.75] text-[#a1a1a1]">{children}</p>;
}
function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[3px] border border-[#1f1f1f] bg-[#0a0a0a] px-1.5 py-0.5 font-mono text-[12.5px] text-white">
      {children}
    </code>
  );
}

function Code({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="my-5">
      <TerminalWindow title={lang ?? "shell"}>
        <pre className="font-mono text-[13px] leading-7 text-[#e5e5e5]">
          {children.split("\n").map((line, i) => (
            <div key={i}>
              {line.startsWith("#") || line.startsWith("//") ? (
                <span className="text-[#666]">{line}</span>
              ) : line.startsWith("$") || line.startsWith("✓") ? (
                <span>
                  <span className="text-white">{line[0]}</span>
                  {line.slice(1)}
                </span>
              ) : (
                line || "\u00A0"
              )}
            </div>
          ))}
        </pre>
      </TerminalWindow>
    </div>
  );
}

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warn";
  children: ReactNode;
}) {
  const map = {
    info: { Icon: Info, accent: "border-l-white" },
    warn: { Icon: AlertTriangle, accent: "border-l-[#f5a524]" },
  }[variant];
  return (
    <div
      className={`my-6 flex gap-3 rounded-[4px] glass sheen sheen-slow border-l-2 ${map.accent} p-5`}
    >
      <map.Icon className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={1.6} />
      <div className="text-[14.5px] leading-[1.7] text-[#cfcfcf]">{children}</div>
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[4px] border border-[#1f1f1f]">
      <table className="w-full text-sm">
        <thead className="bg-[#0a0a0a] text-left text-[#666]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-[#1f1f1f]">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top text-[13.5px] text-white/90">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- nav data ---------- */

type Page = { id: string; title: string; render: () => ReactNode };
type Group = { label: string; pages: Page[] };

function CommandPage({
  name,
  desc,
  usage,
  options,
  examples,
  notes,
}: {
  name: string;
  desc: string;
  usage: string;
  options?: { flag: string; desc: string; def?: string }[];
  examples?: string[];
  notes?: ReactNode;
}) {
  return (
    <>
      <H1>devmind {name}</H1>
      <P>{desc}</P>
      <H2>Usage</H2>
      <Code lang="powershell">{usage}</Code>
      {options && options.length > 0 && (
        <>
          <H2>Options</H2>
          <Table
            headers={["Flag", "Description", "Default"]}
            rows={options.map((o) => [<Mono key={o.flag}>{o.flag}</Mono>, o.desc, o.def ?? "—"])}
          />
        </>
      )}
      {examples && examples.length > 0 && (
        <>
          <H2>Examples</H2>
          {examples.map((ex, i) => (
            <Code key={i} lang="powershell">{ex}</Code>
          ))}
        </>
      )}
      {notes && (
        <>
          <H2>Notes</H2>
          <Callout>{notes}</Callout>
        </>
      )}
    </>
  );
}

const commands: Page[] = [
  {
    id: "cmd-start",
    title: "devmind start",
    render: () => (
      <CommandPage
        name="start"
        desc="Launch the background watcher daemon silently. No console window remains on screen — the scanning loop runs with 0% measurable CPU."
        usage=".\\release\\devmind.exe start"
        examples={[".\\release\\devmind.exe start\n# [daemon] focus watcher armed (pid 26404)"]}
        notes="Once installed, the daemon also auto-starts on boot. Use this command if you stopped it manually."
      />
    ),
  },
  {
    id: "cmd-status",
    title: "devmind status",
    render: () => (
      <CommandPage
        name="status"
        desc="Print live telemetry — daemon PID, today's interception count, and your license tier."
        usage=".\\release\\devmind.exe status"
        examples={[
          ".\\release\\devmind.exe status\n" +
            "daemon          : running    (pid 26404)\n" +
            "interceptions   : 1 / unlimited (today | pro)\n" +
            "license         : pro",
        ]}
      />
    ),
  },
  {
    id: "cmd-stop",
    title: "devmind stop",
    render: () => (
      <CommandPage
        name="stop"
        desc="Disarm the background watcher. Distractions will not be intercepted until you start it again."
        usage=".\\release\\devmind.exe stop"
        notes={<>Pro tip: just don't.</>}
      />
    ),
  },
];

const groups: Group[] = [
  {
    label: "Getting Started",
    pages: [
      {
        id: "what",
        title: "What is DevMind?",
        render: () => (
          <>
            <H1>What is DevMind?</H1>
            <P>
              DevMind is an ultra-premium, gamified Windows focus tool. A silent
              background daemon watches every foreground window; the moment you drift
              toward a distracting site or app, your screen is taken over by a
              full-screen blackout with a 10-second breathing exercise. Beat the
              distraction, earn XP, and level up your Operator rank.
            </P>
            <Callout>
              DevMind is not a productivity app. It is not a polite reminder. It is a
              brick wall between you and your distractions — wrapped in a beautiful
              matte-black control dashboard.
            </Callout>
            <ul className="my-6 space-y-3 text-[15px] leading-7 text-white/85">
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Runs silently with 0% measurable CPU</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Hardware-bound Pro licensing — tied to your Machine ID</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Gamified XP, levels, and Operator ranks</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Floating corner widget for Focus Sessions</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> 100% local. No accounts, no cloud, no telemetry.</li>
            </ul>
          </>
        ),
      },
      {
        id: "install",
        title: "Installation",
        render: () => (
          <>
            <H1>Installation</H1>
            <H2>Windows · PowerShell</H2>
            <Code lang="powershell">{`iwr -useb https://dev-devmind.netlify.app/install.ps1 | iex`}</Code>
            <P>
              The installer drops <Mono>devmind.exe</Mono> into{" "}
              <Mono>~/.devmind/release/</Mono>, adds it to your PATH, and registers
              the background watcher to auto-start on boot.
            </P>
            <H2>Verify</H2>
            <Code lang="powershell">{`.\\release\\devmind.exe status
# daemon : running`}</Code>
            <Callout variant="warn">
              macOS and Linux support is in progress. Today, DevMind is Windows-only —
              because Win32 window-title hooks are the foundation of how interception works.
            </Callout>
          </>
        ),
      },
      {
        id: "quickstart",
        title: "Quickstart",
        render: () => (
          <>
            <H1>Quickstart</H1>
            <P>Less than 30 seconds to your first interception.</P>
            <H2>1. Launch the Dashboard</H2>
            <P>
              Double-click <Mono>release/devmind.exe</Mono>. The matte-black desktop
              control dashboard launches immediately.
            </P>
            <H2>2. Start the Watcher Daemon</H2>
            <P>
              Click <Mono>Start Daemon</Mono> in the control panel. The background
              scanning loop is now active.
            </P>
            <H2>3. Trigger your first interception</H2>
            <P>
              Open your browser and navigate to something distracting like{" "}
              <Mono>youtube.com</Mono> or <Mono>reddit.com</Mono>. The screen instantly
              locks into a full-screen takeover.
            </P>
            <H2>4. Complete a breathing cycle</H2>
            <P>
              Follow the fading ocean-wave sound and breathing indicator for 10 seconds.
              Click <Mono>Back to Focus</Mono> — the distracting tab closes instantly
              and you are awarded <strong className="text-white">+15 XP</strong>.
            </P>
          </>
        ),
      },
    ],
  },
  {
    label: "Dashboard",
    pages: [
      {
        id: "dash-stats",
        title: "Stats Overview",
        render: () => (
          <>
            <H1>Real-Time Stats Overview</H1>
            <P>The top of the dashboard surfaces your live gamified stats.</P>
            <Table
              headers={["Stat", "What it shows"]}
              rows={[
                ["Operator Level", "Your current focus level and rank."],
                ["Focus Experience (XP)", "Exact XP and how much is needed for the next rank."],
                ["Neutralized Blocks", "Distractions successfully averted today, in real time."],
              ]}
            />
          </>
        ),
      },
      {
        id: "dash-session",
        title: "Focus Sessions",
        render: () => (
          <>
            <H1>Sleek Corner Focus Sessions</H1>
            <P>
              Ready to lock in? Type a <strong className="text-white">Mission Objective</strong>{" "}
              (e.g. <Mono>Refactoring Auth Pipeline</Mono>) into the Focus Session card
              and click <Mono>Launch Focus Mode</Mono>.
            </P>
            <P>
              The dashboard shrinks and pins itself to the bottom-right corner of your
              screen as a beautiful topmost micro-widget (<Mono>280×220</Mono> pixels)
              showing:
            </P>
            <ul className="my-4 space-y-2 text-[15px] leading-7 text-white/85">
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Live elapsed timer</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Your mission objective</li>
              <li className="flex gap-3"><ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white" /> Count of distractions resisted this session</li>
            </ul>
            <Callout>
              Click <Mono>Expand</Mono> to bring the full dashboard back, or{" "}
              <Mono>End Session</Mono> to finish. Ending a session awards{" "}
              <strong className="text-white">+10 XP per minute</strong> focused.
            </Callout>
          </>
        ),
      },
      {
        id: "dash-blocklist",
        title: "Managing the Blocklist",
        render: () => (
          <>
            <H1>Managing your Blocklist</H1>
            <P>
              Under the <Mono>Blocklist</Mono> tab, customize exactly what DevMind
              should intercept.
            </P>
            <H2>Distracting Websites</H2>
            <P>
              Type any domain keyword (e.g. <Mono>reddit</Mono>, <Mono>facebook</Mono>,{" "}
              <Mono>instagram</Mono>) and click <Mono>Add Item</Mono>. Any foreground
              tab or window containing that keyword in its title triggers an immediate
              interception.
            </P>
            <H2>Distracting Desktop Apps</H2>
            <P>
              Type the exact process file name (e.g. <Mono>Spotify.exe</Mono>,{" "}
              <Mono>Discord.exe</Mono>) and click <Mono>Add Item</Mono>. DevMind
              instantly terminates the app if it is active while you are working.
            </P>
            <Callout>
              Changes are picked up live. You don't need to restart the daemon.
            </Callout>
          </>
        ),
      },
      {
        id: "dash-settings",
        title: "Settings & Pro",
        render: () => (
          <>
            <H1>Personal Settings & Pro Upgrades</H1>
            <P>
              Under the <Mono>Settings & Pro</Mono> tab you'll find the personal
              preferences and licensing controls.
            </P>
            <H2>Sound Toggle</H2>
            <P>
              Click to mute or unmute the soothing, low-volume procedural wave audio
              played during a takeover.
            </P>
            <H2>Cryptographic Pro Activation</H2>
            <P>
              Locate your secure, hardware-bound <strong className="text-white">Machine ID</strong>.
              Enter your signed Pro license key and click <Mono>Activate Pro</Mono> to
              unlock unlimited daily interceptions.
            </P>
            <Callout variant="warn">
              The Free tier is capped at <strong className="text-white">100 interceptions</strong>{" "}
              per day. Pro is unlimited and lifetime.
            </Callout>
          </>
        ),
      },
    ],
  },
  { label: "Headless CLI", pages: commands },
  {
    label: "Progression",
    pages: [
      {
        id: "levels",
        title: "Leveling & Ranks",
        render: () => (
          <>
            <H1>Leveling & Rank Systems</H1>
            <P>
              Your Operator Rank upgrades automatically as you accumulate Focus XP.
              Earn <strong className="text-white">+15 XP</strong> per neutralized
              distraction and <strong className="text-white">+10 XP per minute</strong>{" "}
              of completed Focus Session.
            </P>
            <Table
              headers={["Level Range", "Operator Rank"]}
              rows={[
                ["Levels 1 – 4", <Mono key="r1">NOVICE</Mono>],
                ["Levels 5 – 9", <Mono key="r2">APPRENTICE</Mono>],
                ["Levels 10 – 19", <Mono key="r3">FOCUS ADEPT</Mono>],
                ["Levels 20 – 29", <Mono key="r4">DISCIPLINE MASTER</Mono>],
                ["Levels 30 – 49", <Mono key="r5">TIME LORD</Mono>],
                ["Levels 50+", <Mono key="r6">GODLIKE</Mono>],
              ]}
            />
            <P>Build focus, earn XP, and become godlike.</P>
          </>
        ),
      },
      {
        id: "privacy",
        title: "Privacy",
        render: () => (
          <>
            <H1>Privacy</H1>
            <P>
              DevMind reads active window titles via the Windows event hook API. That
              data never leaves your machine. There are no accounts, no telemetry, no
              analytics, no remote configuration. The daemon does not even open an
              outbound socket.
            </P>
            <P>
              Your blocklist, stats, and XP live in <Mono>~/.devmind/</Mono> as plain
              text and a small SQLite file. Delete the folder and DevMind forgets
              everything.
            </P>
          </>
        ),
      },
      {
        id: "buy",
        title: "Buying Pro",
        render: () => (
          <>
            <H1>Buying a Pro License</H1>
            <P><strong className="text-white">Step 1.</strong> Send ₹499 via UPI to <Mono>8850783566@fam</Mono>.</P>
            <P>
              <strong className="text-white">Step 2.</strong> Email your transaction ID together with the
              Machine ID shown in your dashboard's <Mono>Settings & Pro</Mono> tab to{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white underline-offset-2 hover:underline focus-ring rounded-[2px]">
                {SUPPORT_EMAIL}
              </a>{" "}
              to receive your hardware-bound license key within 24 hours.
            </P>
            <P><strong className="text-white">Step 3.</strong> Paste the key into the <Mono>Activate Pro</Mono> field. Unlimited interceptions unlocked.</P>

            <div className="my-8 flex flex-col items-center gap-5 rounded-[4px] glass sheen sheen-slow p-6 sm:flex-row">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[4px] bg-white">
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
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#666]">UPI ID</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-white">8850783566@fam</div>
                <div className="mt-3 text-[13px] text-[#a1a1a1]">
                  Works with GPay, PhonePe, Paytm — any UPI app.
                </div>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
];

const allPages = groups.flatMap((g) => g.pages);

/* ---------- page ---------- */

function DocsPage() {
  const [activeId, setActiveId] = useState<string>(allPages[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      if (h && allPages.some((p) => p.id === h)) setActiveId(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const active = useMemo(() => allPages.find((p) => p.id === activeId) ?? allPages[0], [activeId]);

  const select = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16">
        <div className="mx-auto flex max-w-7xl">
          {/* sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 top-16 z-40 w-[260px] overflow-y-auto border-r border-[#111] bg-black px-5 py-10 transition-transform md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <DocsNav groups={groups} activeId={activeId} onSelect={select} />
          </aside>

          {mobileOpen && (
            <div
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-16 z-30 bg-black/60 md:hidden"
              aria-hidden
            />
          )}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-[4px] glass-strong sheen text-white shadow-2xl focus-ring press md:hidden"
            aria-label="Toggle docs navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <main className="min-w-0 flex-1 px-6 py-16 sm:px-12">
            <div className="mx-auto max-w-[720px]">
              <div className="mb-6 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#666]">
                <span className="h-1 w-1 rounded-full bg-white" />
                Documentation
              </div>
              <article className="docs-prose">{active.render()}</article>
            </div>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function DocsNav({
  groups,
  activeId,
  onSelect,
}: {
  groups: Group[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="space-y-6">
      {groups.map((g) => {
        const containsActive = g.pages.some((p) => p.id === activeId);
        return (
          <DocsGroup
            key={g.label}
            group={g}
            defaultOpen={containsActive}
            activeId={activeId}
            onSelect={onSelect}
          />
        );
      })}
    </nav>
  );
}

function DocsGroup({
  group,
  defaultOpen,
  activeId,
  onSelect,
}: {
  group: Group;
  defaultOpen: boolean;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-[3px] px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#666] transition-colors hover:text-white focus-ring"
      >
        <span>{group.label}</span>
        <ChevronRight
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-0.5">
          {group.pages.map((p) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id}>
                <button
                  onClick={() => onSelect(p.id)}
                  className={`block w-full rounded-[3px] border-l-2 px-3 py-1.5 text-left text-[13px] transition-colors focus-ring ${
                    isActive
                      ? "border-l-white bg-white/[0.04] text-white"
                      : "border-l-transparent text-[#a1a1a1] hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  {p.title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
