import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

export const CONTACTS = {
  ma1: { label: "+212 696 66 12 47", url: "https://wa.me/212696661247", number: "212696661247" },
  ma2: { label: "+212 684 77 29 57", url: "https://wa.me/212684772957", number: "212684772957" },
  sn: { label: "+221 78 824 05 92", url: "https://wa.me/221788240592", number: "221788240592" },
  email: "thiernosall651@gmail.com",
  tiktok: "https://www.tiktok.com/@3swgrowth",
  instagram: "https://www.instagram.com/3sw_growth",
} as const;

/** Réseaux sociaux affichés (pied de page, Contact, JSON-LD). Ajouter Facebook = une ligne :
 *  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/..." }, */
export const SOCIALS = [
  { id: "instagram", label: "Instagram", url: CONTACTS.instagram },
  { id: "tiktok", label: "TikTok", url: CONTACTS.tiktok },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/3solustions" },
] as const satisfies readonly { id: "instagram" | "tiktok" | "facebook"; label: string; url: string }[];

export type WaKey = "ma1" | "ma2" | "sn";

const fr = {
  nav: { home: "Accueil", services: "Services", portfolio: "Réalisations", about: "À propos", contact: "Contact", cta: "Parler de mon projet", menu: "Menu" },
  meta: {
    home: { title: "3S Solutions — Agence web à Dakar et Casablanca : sites, CRM et IA", desc: "Agence digitale : sites web, applications métier, CRM sur mesure, IA et automatisation pour les entreprises du Sénégal, du Maroc et d'Europe." },
    services: { title: "Services — Sites web, CRM et IA à Dakar et Casablanca | 3S Solutions", desc: "Sites web et e-commerce, applications métier et CRM sur mesure, IA et automatisation : découvrez les services de 3S Solutions." },
    portfolio: { title: "Réalisations — Projets web à Dakar et Casablanca | 3S Solutions", desc: "Découvrez des exemples de projets web réalisés par 3S Solutions au Sénégal et au Maroc." },
    about: { title: "Nazir Sall — Fondateur de 3S Solutions | Dakar & Casablanca", desc: "Découvrez Nazir Sall, fondateur de 3S Solutions : création de sites web, plateformes de réservation, CRM et automatisation pour le Sénégal, le Maroc et l’Europe." },
    contact: { title: "Contact — Agence web Dakar et Casablanca | 3S Solutions", desc: "Contactez 3S Solutions par WhatsApp ou e-mail pour votre site web, CRM ou projet d'automatisation IA." },
  },
  home: {
    location: "SÉNÉGAL · MAROC · EUROPE",
    title: "Sites web, CRM et IA pour faire grandir votre activité.",
    desc: "Nous créons des sites web professionnels, des outils métier et des automatisations utiles pour les entreprises et les particuliers au Sénégal, au Maroc et en Europe.",
    ctaContact: "Discutons de votre projet",
    ctaWa: "Nous écrire sur WhatsApp",
    servicesTitle: "Ce que nous pouvons construire ensemble",
    projectsTitle: "Des projets concrets",
    projectsDesc: "Découvrez deux sites en ligne auxquels nous avons contribué.",
    projectsCta: "Voir toutes les réalisations",
    supportedTitle: "Projets & collaborations",
    supportedCaption: "Quelques projets et plateformes auxquels nous avons contribué ou que nous accompagnons.",
    teamTitle: "Notre équipe",
    teamCaption: "Équipe 3S Solutions",
    teamPhotoPlaceholder: "Photo à ajouter",
    teamPhotoAltThierno: "Portrait de Thierno, membre de l’équipe 3S Solutions",
    teamPhotoAltAbdourahamane: "Portrait d’Abdourahamane, membre de l’équipe 3S Solutions",
    robotAlt: "Mascotte robot de 3S Solutions, symbole d’accompagnement numérique",
    robotLabel: "Assistant 3S Solutions",
    robotDesc: "Une première orientation pour trouver le service adapté à votre projet.",
    helpCta: "Besoin d’aide ?",
    commitmentsTitle: "Nos engagements",
    commitmentsIntro: "Un accompagnement clair, des échanges directs et des étapes définies tout au long de votre projet.",
    commitments: [
      { t: "Écoute avant tout", d: "Nous clarifions votre besoin avant de proposer une solution." },
      { t: "Étapes transparentes", d: "Les priorités et les fonctionnalités prévues sont expliquées ensemble." },
      { t: "Tests avant livraison", d: "Nous vérifions les fonctionnalités convenues avant de livrer." },
      { t: "Un contact direct", d: "Vous pouvez nous joindre par le formulaire de contact ou WhatsApp." },
    ],
    trustCtaTitle: "Votre projet. Notre point de départ.",
    trustCtaDesc: "Entreprises et particuliers : sites web, applications métier et CRM, automatisation IA. Clarifions ensemble votre besoin et les prochaines étapes.",
    audienceTitle: "Un accompagnement adapté à votre projet",
    businessTitle: "Pour les entreprises",
    businessDesc: "Attirez de nouveaux clients, présentez mieux votre activité et simplifiez vos opérations avec des outils adaptés à votre façon de travailler.",
    personalTitle: "Pour les particuliers",
    personalDesc: "Portfolio, CV en ligne ou site personnel : donnez une présentation professionnelle à votre projet et partagez-la facilement.",
    trustTitle: "Un échange direct. Des étapes claires.",
    trustDesc: "Nous clarifions votre besoin, les fonctionnalités prévues et les priorités avant de développer. Vous savez ce qui est inclus et où en est votre projet.",
    processTitle: "Notre méthode",
    steps: [
      { t: "Comprendre", d: "Nous analysons votre activité, vos objectifs et vos contraintes." },
      { t: "Concevoir", d: "Nous proposons une solution claire, adaptée à votre budget." },
      { t: "Développer et tester", d: "Nous construisons et vérifions chaque fonctionnalité." },
      { t: "Livrer et accompagner", d: "Nous mettons en ligne et restons disponibles après la livraison." },
    ],
    finalTitle: "Votre prochaine idée peut commencer ici.",
    finalDesc: "Parlez-nous de votre besoin. Nous étudierons avec vous la solution la plus adaptée.",
    finalCta: "Démarrer la discussion",
  },
  services: {
    title: "Nos services",
    intro: "Des solutions digitales concrètes, pensées pour répondre aux besoins réels de votre entreprise.",
    needLabel: "Le besoin",
    quote: "Demander un devis",
    personal: {
      eyebrow: "PARTICULIERS",
      title: "Offres pour les particuliers",
      intro: "Freelances, créateurs, chercheurs d'emploi ou porteurs de projet : obtenez une présence en ligne simple et professionnelle, à votre nom.",
      cta: "Demander un devis",
      items: [
        { t: "Portfolio", d: "Présentez vos travaux, projets et compétences sur une page claire, facile à partager avec vos clients ou recruteurs." },
        { t: "CV en ligne", d: "Une version moderne de votre CV, en ligne, avec votre parcours, vos compétences et un lien de contact direct." },
        { t: "Site personnel", d: "Un site pour votre projet personnel ou professionnel, votre activité de freelance ou vos contenus." },
      ],
    },
    items: [
      { t: "Sites web et e-commerce", short: "Sites vitrines, sites d'entreprise et boutiques en ligne.", need: "Être visible en ligne, inspirer confiance et permettre à vos clients de vous trouver ou d'acheter facilement.", d: "Nous créons des sites professionnels, des sites d'entreprise et des boutiques en ligne rapides, adaptés au mobile et faciles à faire évoluer." },
      { t: "Applications métier et CRM sur mesure", short: "Outils sur mesure pour organiser et piloter votre activité.", need: "Centraliser vos clients, vos ventes et vos opérations au lieu de jongler entre carnets, tableurs et messages.", d: "Nous développons des applications métier, des CRM et des outils internes adaptés à votre façon de travailler." },
      { t: "IA et automatisation", short: "Assistants IA, workflows WhatsApp et automatisations.", need: "Gagner du temps sur les tâches répétitives : réponses aux clients, relances, saisie et suivi.", d: "Nous concevons des assistants IA, des workflows WhatsApp, des automatisations d'e-mails et de processus métier, selon vos outils et vos besoins." },
    ],
  },
  portfolio: {
    title: "Réalisations",
    intro: "Découvrez deux sites en ligne qui illustrent notre travail : la réservation de logements et la beauté à Casablanca.",
    online: "Site en ligne",
    project: "Projet web",
    viewSite: "Voir le site",
    items: [
      { t: "K2B Booking — Réservation de logements", loc: "Casablanca, Maroc", d: "Site de réservation de studios et d'appartements, conçu pour présenter les logements et faciliter les demandes de réservation.", url: "https://k2bbooking.com/", brand: "K2B BOOKING", previewTitle: "Réservez votre séjour", previewSubtitle: "Studios · Appartements" },
      { t: "Teranga Beauty — Salon de beauté", loc: "Casablanca, Maroc", d: "Site professionnel présentant les prestations, la galerie du salon, les informations pratiques et la prise de rendez-vous.", url: "https://terangabeauty.net/", brand: "TERANGA BEAUTY", previewTitle: "Beauté & bien-être", previewSubtitle: "Coiffure · Soins · Rendez-vous" },
    ],
  },
  about: {
    title: "Des solutions digitales pensées pour votre activité.",
    p1: "3S Solutions est une agence digitale qui opère entre Dakar et Casablanca. Nous accompagnons à distance les entreprises du Sénégal, du Maroc et d'Europe.",
    p2: "Notre approche est simple : partir de vos besoins réels pour proposer des solutions pratiques, utiles au quotidien et faciles à prendre en main.",
    founder: {
      eyebrow: "LE FONDATEUR",
      name: "Nazir Sall",
      role: "Fondateur de 3S Solutions",
      intro: "J’accompagne les entreprises, les entrepreneurs et les particuliers au Sénégal, au Maroc et en Europe pour transformer leurs besoins en solutions digitales professionnelles.",
      p1: "Mon travail couvre la création de sites web, de plateformes de réservation, d’applications métier et de CRM, ainsi que l’automatisation de tâches répétitives avec des outils adaptés à chaque activité.",
      p2: "Des projets comme K2B Booking et Teranga Beauty illustrent mon approche : présenter une activité avec soin, faciliter le parcours des visiteurs et rendre la prise de contact plus simple.",
      trustTitle: "Une collaboration claire, du premier échange à la livraison",
      trustText: "Je privilégie une relation directe et transparente. Nous clarifions ensemble vos objectifs, les fonctionnalités prévues et les priorités avant d’avancer. Vous savez ce qui est prévu, où en est le projet et quelle est la prochaine étape.",
      imageAlt: "Portrait de Nazir Sall, fondateur de 3S Solutions",
      contactCta: "Parler de mon projet",
      portfolioCta: "Voir les réalisations",
    },
    valuesTitle: "Ma façon de travailler",
    values: [
      { t: "À l’écoute", d: "Comprendre votre besoin avant de proposer une solution." },
      { t: "Centré sur votre activité", d: "Des outils conçus pour répondre à un besoin concret." },
      { t: "Clair et transparent", d: "Des étapes expliquées, des échanges directs et des priorités définies." },
    ],
    cta: "Parler de mon projet",
  },
  contact: {
    title: "Parlons de votre projet.",
    intro: "Remplissez le formulaire : il ouvrira WhatsApp avec votre message prêt à envoyer.",
    name: "Nom", company: "Entreprise", optional: "(facultatif)", service: "Service souhaité", message: "Message", wa: "Ligne WhatsApp préférée",
    services: { website: "Site web", app: "Application / CRM", ai: "Automatisation IA", other: "Autre" },
    waOpts: { ma1: "Maroc — ligne 1", ma2: "Maroc — ligne 2", sn: "Sénégal" },
    submit: "Envoyer sur WhatsApp",
    errName: "Veuillez indiquer votre nom.",
    errMessage: "Veuillez écrire un message.",
    errForm: "Veuillez corriger les champs indiqués.",
    note: "WhatsApp s'ouvrira dans un nouvel onglet. Votre message sera envoyé uniquement lorsque vous l'enverrez vous-même.",
    details: "Coordonnées",
    waMsg: { hello: "Bonjour 3S Solutions,", name: "Nom", company: "Entreprise", service: "Service", message: "Message" },
  },
  footer: { tagline: "Agence digitale — Sénégal · Maroc · Europe", contact: "Contact", follow: "Suivez-nous", rights: "Tous droits réservés.", nav: "Navigation" },
  waDefault: "Bonjour 3S Solutions, je souhaite parler de mon projet.",
  assistant: {
    open: "Parler à 3S Solutions", close: "Fermer", title: "3S Solutions",
    q0: "Bonjour ! Vous nous contactez en tant qu'entreprise ou particulier ?", profiles: { business: "Entreprise", individual: "Particulier" },
    q1: "Que souhaitez-vous ?", q2: "Dans quel pays êtes-vous ?", q3: "Avec qui voulez-vous échanger ?",
    needs: { website: "Site web", app: "Application ou CRM", ai: "Automatisation IA", other: "Autre" },
    countries: { sn: "Sénégal", ma: "Maroc", eu: "Europe" },
    lines: { ma1: "Maroc ligne 1", ma2: "Maroc ligne 2", sn: "Sénégal" },
    summary: "Récapitulatif", profile: "Profil", need: "Besoin", country: "Pays", contact: "Contact WhatsApp",
    cont: "Continuer sur WhatsApp", restart: "Recommencer",
    error: "Veuillez compléter toutes les étapes avant de continuer.",
    msg: (p: string, n: string, c: string, l: string) => `Bonjour 3S Solutions ! Je suis : ${p}. Je souhaite discuter de : ${n}. Mon pays : ${c}. Contact choisi : ${l}.`,
  },
};

type Dict = typeof fr;

const en: Dict = {
  nav: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", contact: "Contact", cta: "Discuss my project", menu: "Menu" },
  meta: {
    home: { title: "3S Solutions — Web agency in Dakar & Casablanca: websites, CRM & AI", desc: "Digital agency: websites, business apps, custom CRM, AI and automation for businesses in Senegal, Morocco and Europe." },
    services: { title: "Services — Websites, CRM & AI in Dakar & Casablanca | 3S Solutions", desc: "Websites and e-commerce, custom business apps and CRM, AI and automation: explore 3S Solutions services." },
    portfolio: { title: "Portfolio — Web projects in Dakar & Casablanca | 3S Solutions", desc: "Explore examples of web projects by 3S Solutions in Senegal and Morocco." },
    about: { title: "Nazir Sall — Founder of 3S Solutions | Dakar & Casablanca", desc: "Meet Nazir Sall, founder of 3S Solutions, delivering websites, booking platforms, CRM tools and automation for Senegal, Morocco and Europe." },
    contact: { title: "Contact — Web agency Dakar & Casablanca | 3S Solutions", desc: "Contact 3S Solutions via WhatsApp or email for your website, CRM or AI automation project." },
  },
  home: {
    location: "SENEGAL · MOROCCO · EUROPE",
    title: "Websites, CRM and AI to move your business forward.",
    desc: "We build professional websites, business tools and practical automations for businesses and individuals in Senegal, Morocco and Europe.",
    ctaContact: "Let’s discuss your project",
    ctaWa: "Message us on WhatsApp",
    servicesTitle: "What we can build together",
    projectsTitle: "Real projects",
    projectsDesc: "Explore two live websites we have contributed to.",
    projectsCta: "View all projects",
    supportedTitle: "Projects & collaborations",
    supportedCaption: "A selection of projects and platforms we have contributed to or support.",
    teamTitle: "Our team",
    teamCaption: "3S Solutions team",
    teamPhotoPlaceholder: "Photo coming soon",
    teamPhotoAltThierno: "Portrait of Thierno, member of the 3S Solutions team",
    teamPhotoAltAbdourahamane: "Portrait of Abdourahamane, member of the 3S Solutions team",
    robotAlt: "3S Solutions robot mascot representing digital support",
    robotLabel: "3S Solutions assistant",
    robotDesc: "A first step to find the service that fits your project.",
    helpCta: "Need help?",
    commitmentsTitle: "Our commitments",
    commitmentsIntro: "Clear guidance, direct communication and defined steps throughout your project.",
    commitments: [
      { t: "Listen first", d: "We clarify your needs before recommending a solution." },
      { t: "Transparent steps", d: "We explain the agreed priorities and planned features together." },
      { t: "Testing before delivery", d: "We check the agreed features before handover." },
      { t: "Direct contact", d: "You can reach us through the contact form or WhatsApp." },
    ],
    trustCtaTitle: "Your project. Our starting point.",
    trustCtaDesc: "Businesses and individuals: websites, business apps and CRM, AI automation. Let’s clarify your needs and the next steps together.",
    audienceTitle: "Support tailored to your project",
    businessTitle: "For businesses",
    businessDesc: "Attract new customers, present your business clearly and simplify operations with tools built around the way you work.",
    personalTitle: "For individuals",
    personalDesc: "Portfolio, online CV or personal website: give your project a professional presence that is easy to share.",
    trustTitle: "Direct communication. Clear steps.",
    trustDesc: "We clarify your needs, planned features and priorities before development. You know what is included and where your project stands.",
    processTitle: "Our process",
    steps: [
      { t: "Understand", d: "We analyze your business, goals and constraints." },
      { t: "Design", d: "We propose a clear solution that fits your budget." },
      { t: "Build and test", d: "We build and check every feature." },
      { t: "Deliver and support", d: "We go live and stay available after delivery." },
    ],
    finalTitle: "Your next idea can start here.",
    finalDesc: "Tell us what you need. We’ll work with you to identify the right solution.",
    finalCta: "Start a conversation",
  },
  services: {
    title: "Our services",
    intro: "Practical digital solutions designed around the real needs of your business.",
    needLabel: "The need",
    quote: "Request a quote",
    personal: {
      eyebrow: "INDIVIDUALS",
      title: "Offers for individuals",
      intro: "Freelancers, creators, job seekers or project owners: get a simple, professional online presence of your own.",
      cta: "Ask for a quote",
      items: [
        { t: "Portfolio", d: "Show your work, projects and skills on a clear page that is easy to share with clients or recruiters." },
        { t: "Online CV", d: "A modern online version of your CV, with your experience, skills and a direct contact link." },
        { t: "Personal website", d: "A site for your personal or professional project, your activity as a freelancer or your content." },
      ],
    },
    items: [
      { t: "Websites and e-commerce", short: "Showcase sites, business websites and online stores.", need: "Be visible online, build trust and make it easy for customers to find you or buy from you.", d: "We build professional websites, business websites and online stores that are fast, mobile-friendly and easy to grow." },
      { t: "Custom business apps and CRM", short: "Tailored tools to organize and run your business.", need: "Centralize your customers, sales and operations instead of juggling notebooks, spreadsheets and messages.", d: "We develop business applications, CRM systems and internal tools adapted to the way you work." },
      { t: "AI and automation", short: "AI assistants, WhatsApp workflows and automations.", need: "Save time on repetitive tasks: customer replies, follow-ups, data entry and tracking.", d: "We design AI assistants, WhatsApp workflows, email automation and business process automation, based on your tools and needs." },
    ],
  },
  portfolio: {
    title: "Portfolio",
    intro: "Explore two live websites that showcase our work: property bookings and a beauty salon in Casablanca.",
    online: "Live website",
    project: "Web project",
    viewSite: "Visit website",
    items: [
      { t: "K2B Booking — Accommodation bookings", loc: "Casablanca, Morocco", d: "A booking website for studios and apartments, designed to present listings and help visitors request a reservation.", url: "https://k2bbooking.com/", brand: "K2B BOOKING", previewTitle: "Book your stay", previewSubtitle: "Studios · Apartments" },
      { t: "Teranga Beauty — Beauty salon", loc: "Casablanca, Morocco", d: "A professional salon website featuring services, a gallery, practical information, and appointment contact options.", url: "https://terangabeauty.net/", brand: "TERANGA BEAUTY", previewTitle: "Beauty & wellness", previewSubtitle: "Hair · Treatments · Appointments" },
    ],
  },
  about: {
    title: "Digital solutions designed for your business.",
    p1: "3S Solutions is a digital agency operating between Dakar and Casablanca. We work remotely with businesses in Senegal, Morocco and Europe.",
    p2: "Our approach is simple: start from your real needs to deliver practical solutions that are useful every day and easy to adopt.",
    founder: {
      eyebrow: "THE FOUNDER",
      name: "Nazir Sall",
      role: "Founder of 3S Solutions",
      intro: "I help businesses, entrepreneurs and individuals in Senegal, Morocco and Europe turn their needs into professional digital solutions.",
      p1: "My work includes websites, booking platforms, business applications and CRM systems, as well as automating repetitive tasks with tools suited to each business.",
      p2: "Projects such as K2B Booking and Teranga Beauty reflect my approach: present a business carefully, make the visitor journey clearer and simplify contacting the business.",
      trustTitle: "A clear collaboration, from the first conversation to delivery",
      trustText: "I believe in direct and transparent communication. We clarify your goals, the agreed features and priorities before moving forward. You know what is included, where the project stands and what comes next.",
      imageAlt: "Portrait of Nazir Sall, founder of 3S Solutions",
      contactCta: "Discuss my project",
      portfolioCta: "View our work",
    },
    valuesTitle: "How I work",
    values: [
      { t: "Listening first", d: "Understand your needs before recommending a solution." },
      { t: "Business-focused", d: "Tools designed to solve a concrete problem." },
      { t: "Clear and transparent", d: "Explained steps, direct communication and defined priorities." },
    ],
    cta: "Discuss my project",
  },
  contact: {
    title: "Let's talk about your project.",
    intro: "Fill in the form: it will open WhatsApp with your message ready to send.",
    name: "Name", company: "Company", optional: "(optional)", service: "Service needed", message: "Message", wa: "Preferred WhatsApp line",
    services: { website: "Website", app: "Application / CRM", ai: "AI automation", other: "Other" },
    waOpts: { ma1: "Morocco — line 1", ma2: "Morocco — line 2", sn: "Senegal" },
    submit: "Send via WhatsApp",
    errName: "Please enter your name.",
    errMessage: "Please write a message.",
    errForm: "Please fix the highlighted fields.",
    note: "WhatsApp will open in a new tab. Your message is only sent when you send it yourself.",
    details: "Contact details",
    waMsg: { hello: "Hello 3S Solutions,", name: "Name", company: "Company", service: "Service", message: "Message" },
  },
  footer: { tagline: "Digital agency — Senegal · Morocco · Europe", contact: "Contact", follow: "Follow us", rights: "All rights reserved.", nav: "Navigation" },
  waDefault: "Hello 3S Solutions, I'd like to discuss my project.",
  assistant: {
    open: "Talk to 3S Solutions", close: "Close", title: "3S Solutions",
    q0: "Hello! Are you contacting us as a business or as an individual?", profiles: { business: "Business", individual: "Individual" },
    q1: "What are you looking for?", q2: "Which country are you in?", q3: "Who would you like to talk to?",
    needs: { website: "Website", app: "Application or CRM", ai: "AI automation", other: "Other" },
    countries: { sn: "Senegal", ma: "Morocco", eu: "Europe" },
    lines: { ma1: "Morocco line 1", ma2: "Morocco line 2", sn: "Senegal" },
    summary: "Summary", profile: "Profile", need: "Need", country: "Country", contact: "WhatsApp contact",
    cont: "Continue on WhatsApp", restart: "Start over",
    error: "Please complete all steps before continuing.",
    msg: (p: string, n: string, c: string, l: string) => `Hello 3S Solutions! I am: ${p}. I'd like to discuss: ${n}. My country: ${c}. Chosen contact: ${l}.`,
  },
};

export const translations: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: "fr", setLang: () => {}, t: fr });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function usePageMeta(page: keyof Dict["meta"]) {
  const { t } = useLang();
  useEffect(() => {
    const m = t.meta[page];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", m.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", m.desc);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", m.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", m.desc);
  }, [t, page]);
}

export const SITE_URL = "https://3solutions.3ssolutions.workers.dev";

const PAGE_PATHS: Record<keyof Dict["meta"], string> = {
  home: "/",
  services: "/services",
  portfolio: "/realisations",
  about: "/a-propos",
  contact: "/contact",
};

export function pageHead(page: keyof Dict["meta"]) {
  const m = fr.meta[page];
  const url = `${SITE_URL}${PAGE_PATHS[page]}`;
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.desc },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: m.title },
      { name: "twitter:description", content: m.desc },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function buildWhatsAppUrl(
  wa: WaKey,
  d: { name: string; company: string; service: string; message: string },
  lang: Lang,
) {
  const m = translations[lang].contact.waMsg;
  const lines = [m.hello, "", `${m.name}: ${d.name}`];
  if (d.company) lines.push(`${m.company}: ${d.company}`);
  lines.push(`${m.service}: ${d.service}`, "", `${m.message}: ${d.message}`);
  return `https://wa.me/${CONTACTS[wa].number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
