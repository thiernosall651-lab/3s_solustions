import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight, ArrowUpRight, MessageSquareQuote } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { LogoImage, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;

function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = `${CONTACTS.ma1.url}?text=${encodeURIComponent(t.waDefault)}`;
  return (
    <>
      <section className="hero-glow">
        <div className="container-site grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t.home.location}</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">{t.home.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.home.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t.home.ctaContact}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
          </Reveal>
          <Reveal>
            <LogoImage variant="hero" alt="3S Solutions — Agence digitale" loading="eager" className="aspect-[3/2] w-full rounded-3xl border border-border object-cover shadow-glow" />
          </Reveal>
        </div>
      </section>

      <section className="container-site py-16">
        <Reveal><h2 className="section-title">{t.home.servicesTitle}</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] ?? Globe;
            return (
              <Reveal key={s.t}>
                <Link to="/services" className="card-lift block h-full">
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground">{s.short}</p>
                  <ArrowRight className="mt-6 size-5 text-accent" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-site py-16">
        <Reveal><h2 className="section-title">{t.home.processTitle}</h2></Reveal>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.steps.map((s, i) => (
            <Reveal key={s.t}>
              <li className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-site py-16" aria-labelledby="testimonials-title">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">3S SOLUTIONS · RETOURS CLIENTS</p>
            <h2 id="testimonials-title" className="section-title mt-3">{t.home.testimonialsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.home.testimonialsIntro}</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.home.businessFeedbacks.map((review) => (
            <Reveal key={review.brand}>
              <article className="card-lift flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold">{review.brand}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{review.category}</p>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary" aria-hidden="true">
                    <MessageSquareQuote className="size-5" />
                  </span>
                </div>
                <div className="mt-5">
                  <span className="chip">{review.status}</span>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{review.text}</p>
                </div>
                <a href={review.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
                  {t.portfolio.viewSite}
                  <ArrowUpRight className="size-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">{t.services.personal.eyebrow}</p>
                <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">{t.home.individualsTitle}</h3>
                <p className="mt-3 text-muted-foreground">{t.home.individualsText}</p>
              </div>
              <Link to="/contact" className="btn-primary inline-flex shrink-0 items-center justify-center gap-2">
                {t.home.individualsCta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site py-16">
        <Reveal>
          <div className="cta-panel">
            <h2 className="font-display text-2xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.finalDesc}</p>
            <Link to="/contact" className="btn-primary mt-8">{t.home.finalCta}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
