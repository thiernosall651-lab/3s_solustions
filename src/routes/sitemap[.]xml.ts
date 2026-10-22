import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://3solutions.3ssolutions.workers.dev";
const LAST_MODIFIED = "2026-10-22";
const SITEMAP_PATHS = [
  "/",
  "/services",
  "/realisations",
  "/a-propos",
  "/contact",
] as const;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map(
  (path) =>
    `  <url><loc>${SITE_URL}${path === "/" ? "/" : path}</loc><lastmod>${LAST_MODIFIED}</lastmod></url>`,
).join("\n")}
</urlset>`;

const sitemapHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
  "X-Content-Type-Options": "nosniff",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => new Response(SITEMAP_XML, { headers: sitemapHeaders }),
    },
  },
});
