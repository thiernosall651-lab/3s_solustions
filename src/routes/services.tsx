import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, Briefcase, FileText, User } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => pageHead("services"),
  component: Services,
});

const icons = [Globe, LayoutDashboard, Bot] as const;
const personalIcons = [Briefcase, FileText, User] as const;

function Services() {
  const { t } = useLang();
  usePageMeta("services");
  return (
    <>
      <PageHero title={t.services.title} intro={t.services.intro} />
      <section className="container-site grid gap-6">
        {t.services.items.map((s, i) => {
          const Icon = icons[i] ?? Globe;
          return (
            <Reveal key={s.t}>
              <article className="card-lift grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                <Icon className="size-10 text-primary" />
                <div>
                  <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
                  <p className="mt-3 text-sm"><span className="eyebrow">{t.services.needLabel} — </span><span className="text-muted-foreground">{s.need}</span></p>
                  <p className="mt-3 text-muted-foreground">{s.d}</p>
                </div>
                <Link to="/contact" className="btn-primary">{t.services.quote}</Link>
              </article>
            </Reveal>
          );
        })}
      </section>
      <section id="particuliers" className="container-site py-16">
        <Reveal>
          <p className="eyebrow">{t.services.personal.eyebrow}</p>
          <h2 className="section-title mt-3">{t.services.personal.title}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t.services.personal.intro}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.services.personal.items.map((p, i) => {
            const Icon = personalIcons[i] ?? User;
            return (
              <Reveal key={p.t}>
                <article className="card-lift flex h-full flex-col">
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-5 font-display text-xl font-semibold">{p.t}</h3>
                  <p className="mt-2 flex-1 text-muted-foreground">{p.d}</p>
                  <Link to="/contact" className="btn-outline mt-6 self-start">{t.services.personal.cta}</Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
