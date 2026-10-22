import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { LogoImage, Reveal } from "@/components/site/Layout";
import robotMascot from "@/assets/robot-mascot.webp";
import teamThierno from "@/assets/team-thierno.webp";
import teamAbdourahamane from "@/assets/team-abdourahamane.webp";

import { Button } from "@/components/ui/button";
import { ProjectLogo, type ProjectLogoData } from "@/components/site/ProjectLogo";
import { QuickContact } from "@/components/site/QuickContact";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;
const team = [
  { name: "Thierno", image: teamThierno },
  { name: "Abdourahamane", image: teamAbdourahamane },
] as const;

/** Portrait ovale avec arcs décoratifs (accent + gris), inspiré des pages « équipe » d'agences. */
function OvalPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative mx-auto w-52 sm:w-60" style={{ aspectRatio: "100 / 124" }}>
      <svg viewBox="0 0 100 124" fill="none" aria-hidden="true" className="absolute inset-0 size-full">
        <path d="M62.2 5 A47 59 0 0 1 96.8 67.1" className="stroke-accent" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M94.7 80.2 A47 59 0 0 1 91.5 89.7" className="stroke-accent" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5.8 82.2 A47 59 0 0 0 23 110.3" className="stroke-muted-foreground/50" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3.7 51.8 A47 59 0 0 0 3 64.1" className="stroke-muted-foreground/50" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[7%] overflow-hidden rounded-[999px] border border-border bg-secondary">
        <img
          src={src}
          alt={alt}
          width={640}
          height={800}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
        />
      </div>
    </div>
  );
}
const supportedProjects: (ProjectLogoData & { name: string; url: string; domain: string })[] = [
  {
    name: "K2B Booking",
    url: "https://k2bbooking.com/",
    domain: "k2bbooking.com",
    logoUrl: "https://raw.githubusercontent.com/thiernosall651-lab/3solutions/main/public/k2b-booking.webp",
    wordmark: "K2B",
    submark: "BOOKING",
    kind: "k2b",
  },
  {
    name: "Teranga Beauty",
    url: "https://terangabeauty.net/",
    domain: "terangabeauty.net",
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/c944e8c8-f768-4514-a82a-89ca4d8d3922/logo-teranga-beauty.png",
    wordmark: "TERANGA",
    submark: "BEAUTY",
    kind: "teranga",
  },
  {
    name: "Les Nouveaux Jardins d’Amizmiz",
    url: "https://lesnouveauxjardinsdamizmiz.com/",
    domain: "lesnouveauxjardinsdamizmiz.com",
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/9a886525-468e-4194-abd7-7e445e2667b7/logo-jardins-amizmiz.jpg",
    wordmark: "LES JARDINS",
    submark: "D’AMIZMIZ",
    kind: "gardens",
  },
  {
    name: "Sen Drapeaux",
    url: "https://sen-drapeau.3ssolutions.workers.dev/",
    domain: "sen-drapeau.3ssolutions.workers.dev",
    logoUrl: "https://three-s-showcase.lovable.app/__l5e/assets-v1/2c443526-3d3d-4325-9abe-fd5c7ef5deeb/logo-sen-drapeaux.svg",
    wordmark: "SEN",
    submark: "DRAPEAUX",
    kind: "sen",
  },
] as const;

function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = `${CONTACTS.ma1.url}?text=${encodeURIComponent(t.waDefault)}`;

  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{t.home.location}</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
              {t.home.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.home.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t.home.ctaContact}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.businessTitle}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.personalTitle}</span>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/15 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/90 via-background to-cyan-950/30" aria-hidden="true" />
              <img
                src={robotMascot}
                alt={t.home.robotAlt}
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative mx-auto aspect-[4/3] w-full max-w-lg object-contain p-4 transition-transform duration-700 motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
              />
              <div className="relative border-t border-border bg-background/80 p-4 backdrop-blur sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <LogoImage variant="footer" alt="3S Solutions" className="w-20 shrink-0 rounded-lg" loading="lazy" />
                    <div className="min-w-0">
                      <p className="font-display font-semibold">{t.home.robotLabel}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.home.robotDesc}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("3s-open-whatsapp-assistant"))}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.home.helpCta}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{t.home.location}</p>
            <h2 className="section-title mt-3">{t.home.servicesTitle}</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i] ?? Globe;
            return (
              <Reveal key={service.t}>
                <Link to="/services" className="card-lift group block h-full">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="size-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{service.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t.services.quote}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="supported-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 id="supported-heading" className="font-display text-3xl font-bold md:text-4xl">{t.home.supportedTitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.home.supportedCaption}</p>
            </div>
          </Reveal>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportedProjects.map((project) => (
              <Reveal key={project.url}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <ProjectLogo project={project} />
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">{project.name}</h3>
                  <div className="mt-auto border-t border-border pt-4">
                    <p className="break-all text-xs leading-relaxed text-muted-foreground">{project.domain}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-accent">
                      <span>{t.portfolio.viewSite}</span>
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-7">
            <Button asChild variant="link" className="h-auto px-0 text-accent">
              <Link to="/realisations">{t.home.projectsCta}<ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="process-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">{t.home.location}</p>
              <h2 id="process-heading" className="mt-3 font-display text-3xl font-bold md:text-4xl">{t.home.processTitle}</h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.steps.map((step, index) => (
              <Reveal key={step.t}>
                <article className="h-full rounded-2xl border border-border bg-background p-5 sm:p-6">
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-accent">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold">{step.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="team-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <h2 id="team-heading" className="font-display text-3xl font-bold md:text-4xl">{t.home.teamTitle}</h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-3xl gap-10 sm:grid-cols-2">
            {team.map((member) => (
              <Reveal key={member.name}>
                <article className="text-center">
                  <OvalPortrait
                    src={member.image}
                    alt={member.name === "Thierno" ? t.home.teamPhotoAltThierno : t.home.teamPhotoAltAbdourahamane}
                  />
                  <h3 className="mt-5 font-display text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-accent">{t.home.teamCaption}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-rapide" className="border-t border-primary/25 bg-gradient-to-br from-blue-950/60 via-background to-cyan-950/30" aria-labelledby="lead-heading">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <img
                src={robotMascot}
                alt={t.home.robotAlt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-40 shrink-0 object-contain sm:w-48 lg:w-56"
              />
              <div>
                <h2 id="lead-heading" className="font-display text-3xl font-bold leading-tight md:text-4xl">{t.home.leadTitle}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{t.home.leadIntro}</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <QuickContact />
          </Reveal>
        </div>
      </section>
    </>
  );
}
