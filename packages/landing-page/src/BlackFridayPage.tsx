import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, MapPin, Menu, MessageCircle, X } from "lucide-react";
import type { SleepHouseRegion } from "./SleepHouse";
import "./black-friday.css";
import "./black-friday-cursor.css";

type ConversionMode = "form" | "whatsapp";
type Offer = { id: string; name: string; description: string; cash: string; installments: string; images: string[] };

const offers: Offer[] = [
  { id: "perfect-sleep", name: "Perfect Sleep 1,38", description: "Seu descanso merece um upgrade. Conheça o Perfect Sleep 1,38 e aproveite a condição especial da Black dos Sonhos.", cash: "R$ 7.150,00", installments: "12x de R$ 715,00", images: ["/black-friday/perfect-sleep-1-38.webp", "/black-friday/perfect-sleep-1-38-ambientado.webp"] },
  { id: "linen-firm", name: "Linen Firm Casal", description: "Um convite para renovar suas noites de descanso. Aproveite a oferta especial do Linen Firm Casal nesta Black Friday.", cash: "R$ 2.922,10", installments: "12x de R$ 292,00", images: ["/black-friday/linen-firm-casal-produto.webp", "/black-friday/linen-firm-casal-ambientado.webp"] },
  { id: "kansas-bau", name: "Kansas + Baú", description: "Mais praticidade para o quarto e uma nova experiência de descanso. Conheça a condição especial do conjunto Kansas + Baú.", cash: "R$ 3.199,00", installments: "12x de R$ 319,00", images: ["/black-friday/kansas-bau-produto.webp", "/black-friday/kansas-bau-ambientado.webp"] },
  { id: "arizona-base", name: "Arizona 1,58 + Base", description: "Renove seu quarto com um conjunto pensado para seus momentos de descanso. Aproveite a oferta especial do Arizona 1,58 + Base.", cash: "R$ 3.610,00", installments: "12x de R$ 360,00", images: ["/black-friday/arizona-1-58-base-produto.webp", "/black-friday/arizona-1-58-base-ambientado.webp"] },
];

const brands = [
  { name: "Tempur", image: "/brand/optimized/tempur.webp" },
  { name: "Pikolin", image: "/brand/optimized/pikolin-oficial.webp", light: true },
  { name: "Stearns & Foster", image: "/brand/optimized/stearns-foster.webp" },
  { name: "American Sleep", image: "/brand/optimized/logo-american.webp" },
];

const testimonials = [
  { author: "Monique Quin", quote: "A Sandra me atendeu com muita paciência e me ajudou a achar o modelo certo para minha necessidade. Produto de qualidade, adoramos!" },
  { author: "Michele Turci", quote: "Atendimento excelente e produtos de qualidade. Me explicaram tudo em detalhes e deram ótimas sugestões. Entrega rápida e perfeita!" },
  { author: "Marcelo P.", quote: "Excelente loja, bom atendimento, entrega rápida, super recomendo. Estou amando meu colchão novo." },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.44-1.35c1.38.72 2.94 1.14 4.6 1.14h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.9 14.02c-.25.7-1.45 1.34-1.99 1.42-.51.08-1.15.11-1.86-.12-.42-.14-.96-.32-1.65-.62-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.4.27-.28.58-.35.78-.35.2 0 .39.002.56.01.18.008.42-.07.66.5.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.54-.15.15-.3.32-.13.62.17.3.78 1.3 1.68 2.1 1.16 1.03 2.13 1.36 2.44 1.51.31.15.49.13.68-.07.19-.2.79-.9.99-1.21.2-.31.4-.26.66-.16.27.1 1.7.8 1.99.94.29.15.48.22.55.35.07.13.07.72-.18 1.41Z" />
  </svg>
);

const trackedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function formHref(product?: string): string {
  const params = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();
  trackedKeys.forEach((key) => { const value = params.get(key); if (value) forwarded.set(key, value); });
  if (product) forwarded.set("oferta", product);
  forwarded.set("black_friday", "1");
  const query = forwarded.toString();
  return `/formulario/etapas${query ? `?${query}` : ""}`;
}

function MediaSlider({ images, label, className = "" }: { images: string[]; label: string; className?: string }) {
  return <div className={`bf-media bf-media-slider ${className}`}>{images.map((src, index) => <img key={src} className="bf-media-slide" src={src} alt={index === 0 ? label : ""} aria-hidden={index > 0} loading="lazy" />)}</div>;
}

export default function BlackFridayPage({ region, conversionMode }: { region: SleepHouseRegion; conversionMode: ConversionMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [openLocation, setOpenLocation] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLSpanElement>(null);
  const cursorRingRef = useRef<HTMLSpanElement>(null);
  const isWhatsapp = conversionMode === "whatsapp";
  const locations = region.whatsappLocations ?? [{ label: region.label, phone: region.whatsapp }];

  useEffect(() => {
    const oldTitle = document.title;
    const title = `Black dos Sonhos | Sleep House ${region.label}`;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const oldDescription = metaDescription?.content;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const oldCanonical = canonical?.href;
    document.title = title;
    metaDescription?.setAttribute("content", "Black dos Sonhos Sleep House: confira ofertas especiais em colchões e conjuntos selecionados.");
    canonical?.setAttribute("href", new URL(isWhatsapp ? "/black-friday-whatsapp/" : "/black-friday/", region.domain).href);
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event: "landing_version_view", region: region.key, form_version: isWhatsapp ? "whatsapp" : "formulario" });
    return () => {
      document.title = oldTitle;
      if (oldDescription !== undefined) metaDescription?.setAttribute("content", oldDescription);
      if (oldCanonical) canonical?.setAttribute("href", oldCanonical);
    };
  }, [isWhatsapp, region]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!finePointer || reducedMotion || !dot || !ring) return;

    let targetX = -100; let targetY = -100; let dotX = -100; let dotY = -100; let ringX = -100; let ringY = -100; let frame = 0;
    const move = (event: PointerEvent) => {
      targetX = event.clientX; targetY = event.clientY;
      document.documentElement.toggleAttribute("data-cursor-interactive", Boolean((event.target as HTMLElement).closest("a, button, input, textarea, select, [role='button']")));
    };
    const leave = () => { targetX = -100; targetY = -100; };
    const render = () => {
      dotX += (targetX - dotX) * 0.34; dotY += (targetY - dotY) * 0.34;
      ringX += (targetX - ringX) * 0.12; ringY += (targetY - ringY) * 0.12;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = window.requestAnimationFrame(render);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeAttribute("data-cursor-interactive");
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    const startMotion = () => {
      window.removeEventListener("scroll", startMotion);
      window.removeEventListener("pointerdown", startMotion);
      window.removeEventListener("keydown", startMotion);
      void (async () => {
        const root = pageRef.current;
        if (!root) return;
        const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]);
        if (cancelled) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        const Lenis = lenisModule.default;
        gsap.registerPlugin(ScrollTrigger);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const lenis = reducedMotion ? null : new Lenis({ duration: 1, smoothWheel: true, allowNestedScroll: false });
        let raf = 0;
        if (lenis) {
          const tick = (time: number) => { lenis.raf(time); raf = window.requestAnimationFrame(tick); };
          lenis.on("scroll", ScrollTrigger.update);
          raf = window.requestAnimationFrame(tick);
        }

        const onAnchorClick = (event: MouseEvent) => {
          const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
          const href = anchor?.getAttribute("href");
          if (!href) return;
          const target = root.querySelector<HTMLElement>(href);
          if (!target) return;
          event.preventDefault();
          if (lenis) lenis.scrollTo(target, { offset: -24 });
          else target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", href);
        };
        document.addEventListener("click", onAnchorClick);

        const context = gsap.context(() => {
          if (reducedMotion) return;
          gsap.fromTo(root.querySelector(".bf-hero-text"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" });
          gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".bf-reveal")).forEach((element) => {
            gsap.fromTo(element, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
          });
          gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".bf-reveal-stagger")).forEach((container) => {
            gsap.fromTo(Array.from(container.children), { opacity: 0, y: 18, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.68, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 87%", once: true } });
          });
          gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".bf-parallax")).forEach((element) => {
            gsap.fromTo(element, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: element.parentElement ?? element, start: "top bottom", end: "bottom top", scrub: 0.45 } });
          });
          if (finePointer) {
            root.querySelectorAll<HTMLElement>(".bf-brand, .bf-offer-card, .bf-testimonial").forEach((card) => {
              const xTo = gsap.quickTo(card, "x", { duration: 0.38, ease: "power3.out" });
              const yTo = gsap.quickTo(card, "y", { duration: 0.38, ease: "power3.out" });
              const rotateTo = gsap.quickTo(card, "rotation", { duration: 0.38, ease: "power3.out" });
              const move = (event: PointerEvent) => {
                const bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                xTo(x * 7); yTo(y * 7); rotateTo(x * 0.65);
              };
              const leave = () => { xTo(0); yTo(0); rotateTo(0); };
              card.addEventListener("pointermove", move); card.addEventListener("pointerleave", leave);
              gsap.set(card, { transformPerspective: 900 });
              ScrollTrigger.addEventListener("refreshInit", leave);
              const oldCleanup = cleanup;
              cleanup = () => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); ScrollTrigger.removeEventListener("refreshInit", leave); oldCleanup(); };
            });
          }
        }, root);
        ScrollTrigger.refresh();
        const baseCleanup = cleanup;
        cleanup = () => { document.removeEventListener("click", onAnchorClick); if (raf) window.cancelAnimationFrame(raf); lenis?.off("scroll", ScrollTrigger.update); lenis?.destroy(); context.revert(); ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); baseCleanup(); };
      })();
    };
    window.addEventListener("scroll", startMotion, { passive: true, once: true });
    window.addEventListener("pointerdown", startMotion, { passive: true, once: true });
    window.addEventListener("keydown", startMotion, { once: true });
    return () => { cancelled = true; window.removeEventListener("scroll", startMotion); window.removeEventListener("pointerdown", startMotion); window.removeEventListener("keydown", startMotion); cleanup(); };
  }, []);

  const openConversion = (product?: string) => {
    if (!isWhatsapp) { window.location.assign(formHref(product)); return; }
    setSelectedOffer(product ?? null);
    setOpenLocation(true);
  };

  const destination = (phone: string, location: string) => {
    const message = selectedOffer
      ? `Olá! Vi a oferta do ${selectedOffer} na Black dos Sonhos da Sleep House e gostaria de saber mais sobre as condições da promoção.`
      : "Olá! Estou interessado nas ofertas da Black dos Sonhos da Sleep House e gostaria de falar com um consultor.";
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const clickWhatsapp = (location: string) => {
    (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({ event: "whatsapp_click", region: region.key, whatsapp_location: location, form_version: "whatsapp" });
    setOpenLocation(false);
  };

  return (
    <div className={openLocation ? "bf-page bf-page--modal-open" : "bf-page"} id="topo" ref={pageRef}>
      <div className="bf-announcement">BLACK DOS SONHOS <span>✦</span> SLEEP HOUSE <span>✦</span> OFERTAS ESPECIAIS</div>
      <header className="bf-header">
        <a className="bf-logo" href="#topo" aria-label="Sleep House - voltar ao início"><img src="/brand/sleep-house/logo.svg" alt="Sleep House" /></a>
        <nav className={menuOpen ? "bf-nav bf-nav--open" : "bf-nav"} aria-label="Navegação da campanha">
          <a href="#marcas" onClick={() => setMenuOpen(false)}>Marcas</a>
          <a href="#ofertas" onClick={() => setMenuOpen(false)}>Ofertas</a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>Depoimentos</a>
        </nav>
        <button className="bf-header-cta" onClick={() => openConversion()}>{isWhatsapp ? "Falar no WhatsApp" : "Quero aproveitar"} <ArrowUpRight size={17}/></button>
        <button className="bf-menu-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="bf-hero" aria-labelledby="bf-hero-title">
          <div className="bf-hero-text">
            <span className="bf-kicker"><span className="bf-gold-dot"/> BLACK DOS SONHOS — SLEEP HOUSE</span>
            <h1 id="bf-hero-title">O colchão dos seus <em>sonhos</em> com ofertas especiais de <span>Black Friday.</span></h1>
            <p>Chegou a Black dos Sonhos da Sleep House! Aproveite condições especiais em colchões e conjuntos selecionados para transformar suas noites de descanso.</p>
            <div className="bf-hero-buttons">
              <button className="bf-button bf-button-gold" onClick={() => openConversion()}>{isWhatsapp ? "Falar com um consultor" : "Quero aproveitar as ofertas"}<ArrowUpRight size={19}/></button>
              <a className="bf-button bf-button-outline" href="#ofertas">Conferir ofertas <ArrowRight size={18}/></a>
            </div>
            <span className="bf-hero-caption"><Check size={16}/> Qualidade e atendimento especializado para ajudar na sua escolha.</span>
          </div>
        </section>

        <section id="marcas" className="bf-brands bf-section bf-reveal" aria-labelledby="bf-brands-title">
          <div className="bf-container">
            <div className="bf-section-intro"><span className="bf-eyebrow">GRANDES MARCAS, GRANDES SONHOS</span><h2 id="bf-brands-title">As melhores marcas para suas <em>melhores noites.</em></h2><p>Na Sleep House, você encontra marcas reconhecidas por seu conforto, qualidade e tecnologia, com atendimento especializado para ajudar na sua escolha.</p></div>
            <div className="bf-brand-grid bf-reveal-stagger">{brands.map(brand => <div className="bf-brand" key={brand.name}><img className={brand.light ? "bf-brand-logo--light" : undefined} src={brand.image} alt={brand.name}/></div>)}</div>
          </div>
        </section>

        <section id="ofertas" className="bf-offers bf-section bf-reveal" aria-labelledby="bf-offers-title">
          <div className="bf-container">
            <div className="bf-section-intro"><span className="bf-eyebrow">✦ OFERTAS BLACK DOS SONHOS ✦</span><h2 id="bf-offers-title">Seu próximo colchão <em>pode estar aqui.</em></h2><p>Selecionamos quatro ofertas especiais para você renovar seu descanso com condições de Black Friday. Escolha seu produto e fale com nossa equipe para conferir todos os detalhes.</p></div>
            <div className="bf-offer-grid bf-reveal-stagger">{offers.map((offer, index) => (
              <article className="bf-offer-card" key={offer.id}>
                <div className="bf-offer-image"><span className="bf-offer-index">OFERTA {String(index + 1).padStart(2, "0")}</span><MediaSlider images={offer.images} label={offer.name} className="bf-parallax"/></div>
                <div className="bf-offer-details"><span className="bf-card-label">BLACK DOS SONHOS</span><h3>{offer.name}</h3><p>{offer.description}</p>
                  <div className="bf-pricing"><span>VALOR À VISTA</span><strong>{offer.cash}</strong><div className="bf-installments">OU <b>{offer.installments}</b></div></div>
                  <button className="bf-button bf-button-gold bf-offer-button" onClick={() => openConversion(offer.name)}>{isWhatsapp ? `Consultar ${offer.name}` : "Quero essa oferta"}<ArrowUpRight size={19}/></button>
                </div>
              </article>))}</div>
            <p className="bf-legal">* Ofertas sujeitas à disponibilidade de estoque e às condições comerciais da campanha. Consulte nossa equipe para mais informações.</p>
          </div>
        </section>

        <section id="depoimentos" className="bf-testimonials bf-section bf-reveal"><div className="bf-container"><div className="bf-section-intro"><span className="bf-eyebrow">QUEM CONHECE, RECOMENDA</span><h2>Boas noites começam com <em>boas escolhas.</em></h2><p>Conheça a experiência de quem já escolheu a Sleep House.</p></div><div className="bf-testimonial-grid bf-reveal-stagger">{testimonials.map(t => <blockquote key={t.author} className="bf-testimonial"><span className="bf-stars" aria-label="5 estrelas">★★★★★</span><p>“{t.quote}”</p><cite>{t.author}</cite></blockquote>)}</div></div></section>

        <section className="bf-end-cta bf-section bf-reveal" id="contato"><div className="bf-container bf-end-inner"><span className="bf-eyebrow">BLACK DOS SONHOS | SLEEP HOUSE</span><h2>Seu novo descanso começa com uma <em>boa oportunidade.</em></h2><p>Não deixe de conhecer as condições especiais da Black dos Sonhos. Nossa equipe está pronta para ajudar você a escolher a melhor opção e conferir as ofertas disponíveis.</p><button className="bf-button bf-button-gold" onClick={() => openConversion()}>{isWhatsapp ? "Falar com um consultor agora" : "Quero receber atendimento"}<ArrowUpRight size={20}/></button><small>Atendimento Sleep House para {region.label}.</small></div></section>
      </main>

      <footer className="bf-footer"><div className="bf-container bf-footer-inner"><div className="bf-footer-about"><img src="/brand/sleep-house/logo.svg" alt="Sleep House"/><p>Seu descanso merece cuidado, qualidade e uma escolha que faça sentido para você.</p></div><div className="bf-footer-links"><strong>Navegação</strong><a href="#topo">Início</a><a href="#marcas">Marcas</a><a href="#ofertas">Ofertas Black Friday</a><a href="#contato">Atendimento</a></div><div className="bf-footer-stores"><strong>Nossas lojas</strong>{region.stores.map(s => <span key={s.address}><MapPin size={14}/>{s.name} — {s.address}</span>)}</div></div><div className="bf-footer-bottom">Sleep House · Black dos Sonhos</div></footer>

      {isWhatsapp && <button className="bf-floating-whatsapp" aria-label="Atendimento WhatsApp" onClick={() => openConversion()}><WhatsAppIcon /></button>}
      {openLocation && isWhatsapp && <div className="bf-modal-overlay" onClick={() => setOpenLocation(false)}><div className="bf-modal" role="dialog" aria-modal="true" aria-label="Escolha a unidade" onClick={(e) => e.stopPropagation()}><button className="bf-modal-close" aria-label="Fechar" onClick={() => setOpenLocation(false)}><X size={21}/></button><span className="bf-eyebrow">ATENDIMENTO SLEEP HOUSE</span><h2>Escolha a sua unidade</h2><p>{selectedOffer ? `Você selecionou ${selectedOffer}.` : "Vamos ajudar você a aproveitar a Black dos Sonhos."} Com qual unidade deseja falar?</p><div className="bf-location-options">{locations.map(location => <a key={location.phone} href={destination(location.phone, location.label)} target="_blank" rel="noreferrer" onClick={() => clickWhatsapp(location.label)}><MessageCircle size={20}/> {location.label} <ArrowUpRight size={18}/></a>)}</div></div></div>}
      <div className="custom-cursor bf-custom-cursor" aria-hidden="true"><span ref={cursorDotRef} className="custom-cursor-dot" /><span ref={cursorRingRef} className="custom-cursor-ring" /></div>
    </div>
  );
}
