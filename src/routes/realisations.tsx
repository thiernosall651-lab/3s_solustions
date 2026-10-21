import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Sparkles } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/realisations")({
  head: () => pageHead("portfolio"),
  component: Portfolio,
});

const projectIcons = [Building2, Sparkles] as const;

function Portfolio() {
  const { t } = useLang();
  usePageMeta("portfolio");

  return (
    <>
      <PageHero title={t.portfolio.title} intro={t.portfolio.intro} />
      <section className="container-site grid gap-6 pb-8 md:grid-cols-2">
        {t.portfolio.items.map((p, i) => {
          const Icon = projectIcons[i] ?? Building2;
          const previewGradient = i === 0
            ? "from-blue-950 via-slate-900 to-sky-950"
            : "from-slate-900 via-purple-950 to-rose-950";

          return (
            <Reveal key={p.url}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
                <div className={`relative isolate flex aspect-video flex-col justify-between overflow-hidden bg-gradient-to-br ${previewGradient} p-5 sm:p-7`}>
                  <div aria-hidden="true" className="absolute -right-12 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" />
                  <div aria-hidden="true" className={`absolute -bottom-16 -left-10 size-40 rounded-full ${i === 0 ? "bg-cyan-500/15" : "bg-fuchsia-500/15"} blur-3xl`} />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      {t.portfolio.online}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.portfolio.viewSite}: ${p.t}`}
                      className="rounded-full border border-white/20 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur">
                      <Icon className="size-7" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-200">{p.brand}</p>
                      <h2 className="mt-2 font-display text-2xl font-bold text-white">{p.previewTitle}</h2>
                      <p className="mt-1 text-sm text-white/70">{p.previewSubtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{t.portfolio.project}</span>
                    <span className="text-sm text-muted-foreground">{p.loc}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{p.t}</h3>
                  <p className="mt-3 text-muted-foreground">{p.d}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-5 inline-flex items-center gap-2"
                    aria-label={`${t.portfolio.viewSite}: ${p.t}`}
                  >
                    {t.portfolio.viewSite}
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
