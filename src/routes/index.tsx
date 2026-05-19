import { createFileRoute } from "@tanstack/react-router";
import { DevMindPage } from "@/components/DevMindPage";

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
