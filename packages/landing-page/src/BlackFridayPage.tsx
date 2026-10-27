import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, MapPin, Menu, MessageCircle, X } from "lucide-react";
import type { SleepHouseRegion } from "./SleepHouse";
import "./black-friday.css";

type ConversionMode = "form" | "whatsapp";
type Offer = { id: string; name: string; description: string; cash: string; installments: string; image: string };

const offers: Offer[] = [
  { id: "perfect-sleep", name: "Perfect Sleep 1,38", description: "Seu descanso merece um upgrade. Conheça o Perfect Sleep 1,38 e aproveite a condição especial da Black dos Sonhos.", cash: "R$ 7.150,00", installments: "12x de R$ 715,00", image: "/black-friday/perfect-sleep.webp" },
  { id: "linen-firm", name: "Linen Firm Casal", description: "Um convite para renovar suas noites de descanso. Aproveite a oferta especial do Linen Firm Casal nesta Black Friday.", cash: "R$ 2.922,10", installments: "12x de R$ 292,00", image: "/black-friday/linen-firm.webp" },
  { id: "kansas-bau", name: "Kansas + Baú", description: "Mais praticidade para o quarto e uma nova experiência de descanso. Conheça a condição especial do conjunto Kansas + Baú.", cash: "R$ 3.199,00", installments: "12x de R$ 319,00", image: "/black-friday/kansas-bau.webp" },
  { id: "arizona-base", name: "Arizona 1,58 + Base", description: "Renove seu quarto com um conjunto pensado para seus momentos de descanso. Aproveite a oferta especial do Arizona 1,58 + Base.", cash: "R$ 3.610,00", installments: "12x de R$ 360,00", image: "/black-friday/arizona-base.webp" },
];

const brands = [
  { name: "Tempur", image: "/brand/optimized/tempur.webp" },
  { name: "Pikolin", image: "/brand/optimized/pikolin.webp" },
  { name: "Stearns & Foster", image: "/brand/optimized/stearns-foster.webp" },
  { name: "American Sleep", image: "/brand/optimized/logo-american.webp" },
];

const testimonials = [
  { author: "Monique Quin", quote: "A Sandra me atendeu com muita paciência e me ajudou a achar o modelo certo para minha necessidade. Produto de qualidade, adoramos!" },
  { author: "Michele Turci", quote: "Atendimento excelente e produtos de qualidade. Me explicaram tudo em detalhes e deram ótimas sugestões. Entrega rápida e perfeita!" },
  { author: "Marcelo P.", quote: "Excelente loja, bom atendimento, entrega rápida, super recomendo. Estou amando meu colchão novo." },
];

const trackedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function formHref(product?: string): string {
  const params = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();
  trackedKeys.forEach((key) => { const value = params.get(key); if (value) forwarded.set(key, value); });
  if (product) forwarded.set("oferta", product);
  const query = forwarded.toString();
  return `/formulario/etapas${query ? `?${query}` : ""}`;
}

function MediaPlaceholder({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`bf-media ${className}`}>
      {!missing ? <img src={src} alt={label} loading="lazy" onError={() => setMissing(true)} /> : null}
      {missing ? <div className="bf-media-placeholder"><span>BLACK DOS SONHOS</span><strong>IMAGEM EM PREPARAÇÃO</strong><small>{label}</small></div> : null}
    </div>
  );
}

export default function BlackFridayPage({ region, conversionMode }: { region: SleepHouseRegion; conversionMode: ConversionMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [openLocation, setOpenLocation] = useState(false);
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
    <div className="bf-page" id="topo">
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
          <div className="bf-hero-visual">
            <picture>
              <source media="(max-width: 700px)" srcSet="/black-friday/hero-mobile.webp" />
              <img src="/black-friday/hero-desktop.webp" alt="Banner oficial da campanha Black dos Sonhos — espaço reservado" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </picture>
            <div className="bf-hero-visual-fallback"><span>BLACK <i>DOS</i></span><strong>SONHOS</strong><div className="bf-gold-line"/><small>ESPAÇO RESERVADO PARA O BANNER OFICIAL DA CAMPANHA</small></div>
            <div className="bf-hero-visual-tag">SLEEP HOUSE <span>✦</span> BLACK FRIDAY</div>
          </div>
          <a className="bf-scroll-link" href="#marcas">CONHEÇA A CAMPANHA <ChevronDown size={16}/></a>
        </section>

        <section id="marcas" className="bf-brands bf-section" aria-labelledby="bf-brands-title">
          <div className="bf-container">
            <div className="bf-section-intro"><span className="bf-eyebrow">GRANDES MARCAS, GRANDES SONHOS</span><h2 id="bf-brands-title">As melhores marcas para suas <em>melhores noites.</em></h2><p>Na Sleep House, você encontra marcas reconhecidas por seu conforto, qualidade e tecnologia, com atendimento especializado para ajudar na sua escolha.</p></div>
            <div className="bf-brand-grid">{brands.map(brand => <div className="bf-brand" key={brand.name}><img src={brand.image} alt={brand.name}/></div>)}</div>
          </div>
        </section>

        <section id="ofertas" className="bf-offers bf-section" aria-labelledby="bf-offers-title">
          <div className="bf-container">
            <div className="bf-section-intro"><span className="bf-eyebrow">✦ OFERTAS BLACK DOS SONHOS ✦</span><h2 id="bf-offers-title">Seu próximo colchão <em>pode estar aqui.</em></h2><p>Selecionamos quatro ofertas especiais para você renovar seu descanso com condições de Black Friday. Escolha seu produto e fale com nossa equipe para conferir todos os detalhes.</p></div>
            <div className="bf-offer-grid">{offers.map((offer, index) => (
              <article className="bf-offer-card" key={offer.id}>
                <div className="bf-offer-image"><span className="bf-offer-index">OFERTA {String(index + 1).padStart(2, "0")}</span><MediaPlaceholder src={offer.image} label={offer.name}/></div>
                <div className="bf-offer-details"><span className="bf-card-label">BLACK DOS SONHOS</span><h3>{offer.name}</h3><p>{offer.description}</p>
                  <div className="bf-pricing"><span>VALOR À VISTA</span><strong>{offer.cash}</strong><div className="bf-installments">OU <b>{offer.installments}</b></div></div>
                  <button className="bf-button bf-button-gold bf-offer-button" onClick={() => openConversion(offer.name)}>{isWhatsapp ? `Consultar ${offer.name}` : "Quero essa oferta"}<ArrowUpRight size={19}/></button>
                </div>
              </article>))}</div>
            <p className="bf-legal">* Ofertas sujeitas à disponibilidade de estoque e às condições comerciais da campanha. Consulte nossa equipe para mais informações.</p>
          </div>
        </section>

        <section id="depoimentos" className="bf-testimonials bf-section"><div className="bf-container"><div className="bf-section-intro"><span className="bf-eyebrow">QUEM CONHECE, RECOMENDA</span><h2>Boas noites começam com <em>boas escolhas.</em></h2><p>Conheça a experiência de quem já escolheu a Sleep House.</p></div><div className="bf-testimonial-grid">{testimonials.map(t => <blockquote key={t.author} className="bf-testimonial"><span className="bf-stars" aria-label="5 estrelas">★★★★★</span><p>“{t.quote}”</p><cite>{t.author}</cite></blockquote>)}</div></div></section>

        <section className="bf-end-cta bf-section" id="contato"><div className="bf-container bf-end-inner"><span className="bf-eyebrow">BLACK DOS SONHOS | SLEEP HOUSE</span><h2>Seu novo descanso começa com uma <em>boa oportunidade.</em></h2><p>Não deixe de conhecer as condições especiais da Black dos Sonhos. Nossa equipe está pronta para ajudar você a escolher a melhor opção e conferir as ofertas disponíveis.</p><button className="bf-button bf-button-gold" onClick={() => openConversion()}>{isWhatsapp ? "Falar com um consultor agora" : "Quero receber atendimento"}<ArrowUpRight size={20}/></button><small>Atendimento Sleep House para {region.label}.</small></div></section>
      </main>

      <footer className="bf-footer"><div className="bf-container bf-footer-inner"><div className="bf-footer-about"><img src="/brand/sleep-house/logo.svg" alt="Sleep House"/><p>Seu descanso merece cuidado, qualidade e uma escolha que faça sentido para você.</p></div><div className="bf-footer-links"><strong>Navegação</strong><a href="#topo">Início</a><a href="#marcas">Marcas</a><a href="#ofertas">Ofertas Black Friday</a><a href="#contato">Atendimento</a></div><div className="bf-footer-stores"><strong>Nossas lojas</strong>{region.stores.map(s => <span key={s.address}><MapPin size={14}/>{s.name} — {s.address}</span>)}</div></div><div className="bf-footer-bottom">Sleep House · Black dos Sonhos</div></footer>

      {isWhatsapp && <button className="bf-floating-whatsapp" aria-label="Atendimento WhatsApp" onClick={() => openConversion()}><MessageCircle size={24}/></button>}
      {openLocation && isWhatsapp && <div className="bf-modal-overlay" onClick={() => setOpenLocation(false)}><div className="bf-modal" role="dialog" aria-modal="true" aria-label="Escolha a unidade" onClick={(e) => e.stopPropagation()}><button className="bf-modal-close" aria-label="Fechar" onClick={() => setOpenLocation(false)}><X size={21}/></button><span className="bf-eyebrow">ATENDIMENTO SLEEP HOUSE</span><h2>Escolha a sua unidade</h2><p>{selectedOffer ? `Você selecionou ${selectedOffer}.` : "Vamos ajudar você a aproveitar a Black dos Sonhos."} Com qual unidade deseja falar?</p><div className="bf-location-options">{locations.map(location => <a key={location.phone} href={destination(location.phone, location.label)} target="_blank" rel="noreferrer" onClick={() => clickWhatsapp(location.label)}><MessageCircle size={20}/> {location.label} <ArrowUpRight size={18}/></a>)}</div></div></div>}
    </div>
  );
}
