import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static prerendered build for Netlify.
// - cloudflare: false  -> no Workers bundle
// - prerender         -> emits real HTML per route (with each route's <head> meta baked in)
//   so SEO and social previews work without an SSR server.
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
      },
    },
    pages: [
      { path: "/", prerender: { enabled: true, crawlLinks: true } },
      { path: "/about", prerender: { enabled: true } },
      { path: "/docs", prerender: { enabled: true } },
    ],
  },
});
