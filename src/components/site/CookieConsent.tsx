import { useEffect, useState } from "react";
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

type Consent = {
  version: 1;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
};

const STORAGE_KEY = "3s-solutions-cookie-consent-v1";

const copy: Record<Lang, {
  title: string;
  description: string;
  accept: string;
  reject: string;
  manage: string;
  dialogTitle: string;
  dialogDescription: string;
  necessary: string;
  necessaryDescription: string;
  alwaysOn: string;
  analytics: string;
  analyticsDescription: string;
  marketing: string;
  marketingDescription: string;
  save: string;
  close: string;
  preferences: string;
  privacyNote: string;
}> = {
  fr: {
    title: "Nous respectons votre vie privée",
    description: "Les stockages nécessaires assurent le fonctionnement du site. Les options de mesure d’audience et de marketing ne seront utilisées que si ces outils sont activés et avec votre accord.",
    accept: "Tout accepter",
    reject: "Tout refuser",
    manage: "Gérer les cookies",
    dialogTitle: "Vos préférences de cookies",
    dialogDescription: "Choisissez les catégories que vous autorisez. Vous pourrez modifier votre choix à tout moment depuis le bouton « Cookies » en bas à gauche.",
    necessary: "Stockage nécessaire",
    necessaryDescription: "Mémorise les choix indispensables au fonctionnement du site, par exemple votre préférence de langue et le choix de consentement.",
    alwaysOn: "Toujours actif",
    analytics: "Mesure d’audience",
    analyticsDescription: "Autorise de futurs outils de mesure à recueillir des statistiques de visite, uniquement s’ils sont installés sur le site.",
    marketing: "Marketing",
    marketingDescription: "Autorise de futurs outils marketing ou publicitaires à utiliser des technologies de suivi, uniquement s’ils sont installés sur le site.",
    save: "Enregistrer mes choix",
    close: "Fermer",
    preferences: "Préférences cookies",
    privacyNote: "Cette bannière ne charge aucun outil d’analyse ou de publicité. Elle enregistre uniquement votre choix dans le stockage local du navigateur.",
  },
  en: {
    title: "We respect your privacy",
    description: "Essential storage keeps the website working. Audience measurement and marketing options will only be used if those tools are enabled and you agree.",
    accept: "Accept all",
    reject: "Reject all",
    manage: "Manage cookies",
    dialogTitle: "Your cookie preferences",
    dialogDescription: "Choose which categories you allow. You can change your choice at any time using the “Cookies” button at the bottom left.",
    necessary: "Essential storage",
    necessaryDescription: "Remembers choices required for the website, such as your language preference and consent choice.",
    alwaysOn: "Always active",
    analytics: "Audience measurement",
    analyticsDescription: "Allows future analytics tools to collect visit statistics, but only if they are installed on the website.",
    marketing: "Marketing",
    marketingDescription: "Allows future marketing or advertising tools to use tracking technologies, but only if they are installed on the website.",
    save: "Save my choices",
    close: "Close",
    preferences: "Cookie preferences",
    privacyNote: "This banner does not load any analytics or advertising tools. It only saves your choice in the browser’s local storage.",
  },
};

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === "object" &&
      value !== null &&
      "version" in value &&
      value.version === 1 &&
      "analytics" in value &&
      typeof value.analytics === "boolean" &&
      "marketing" in value &&
      typeof value.marketing === "boolean"
    ) {
      return value as Consent;
    }
  } catch {
    // Storage may be unavailable in private browsing; consent UI still works for this session.
  }
  return null;
}

export function CookieConsent() {
  const { lang } = useLang();
  const text = copy[lang];
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    setConsent(existing);
    setAnalytics(existing?.analytics ?? false);
    setMarketing(existing?.marketing ?? false);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!manageOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setManageOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [manageOpen]);

  const save = (analyticsAllowed: boolean, marketingAllowed: boolean) => {
    const next: Consent = {
      version: 1,
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      savedAt: new Date().toISOString(),
    };
    setConsent(next);
    setAnalytics(analyticsAllowed);
    setMarketing(marketingAllowed);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep the choice for this session even if storage is unavailable.
    }
    setManageOpen(false);
  };

  const openPreferences = () => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setManageOpen(true);
  };

  if (!ready) return null;

  return (
    <>
      {!consent && !manageOpen && (
        <aside
          aria-labelledby="cookie-consent-title"
          className="fixed bottom-4 left-4 z-[90] w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-border bg-background/95 p-5 text-foreground shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-5"
          style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Cookie className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 id="cookie-consent-title" className="font-display text-base font-bold">{text.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text.description}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button type="button" onClick={() => save(true, true)} className="rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {text.accept}
            </button>
            <button type="button" onClick={() => save(false, false)} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {text.reject}
            </button>
            <button type="button" onClick={openPreferences} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {text.manage}
            </button>
          </div>
        </aside>
      )}

      {consent && !manageOpen && (
        <button
          type="button"
          onClick={openPreferences}
          className="fixed bottom-4 left-4 z-[80] inline-flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-2 text-xs font-semibold text-muted-foreground shadow-lg backdrop-blur transition hover:border-primary/50 hover:text-foreground"
          aria-label={text.preferences}
        >
          <Cookie className="size-4" aria-hidden="true" />
          {text.preferences}
        </button>
      )}

      {manageOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/65 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setManageOpen(false);
        }}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-border bg-background p-5 text-foreground shadow-2xl sm:rounded-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Settings2 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="cookie-preferences-title" className="font-display text-xl font-bold">{text.dialogTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text.dialogDescription}</p>
                </div>
              </div>
              <button type="button" aria-label={text.close} onClick={() => setManageOpen(false)} className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{text.necessary}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text.necessaryDescription}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{text.alwaysOn}</span>
                </div>
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                <span>
                  <span className="block font-semibold">{text.analytics}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{text.analyticsDescription}</span>
                </span>
                <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="mt-1 size-5 shrink-0 accent-primary" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
                <span>
                  <span className="block font-semibold">{text.marketing}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{text.marketingDescription}</span>
                </span>
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} className="mt-1 size-5 shrink-0 accent-primary" />
              </label>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {text.privacyNote}
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => save(false, false)} className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:bg-muted">
                {text.reject}
              </button>
              <button type="button" onClick={() => save(analytics, marketing)} className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary/20">
                {text.save}
              </button>
              <button type="button" onClick={() => save(true, true)} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                {text.accept}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
