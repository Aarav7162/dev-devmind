import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Cake, MapPin, Code2 } from "lucide-react";
import { SiteHeader, SiteFooter, SUPPORT_EMAIL } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — DevMind" },
      {
        name: "description",
        content:
          "DevMind is built by Aarav Kapasi, a 14-year-old solo developer building ruthless focus tools for engineers.",
      },
      { property: "og:title", content: "About — DevMind" },
      {
        property: "og:description",
        content: "Built by a 14-year-old solo developer who got tired of losing flow state to YouTube.",
      },
    ],
  }),
});

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function AboutPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40">
        <motion.div {...fade}>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#666]">
            // about
          </div>
          <h1 className="mt-3 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Built by one engineer.
            <br />
            <span className="text-[#666]">For engineers who hate themselves at 2pm.</span>
          </h1>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 space-y-6 text-[15.5px] leading-[1.75] text-[#a1a1a1]"
        >
          <p>
            Hi — I'm <span className="font-semibold text-white">Aarav Kapasi</span>, the
            14-year-old solo developer behind DevMind.
          </p>
          <p>
            I built DevMind because I kept losing entire afternoons to YouTube. I'd open a tab
            "just to check one thing" and look up two hours later having watched videos I didn't
            even like. Every focus app I tried was a polite suggestion. A toggle. A timer. A
            popup I could dismiss in 0.3 seconds.
          </p>
          <p>
            So I wrote a Windows daemon that doesn't ask. It detects the distraction, locks the
            screen, and makes me sit in a black terminal for 10 seconds while I type out why I
            need a break. Most of the time I just close the terminal and go back to my code.
          </p>
          <p>
            DevMind is local, un-bypassable, and stays free for the first 10 interceptions per
            day. The ₹499 lifetime Pro license keeps the project alive — and lets a
            14-year-old keep building.
          </p>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid gap-3 sm:grid-cols-3"
        >
          {[
            { Icon: Cake, label: "Age", value: "14" },
            { Icon: MapPin, label: "Role", value: "Solo dev" },
            { Icon: Code2, label: "Stack", value: "Rust · Win32 · TS" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[4px] glass sheen sheen-slow glass-hover lift p-5"
            >
              <item.Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
              <div className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#666]">
                {item.label}
              </div>
              <div className="mt-1 font-mono text-[13px] text-white">{item.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 rounded-[4px] glass sheen sheen-slow p-6"
        >
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#666]">
            // get in touch
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 flex items-center gap-3 rounded-[4px] border border-white/10 bg-black/40 px-4 py-3 text-[13.5px] transition-colors hover:border-white/25 focus-ring"
          >
            <Mail className="h-4 w-4 text-white" />
            <span className="font-mono text-white">{SUPPORT_EMAIL}</span>
          </a>
        </motion.div>

        <motion.div {...fade} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 flex flex-wrap gap-2.5">
          <Link
            to="/docs"
            className="rounded-[4px] glass glass-hover sheen sheen-slow px-4 py-2.5 text-[13.5px] font-medium text-white lift press focus-ring"
          >
            Read the docs
          </Link>
          <Link
            to="/"
            hash="install"
            className="rounded-[4px] bg-white px-4 py-2.5 text-[13.5px] font-medium text-black transition-all hover:bg-[#e5e5e5] hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.45)] lift press focus-ring"
          >
            Install DevMind
          </Link>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
