import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";
import { ProjectLogo, type ProjectLogoData } from "@/components/site/ProjectLogo";

export const Route = createFileRoute("/realisations")({
  head: () => pageHead("portfolio"),
  component: Portfolio,
});

const projectMarks: ProjectLogoData[] = [
  {
    logoUrl: "https://raw.githubusercontent.com/thiernosall651-lab/3solutions/main/public/k2b-booking.webp",
    wordmark: "K2B",
    submark: "BOOKING",
    kind: "k2b",
  },
  {
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/c944e8c8-f768-4514-a82a-89ca4d8d3922/logo-teranga-beauty.png",
    wordmark: "TERANGA",
    submark: "BEAUTY",
    kind: "teranga",
  },
  {
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/9a886525-468e-4194-abd7-7e445e2667b7/logo-jardins-amizmiz.jpg",
    wordmark: "LES JARDINS",
    submark: "D’AMIZMIZ",
    kind: "gardens",
  },
  {
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/2c443526-3d3d-4325-9abe-fd5c7ef5deeb/logo-sen-drapeaux.svg",
    wordmark: "SEN",
    submark: "DRAPEAUX",
    kind: "sen",
  },
];

function Portfolio() {
  const { t } = useLang();
  usePageMeta("portfolio");

  return (
    <>
      <PageHero title={t.portfolio.title} intro={t.portfolio.intro} />
      <section className="container-site grid gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {t.portfolio.items.map((p, index) => {
          const mark = projectMarks[index];
          if (!mark) return null;
          return (
            <Reveal key={p.url}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/60 sm:p-5">
                <ProjectLogo project={mark} />
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug">{p.t}</h2>
                <p className="mt-1 text-sm text-accent">{p.loc}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-between gap-3 rounded-full border border-accent/40 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`${t.portfolio.viewSite}: ${p.t}`}
                >
                  <span>{t.portfolio.viewSite}</span>
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
