import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, useLang } from "@/lib/i18n";

/** Formulaire court de l'accueil : ouvre WhatsApp (ligne Maroc 1) avec le message prêt à envoyer. */
export function QuickContact() {
  const { t, lang } = useLang();
  const h = t.home;
  const [f, setF] = useState({ name: "", phone: "", email: "", need: "" });
  const [tried, setTried] = useState(false);
  const missing = { name: !f.name.trim(), need: !f.need.trim() };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (missing.name || missing.need) return;
    const url = buildWhatsAppUrl(
      "ma1",
      { name: f.name.trim(), company: "", service: "", message: f.need.trim(), phone: f.phone.trim(), email: f.email.trim() },
      lang,
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-glow sm:p-7">
      {tried && (missing.name || missing.need) && (
        <p role="alert" className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">{h.leadErr}</p>
      )}
      <div>
        <label htmlFor="lead-name" className="field-label">{h.leadName} *</label>
        <input
          id="lead-name"
          name="name"
          autoComplete="name"
          placeholder={h.leadNamePh}
          className="field"
          value={f.name}
          aria-invalid={tried && missing.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-phone" className="field-label">{h.leadPhone} <span className="text-muted-foreground">{h.leadOptional}</span></label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={h.leadPhonePh}
            className="field"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="field-label">{h.leadEmail} <span className="text-muted-foreground">{h.leadOptional}</span></label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={h.leadEmailPh}
            className="field"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="lead-need" className="field-label">{h.leadNeed} *</label>
        <textarea
          id="lead-need"
          name="need"
          rows={3}
          placeholder={h.leadNeedPh}
          className="field"
          value={f.need}
          aria-invalid={tried && missing.need}
          onChange={(e) => setF({ ...f, need: e.target.value })}
        />
      </div>
      <button type="submit" className="btn-primary w-full gap-2">
        <MessageCircle className="size-4" aria-hidden="true" />
        {h.leadSubmit}
      </button>
      <p className="text-xs text-muted-foreground">{t.contact.note}</p>
      <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
        {h.leadMore}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </form>
  );
}
