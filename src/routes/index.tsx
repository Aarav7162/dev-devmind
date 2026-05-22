import { createFileRoute } from "@tanstack/react-router";
import { DevMindPage } from "@/components/DevMindPage";

const meta = document.createElement('meta');
meta.name = "google-site-verification";
meta.content = "UhkPsA0sbfOFsR3FmRhpSdPFdjlSDz6fnLPKcBYqY-w";
document.getElementsByTagName('head')[0].appendChild(meta);

export const Route = createFileRoute("/")({
  component: DevMindPage,
  head: () => ({
    meta: [
      { title: "DevMind — Ruthless Focus for Developers" },
      {
        name: "description",
        content:
          "A local background daemon that detects when you get distracted, locks your screen, and uses your current project context to guilt you back to work.",
      },
      { property: "og:title", content: "DevMind — Ruthless Focus for Developers" },
      {
        property: "og:description",
        content:
          "Local daemon that intercepts distractions, locks your screen, and guilts you back to your code with full project context.",
      },
    ],
  }),
});
