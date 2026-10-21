import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { CONTACTS, SOCIALS, useLang } from "@/lib/i18n";
import logo from "@/assets/logo-3s.png.asset.json";

export function Brand() {
  return (
    <span className="font-display text-xl font-bold tracking-tight">
      3<span className="text-primary">S</span> Solutions
    </span>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const links = [
  { to: "/", key: "home" },
  { to: "/services", key: "services" },
  { to: "/realisations", key: "portfolio" },
  { to: "/a-propos", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-border p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Brand />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link" activeOptions={{ exact: true }}>
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <Link to="/contact" className="btn-primary hidden sm:inline-flex">
            {t.nav.cta}
          </Link>
          <button className="lg:hidden" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="container-site flex flex-col gap-1 border-t border-border py-3 lg:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="nav-link py-2" activeOptions={{ exact: true }}>
              {t.nav[l.key]}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 sm:hidden">
            {t.nav.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function ContactList() {
  const { t } = useLang();
  const items = [
    { k: "ma1", ...CONTACTS.ma1 },
    { k: "ma2", ...CONTACTS.ma2 },
    { k: "sn", ...CONTACTS.sn },
  ] as const;
  return (
    <ul className="space-y-3 text-sm">
      {items.map((i) => (
        <li key={i.k}>
          <a href={i.url} target="_blank" rel="noopener noreferrer" className="link-muted flex items-center gap-2">
            <MessageCircle className="size-4 text-accent" />
            <span>
              <span className="text-muted-foreground">{t.contact.waOpts[i.k]} : </span>
              {i.label}
            </span>
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${CONTACTS.email}`} className="link-muted flex items-center gap-2">
          <Mail className="size-4 text-accent" /> {CONTACTS.email}
        </a>
      </li>
    </ul>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.67a5.73 5.73 0 0 0-.8-.06 5.68 5.68 0 0 0-5.69 5.69A5.68 5.68 0 0 0 9.86 21a5.68 5.68 0 0 0 5.68-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

const socialIcons = { instagram: Instagram, tiktok: TikTokIcon, facebook: Facebook } as const;

export function Socials() {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {SOCIALS.map((s) => {
        const Icon = socialIcons[s.id];
        return (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="chip inline-flex items-center gap-2"
            aria-label={`${s.label} — ${t.footer.follow}`}
          >
            <Icon className="size-4" />
            {s.label}
          </a>
        );
      })}
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-site grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <img src={logo.url} alt="3S Solutions" className="w-44 rounded-xl" loading="lazy" />
          <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <div>
          <h3 className="mb-4 font-display font-semibold">{t.footer.contact}</h3>
          <ContactList />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 font-display font-semibold">{t.footer.nav}</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {links.map((l) => (
                <li key={l.to}><Link to={l.to} className="link-muted">{t.nav[l.key]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-display font-semibold">{t.footer.follow}</h3>
            <Socials />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} 3S Solutions. {t.footer.rights}
      </div>
    </footer>
  );
}

export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="container-site pt-16 pb-10 md:pt-24">
      <Reveal>
        <h1 className="max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </Reveal>
    </section>
  );
}
