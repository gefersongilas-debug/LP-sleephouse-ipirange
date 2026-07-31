"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BedDouble,
  CalendarClock,
  CreditCard,
  Hotel,
  MapPin,
  Menu,
  MessageCircle,
  ScanSearch,
  Sparkles,
  Store,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const MOTION = {
  ease: "power3.out",
  easeCss: "cubic-bezier(0.22, 1, 0.36, 1)",
  parallax: {
    hero: 0.22,
    narrative: 0.18,
    card: 0.18,
  },
};

const brands = [
  {
    name: "Tempur",
    slug: "tempur",
    logo: "https://claims.tempur.com/static/tempur.png",
    image: "/images/sleep-house/produto-tempur.jpg",
    description: "A mesma tecnologia usada pela NASA",
  },
  {
    name: "Pikolin",
    slug: "pikolin",
    logo: "https://www.pikolin.com/media/logo/stores/1/LOGO_TRANSPARENTE_PIKOLIN.png",
    image: "/images/sleep-house/produto-pikolin.jpg",
    description: "Referência de descanso na Europa",
  },
  {
    name: "Stearns & Foster",
    slug: "stearns-foster",
    logo: "https://register.stearnsandfoster.com/assets/images/sf-logo-horizontal.png",
    image: "/images/sleep-house/produto-stearnsfoster.jpg",
    description: "Luxo americano, autêntico",
  },
  {
    name: "American Sleep",
    slug: "american-sleep",
    logo: "/brand/logo-american.png",
    image: "/images/sleep-house/produto-americansleep.jpg",
    description: "Conforto premium a um preço justo",
  },
];

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Menor valor do mercado",
    description: "As mesmas marcas de lojas exclusivas, com preço de multimarca — sem perder qualidade.",
  },
  {
    icon: MessageCircle,
    title: "Consultoria de verdade",
    description: "Consultores treinados para indicar o colchão certo para seu biotipo e sua necessidade.",
  },
  {
    icon: Truck,
    title: "Entrega no mesmo dia",
    description: "Entrega express para Ipiranga, Vila Mariana, Paraíso e região, conforme disponibilidade.",
  },
  {
    icon: Wrench,
    title: "Montagem gratuita",
    description: "Nossa equipe monta tudo na sua casa, sem custo adicional e sem complicação.",
  },
  {
    icon: CreditCard,
    title: "12x sem juros",
    description: "Parcele no cartão sem pagar nada a mais e escolha pelo conforto certo.",
  },
  {
    icon: Store,
    title: "Loja física, sem letra miúda",
    description: "Você vê, sente e testa o colchão antes de decidir — sem surpresa na entrega.",
  },
];

const offers = [
  {
    badge: "Tecnologia NASA",
    brand: "Tempur",
    name: "Linha Tempur Adaptável",
    image: "/images/sleep-house/produto-tempur.jpg",
    description: "Espuma viscoelástica que se molda ao seu corpo — indicada para quem sente dor nas costas ao acordar.",
    priceLabel: "a partir de",
    price: "12x R$ 249,90",
    message: "Oi! Vi a oferta da linha Tempur no site e quero saber mais.",
  },
  {
    badge: "Mais procurado",
    brand: "American Sleep",
    name: "Linha Denver Firm",
    image: "/images/sleep-house/produto-americansleep.jpg",
    description: "Equilíbrio entre firmeza e conforto — a linha de entrada premium mais vendida da loja.",
    priceLabel: "a partir de",
    price: "12x R$ 189,90",
    message: "Oi! Vi a oferta da linha American Sleep Denver no site e quero saber mais.",
  },
  {
    badge: "40% off",
    brand: "Pikolin",
    name: "Linha Perfect Sleep",
    image: "/images/sleep-house/produto-pikolin.jpg",
    description: "A linha europeia mais desejada da loja, com desconto especial neste mês.",
    priceLabel: "Casal",
    price: "40% OFF",
    message: "Oi! Vi o desconto da linha Pikolin Perfect Sleep e quero aproveitar.",
  },
];

const signs = [
  {
    icon: CalendarClock,
    title: "Já se passaram 10 anos",
    description: "Esse é o ciclo médio de vida útil de um colchão.",
  },
  {
    icon: BedDouble,
    title: "Dor ao acordar",
    description: "Você sente dor lombar ou no pescoço, mesmo depois de dormir a noite toda.",
  },
  {
    icon: ScanSearch,
    title: "Marcas visíveis",
    description: "O colchão afundou ou ficou marcado no formato do corpo.",
  },
  {
    icon: Hotel,
    title: "Você dorme melhor fora de casa",
    description: "Hotéis e outras camas parecem mais confortáveis que a sua própria cama.",
  },
];

const blogPosts = [
  {
    tag: "Guia local",
    title: "Onde comprar colchão no Ipiranga: guia completo de lojas, marcas e preços",
    description: "Como comparar loja exclusiva e multimarca e o que testar pessoalmente antes de decidir.",
    image: "/images/sleep-house/loja-fachada.jpg",
    href: "/blog/onde-comprar-colchao-ipiranga.html",
  },
  {
    tag: "Educação sobre sono",
    title: "4 sinais de que está na hora de trocar o colchão",
    description: "Dor ao acordar, colchão afundado e mais de 10 anos de uso: veja os sinais de alerta.",
    image: "/images/sleep-house/produto-sleephouse-medium.jpeg",
    href: "/blog/quando-trocar-colchao-sinais.html",
  },
  {
    tag: "Guia local",
    title: "Colchão ortopédico em São Caetano do Sul: como escolher o ideal",
    description: "Firmeza, densidade e suporte real para dor lombar — o que considerar antes de comprar.",
    image: "/images/sleep-house/produto-americansleep.jpg",
    href: "/blog/colchao-ortopedico-sao-caetano.html",
  },
  {
    tag: "Preço e parcelamento",
    title: "Quanto custa um colchão bom? Preços por categoria e parcelamento",
    description: "Faixas de preço por categoria e como o parcelamento em 12x sem juros muda a decisão.",
    image: "/images/sleep-house/produto-stearnsfoster.jpg",
    href: "/blog/quanto-custa-colchao-preco-parcelamento.html",
  },
  {
    tag: "Comparação de marcas",
    title: "Tempur, Pikolin, American Sleep ou Stearns & Foster: qual escolher",
    description: "As diferenças reais entre as marcas importadas da loja.",
    image: "/images/sleep-house/produto-tempur.jpg",
    href: "/blog/tempur-pikolin-american-sleep-qual-escolher.html",
  },
];

const stores = [
  ["Sleep House Ipiranga", "Av. Nazaré, 550 — Ipiranga, São Paulo — SP", "Ipiranga"],
  ["Sleep House Nazaré", "Av. Nazaré, 1736 — Ipiranga, São Paulo — SP", "Nazaré"],
  ["Sleep House Santa Cruz", "R. Santa Cruz, 2189 — Vila Mariana, São Paulo — SP", "Santa Cruz"],
  ["Sleep House Vergueiro", "R. Vergueiro, 1910 — Paraíso, São Paulo — SP", "Vergueiro"],
];

const testimonials = [
  {
    author: "Monique Quin",
    text: "A Sandra me atendeu com muita paciência e me ajudou a achar o modelo certo para minha necessidade. Produto de qualidade, adoramos!",
  },
  {
    author: "Michele Turci",
    text: "Atendimento excelente e produtos de qualidade. Me explicaram tudo em detalhes e deram ótimas sugestões. Entrega rápida e perfeita!",
  },
  {
    author: "Marcelo P.",
    text: "Excelente loja, bom atendimento, entrega rápida, super recomendo. Estou amando meu colchão novo.",
  },
];

const Arrow = ({ left = false }: { left?: boolean }) => (
  <span className="arrow-icon" aria-hidden="true">
    <ArrowUpRight strokeWidth={1.8} style={left ? { transform: "rotate(180deg)" } : undefined} />
  </span>
);

const HoverFill = () => <span className="hover-fill" aria-hidden="true" />;

function AnimatedHeading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
}) {
  return (
    <Tag className={`animated-heading ${className}`} aria-label={children}>
      {children.split(" ").map((word, index) => (
        <span className="heading-word" aria-hidden="true" key={`${word}-${index}`}>
          <span>{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading reveal ${light ? "is-light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <AnimatedHeading>{title}</AnimatedHeading>
      {body ? <p className="section-copy">{body}</p> : null}
    </div>
  );
}

export default function SleepHouse() {
  const [introPhase, setIntroPhase] = useState<
    "loading" | "logo-out" | "reveal" | "done"
  >("loading");
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [contactInView, setContactInView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const introCurtainRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLSpanElement>(null);
  const cursorRingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const introStorageKey = "sleep-house-ipiranga:intro-seen:v1";
    const shouldPlayIntro =
      !window.location.hash &&
      window.sessionStorage.getItem(introStorageKey) !== "true";
    const timers: number[] = [];

    if (shouldPlayIntro) {
      window.sessionStorage.setItem(introStorageKey, "true");
      timers.push(
        window.setTimeout(() => setIntroPhase("logo-out"), 2550),
        window.setTimeout(() => setIntroPhase("reveal"), 3450),
        window.setTimeout(() => setIntroPhase("done"), 4300),
      );
    } else {
      timers.push(window.setTimeout(() => setIntroPhase("done"), 0));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (introPhase !== "reveal") return;
    const curtain = introCurtainRef.current;
    if (!curtain) {
      setIntroPhase("done");
      return;
    }

    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 0.55;
    const start = performance.now();
    const duration = 680;
    let frame = 0;

    const reveal = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const radius = eased * maxRadius;
      const mask = `radial-gradient(circle at ${x}px ${y}px, transparent ${radius}px, #000 ${radius}px)`;
      curtain.style.maskImage = mask;
      curtain.style.webkitMaskImage = mask;

      if (progress < 1) {
        frame = window.requestAnimationFrame(reveal);
      } else {
        setIntroPhase("done");
      }
    };

    frame = window.requestAnimationFrame(reveal);
    return () => window.cancelAnimationFrame(frame);
  }, [introPhase]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia(
      "(max-width: 1023px), (hover: none) and (pointer: coarse)",
    ).matches;
    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 1,
          smoothWheel: true,
          allowNestedScroll: false,
        });
    let raf = 0;
    let hashFrame = 0;
    let lastScroll = window.scrollY;

    const updateScrollState = () => {
      const y = lenis?.scroll ?? window.scrollY;
      const delta = y - lastScroll;
      const hero = document.getElementById("hero");

      setScrolled(y > 320);
      setInHero(Boolean(hero && hero.getBoundingClientRect().bottom > 80));
      if (Math.abs(delta) >= 8) {
        setHeaderHidden(y > 96 && delta > 0 && !menuOpenRef.current);
        lastScroll = y;
      }
    };

    if (lenis) {
      const tick = (time: number) => {
        lenis.raf(time);
        raf = window.requestAnimationFrame(tick);
      };
      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", updateScrollState);
      raf = window.requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      event.preventDefault();
      setMenuOpen(false);

      if (href === "#") {
        lenis?.scrollTo(0);
        if (!lenis) window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: href === "#contato" ? -96 : -80 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    const context = gsap.context(() => {
      if (!reducedMotion) {
        const hero = document.getElementById("hero");
        const media = document.querySelector<HTMLElement>(".hero-media-stage");
        const fade = document.querySelector<HTMLElement>(".hero-fade");
        const fixedMedia = heroMediaRef.current;

        if (hero && media && fade && fixedMedia) {
          const scrollTrigger = {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: coarsePointer ? 0.35 : 0.55,
          };

          gsap.fromTo(
            media,
            { scale: 1, scaleX: 1, yPercent: 0 },
            {
              scale:
                1 +
                MOTION.parallax.hero * (coarsePointer ? 0.85 : 1.55),
              scaleX: coarsePointer
                ? 1
                : 1 + 2.05 * MOTION.parallax.hero,
              yPercent: coarsePointer ? -4 : -10,
              ease: "none",
              scrollTrigger,
            },
          );
          gsap.fromTo(
            fade,
            { opacity: 0 },
            { opacity: 1, ease: "none", scrollTrigger },
          );
          ScrollTrigger.create({
            trigger: hero,
            start: "bottom top",
            onLeave: () => {
              fixedMedia.style.visibility = "hidden";
            },
            onEnterBack: () => {
              fixedMedia.style.visibility = "visible";
            },
          });
        }

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          const isHeading = element.classList.contains("section-heading");
          gsap.fromTo(
            element,
            { opacity: 0, y: isHeading ? 24 : 16 },
            {
              opacity: 1,
              y: 0,
              duration: isHeading ? 0.7 : 0.78,
              ease: MOTION.ease,
              scrollTrigger: {
                trigger: element,
                start: isHeading ? "top 88%" : "top 90%",
                once: true,
              },
            },
          );
        });

        gsap.utils
          .toArray<HTMLElement>(".reveal-stagger")
          .forEach((container) => {
            gsap.fromTo(
              Array.from(container.children),
              { opacity: 0, y: 16, scale: 0.985 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.78,
                stagger: 0.09,
                ease: MOTION.ease,
                scrollTrigger: {
                  trigger: container,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });

        gsap.utils
          .toArray<HTMLElement>(".animated-heading")
          .forEach((heading) => {
            const words = heading.querySelectorAll(".heading-word > span");
            gsap.fromTo(
              words,
              { opacity: 0, y: 22 },
              {
                opacity: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.032,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 90%",
                  once: true,
                  fastScrollEnd: true,
                },
              },
            );
          });

        if (!coarsePointer) {
          gsap.utils
            .toArray<HTMLImageElement>(".parallax-image")
            .forEach((image) => {
              const trigger = image.parentElement;
              if (!trigger) return;
              gsap.fromTo(
                image,
                { yPercent: -11 },
                {
                  yPercent: 11,
                  ease: "none",
                  scrollTrigger: {
                    trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.45,
                  },
                },
              );
            });
        }

        const signsTimeline = document.querySelector<HTMLElement>(
          ".lp-sign-timeline",
        );
        const signsProgress = document.querySelector<HTMLElement>(
          ".lp-sign-timeline-progress",
        );

        if (signsTimeline && signsProgress) {
          gsap.fromTo(
            signsProgress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: signsTimeline,
                start: "top 50%",
                end: "bottom 50%",
                scrub: coarsePointer ? 0.2 : 0.45,
              },
            },
          );

          gsap.utils
            .toArray<HTMLElement>(".lp-sign-timeline-item")
            .forEach((item) => {
              const content = item.querySelectorAll<HTMLElement>(
                ".lp-sign-timeline-copy, .lp-sign-timeline-detail",
              );
              const dot = item.querySelector<HTMLElement>(
                ".lp-sign-timeline-dot",
              );

              gsap.fromTo(
                content,
                { opacity: 0.18, y: 18 },
                {
                  opacity: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 86%",
                    end: "center 50%",
                    scrub: coarsePointer ? 0.2 : 0.45,
                  },
                },
              );

              if (dot) {
                gsap.fromTo(
                  dot,
                  {
                    backgroundColor: "#d8d6cd",
                    borderColor: "#fbfaf6",
                    scale: 0.72,
                  },
                  {
                    backgroundColor: "#cf9c00",
                    borderColor: "#fbfaf6",
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 86%",
                      end: "center 50%",
                      scrub: coarsePointer ? 0.2 : 0.45,
                    },
                  },
                );
              }
            });
        }
      } else {
        gsap.set(
          ".reveal, .reveal-stagger > *, .animated-heading .heading-word > span, .lp-sign-timeline-copy, .lp-sign-timeline-detail, .lp-sign-timeline-dot",
          { opacity: 1, y: 0, scale: 1 },
        );
        gsap.set(".lp-sign-timeline-progress", { scaleY: 1 });
      }
    });

    const contact = document.getElementById("contato");
    const contactObserver = contact
      ? new IntersectionObserver(
          ([entry]) => setContactInView(entry.isIntersecting),
          { rootMargin: "-18% 0px -18% 0px", threshold: 0.08 },
        )
      : null;
    if (contact && contactObserver) contactObserver.observe(contact);

    hashFrame = window.requestAnimationFrame(() => {
      if (window.location.hash) {
        const target = document.querySelector<HTMLElement>(window.location.hash);
        if (target) {
          const offset = window.location.hash === "#contato" ? -96 : -80;
          if (lenis) {
            lenis.scrollTo(target, { immediate: true, offset });
          } else {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY + offset,
              behavior: "auto",
            });
          }
          gsap.set(
            target.querySelectorAll(
              ".reveal, .reveal-stagger > *, .animated-heading .heading-word > span",
            ),
            { opacity: 1, y: 0, scale: 1 },
          );
          setHeaderHidden(false);
        }
      } else {
        lenis?.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", updateScrollState);
      if (raf) window.cancelAnimationFrame(raf);
      if (hashFrame) window.cancelAnimationFrame(hashFrame);
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.off("scroll", updateScrollState);
        lenis.destroy();
      }
      contactObserver?.disconnect();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;
    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const interactive = Boolean(
        (event.target as HTMLElement).closest(
          "a, button, input, textarea, select, [role='button']",
        ),
      );
      document.documentElement.toggleAttribute(
        "data-cursor-interactive",
        interactive,
      );
    };
    const leave = () => {
      targetX = -100;
      targetY = -100;
    };
    const render = () => {
      dotX += (targetX - dotX) * 0.34;
      dotY += (targetY - dotY) * 0.34;
      ringX += (targetX - ringX) * 0.12;
      ringY += (targetY - ringY) * 0.12;
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

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      {introPhase !== "done" ? (
        <div className={`site-intro intro-${introPhase}`} aria-hidden="true">
          <div ref={introCurtainRef} className="intro-curtain" />
          {introPhase === "loading" || introPhase === "logo-out" ? (
            <div className="intro-logo-wrap">
              <img src="/brand/sleep-house/logo.svg" alt="" />
            </div>
          ) : null}
        </div>
      ) : null}

      <header
        className={`site-header ${inHero ? "header-hero" : "header-default"} ${
          headerHidden ? "header-hidden" : ""
        }`}
      >
        <a href="#" className="header-logo" aria-label="Sleep House Ipiranga, início">
          <img src="/brand/sleep-house/logo.svg" alt="Sleep House" />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a className="circle-hover" href="#marcas"><span>Marcas</span><HoverFill /></a>
          <a className="circle-hover" href="#lojas"><span>Lojas</span><HoverFill /></a>
          <a className="circle-hover" href="#blog"><span>Blog</span><HoverFill /></a>
        </nav>
        <div className="header-actions">
          <a className="theme-button circle-hover" href="#lojas" aria-label="Ver nossas lojas">
            <MapPin className="header-icon" strokeWidth={1.8} aria-hidden="true" />
            <HoverFill />
          </a>
          <a className="header-cta shimmer-button circle-hover" href="#contato">
            <span>Falar no WhatsApp</span>
            <HoverFill />
          </a>
          <button
            className="menu-button circle-hover"
            onClick={() => {
              setHeaderHidden(false);
              setMenuOpen((value) => !value);
            }}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            <Menu className="header-icon" strokeWidth={1.8} aria-hidden="true" />
            <span>{menuOpen ? "Fechar" : "Menu"}</span>
            <HoverFill />
          </button>
        </div>
      </header>

      <button
        className={`menu-backdrop ${menuOpen ? "menu-open" : ""}`}
        aria-label="Fechar menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`menu-panel ${menuOpen ? "menu-open" : ""}`}
      >
        <div className="menu-panel-head">
          <img
            src="/brand/sleep-house/logo.svg"
            alt="Sleep House"
          />
          <button className="circle-hover" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X strokeWidth={1.8} aria-hidden="true" />
            <HoverFill />
          </button>
        </div>
        <p>Ipiranga · São Paulo, SP</p>
        <nav>
          <a className="circle-hover" href="#" onClick={() => setMenuOpen(false)}>
            <span className="menu-index">01</span><span className="menu-label">Início</span><Arrow /><HoverFill />
          </a>
          <a className="circle-hover" href="#marcas" onClick={() => setMenuOpen(false)}>
            <span className="menu-index">02</span><span className="menu-label">Marcas</span><Arrow /><HoverFill />
          </a>
          <a className="circle-hover" href="#ofertas" onClick={() => setMenuOpen(false)}>
            <span className="menu-index">03</span><span className="menu-label">Ofertas</span><Arrow /><HoverFill />
          </a>
          <a className="circle-hover" href="#blog" onClick={() => setMenuOpen(false)}>
            <span className="menu-index">04</span><span className="menu-label">Blog</span><Arrow /><HoverFill />
          </a>
          <a className="circle-hover" href="#contato" onClick={() => setMenuOpen(false)}>
            <span className="menu-index">05</span><span className="menu-label">Falar com consultor</span><Arrow /><HoverFill />
          </a>
        </nav>
        <div className="menu-panel-footer">
          <a href="#lojas">Nossas lojas</a>
          <a href="https://wa.me/5511985608380">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="custom-cursor" aria-hidden="true">
        <span ref={cursorDotRef} className="custom-cursor-dot" />
        <span ref={cursorRingRef} className="custom-cursor-ring" />
      </div>

      <main id="main-content">
        <section
          id="hero"
          className={`hero ${introPhase === "done" ? "hero-ready" : ""}`}
        >
          <div ref={heroMediaRef} className="hero-fixed-media" aria-hidden="true">
            <div className="hero-media-stage">
              <img
                className="hero-media"
                src="/timeline-hero-poster.jpg"
                alt=""
                aria-hidden="true"
              />
              <video
                className="hero-media hero-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/timeline-hero-poster.jpg"
                aria-hidden="true"
              >
                <source src="/timeline-hero.web.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="hero-overlay" />
            <div className="hero-fade" />
          </div>
          <div className="hero-content">
            <div className="hero-title-wrap">
              <p className="hero-location">Multimarca premium · Ipiranga, SP</p>
              <h1 aria-label="As melhores marcas de colchão do mundo">
                {"As melhores marcas de colchão do mundo".split(" ").map((word, index) => (
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${0.12 + index * 0.1}s` }}
                    key={word}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>
            <div className="hero-bottom">
              <div className="hero-stats">
                <div>
                  <Sparkles className="hero-stat-icon" strokeWidth={1.7} aria-hidden="true" />
                  <strong>Marcas</strong>
                  <span>internacionais</span>
                </div>
                <div>
                  <CreditCard className="hero-stat-icon" strokeWidth={1.7} aria-hidden="true" />
                  <strong>12x</strong>
                  <span>sem juros</span>
                </div>
                <div>
                  <Truck className="hero-stat-icon" strokeWidth={1.7} aria-hidden="true" />
                  <strong>Hoje</strong>
                  <span>entrega express*</span>
                </div>
              </div>
              <div className="hero-ctas">
                <a className="button button-light shimmer-button circle-hover" href="#contato">
                  <span className="button-label">
                    Falar com um consultor <Arrow />
                  </span>
                  <HoverFill />
                </a>
                <a className="button button-ghost circle-hover" href="#ofertas">
                  <span className="button-label">Ver ofertas ativas</span>
                  <HoverFill />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="prova" className="lp-section lp-testimonials">
          <div className="container lp-testimonials-heading">
            <SectionTitle
              eyebrow="Depoimentos de clientes"
              title="Quem compra com a gente, conta assim"
              body="Relatos publicados por clientes Sleep House sobre atendimento, escolha e entrega."
            />
          </div>

          <div className="lp-testimonials-marquee reveal" aria-label="Depoimentos de clientes Sleep House">
            <div className="lp-testimonials-track">
              {[0, 1].map((groupIndex) => (
                <div
                  className="lp-testimonials-group"
                  aria-hidden={groupIndex === 1}
                  key={groupIndex}
                >
                  {testimonials.map((testimonial) => (
                    <article
                      className="lp-testimonial-card"
                      key={`${groupIndex}-${testimonial.author}`}
                    >
                      <span className="lp-testimonial-stars" aria-label="5 de 5 estrelas">★★★★★</span>
                      <blockquote>“{testimonial.text}”</blockquote>
                      <footer>
                        <strong>{testimonial.author}</strong>
                      </footer>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="marcas" className="lp-section lp-brands">
          <div className="container">
            <SectionTitle
              eyebrow="Exclusividade Sleep House"
              title="Marcas que você não encontra em qualquer lugar"
            />
            <div className="lp-brands-grid reveal-stagger">
              {brands.map((brand) => (
                <article className="lp-brand-card" key={brand.name}>
                  <div className="lp-card-media">
                    <img className="parallax-image" src={brand.image} alt={`${brand.name} em exposição na Sleep House`} />
                    <div className={`lp-brand-seal lp-brand-seal--${brand.slug}`}>
                      <img className="lp-brand-logo" src={brand.logo} alt={`Logo ${brand.name}`} />
                    </div>
                  </div>
                  <div className="lp-brand-copy">
                    <h3>{brand.name}</h3>
                    <p>{brand.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="beneficios" className="lp-section lp-benefits brown-section">
          <div className="container">
            <SectionTitle
              light
              eyebrow="Por que a Sleep House Ipiranga"
              title="O acesso a marcas premium, sem o preço de loja exclusiva"
            />
            <div className="lp-benefits-grid reveal-stagger">
              {benefits.map((benefit) => (
                <article className="lp-benefit-card" key={benefit.title}>
                  <span className="benefit-icon"><benefit.icon strokeWidth={1.65} aria-hidden="true" /></span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ofertas" className="lp-section lp-offers">
          <div className="container">
            <SectionTitle
              eyebrow="Ofertas ativas"
              title="Escolha a linha e fale direto com um consultor"
            />
            <div className="lp-offers-grid reveal-stagger">
              {offers.map((offer) => (
                <article className="lp-offer-card" key={offer.name}>
                  <div className="lp-card-media">
                    <span className="lp-badge">{offer.badge}</span>
                    <img className="parallax-image" src={offer.image} alt={`${offer.name} em exposição na loja`} />
                  </div>
                  <div className="lp-offer-body">
                    <span className="lp-brandline">{offer.brand}</span>
                    <h3>{offer.name}</h3>
                    <p>{offer.description}</p>
                    <div className="lp-price">
                      <small>{offer.priceLabel}</small>
                      <strong>{offer.price}</strong>
                    </div>
                    <a
                      className="lp-primary-button circle-hover"
                      href={`https://wa.me/5511985608380?text=${encodeURIComponent(offer.message)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Quero essa oferta</span> <Arrow /><HoverFill />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sinais" className="lp-section lp-signs-timeline">
          <div className="container">
            <div className="lp-signs-timeline-header">
              <SectionTitle
                eyebrow="Antes de decidir"
                title="Seu colchão dá sinais antes de pedir a troca"
              />
              <p className="section-copy reveal">
                Percorra os sinais abaixo. Se dois ou mais fazem parte da sua
                rotina, vale comparar seu colchão atual com um modelo que
                respeite melhor o seu corpo.
              </p>
            </div>

            <div className="lp-sign-timeline">
              <div className="lp-sign-timeline-line" aria-hidden="true">
                <span className="lp-sign-timeline-progress" />
              </div>

              {signs.map((sign, index) => (
                <article className="lp-sign-timeline-item" key={sign.title}>
                  <div className="lp-sign-timeline-copy">
                    <span>Sinal {String(index + 1).padStart(2, "0")}</span>
                    <h3>{sign.title}</h3>
                  </div>

                  <div className="lp-sign-timeline-axis" aria-hidden="true">
                    <span className="lp-sign-timeline-dot" />
                  </div>

                  <div className="lp-sign-timeline-detail">
                    <span className="lp-sign-timeline-icon">
                      <sign.icon strokeWidth={1.55} aria-hidden="true" />
                    </span>
                    <p>{sign.description}</p>
                    <small>
                      {index === 0 && "Tempo de uso"}
                      {index === 1 && "Seu corpo avisa"}
                      {index === 2 && "Desgaste visível"}
                      {index === 3 && "Comparação de conforto"}
                    </small>
                  </div>
                </article>
              ))}
            </div>

            <div className="lp-signs-timeline-footer reveal">
              <div>
                <span>Reconheceu algum sinal?</span>
                <h3>Você não precisa escolher o próximo colchão no escuro.</h3>
              </div>
              <a
                className="lp-primary-button circle-hover"
                href="https://wa.me/5511985608380?text=Oi!%20Acho%20que%20est%C3%A1%20na%20hora%20de%20trocar%20meu%20colch%C3%A3o%2C%20pode%20me%20ajudar%20a%20escolher%3F"
                target="_blank"
                rel="noreferrer"
              >
                <span>Quero ajuda para escolher</span> <Arrow /><HoverFill />
              </a>
            </div>
          </div>
        </section>

        <section id="blog" className="lp-section lp-blog">
          <div className="container">
            <SectionTitle
              eyebrow="Conteúdo"
              title="Aprenda mais antes de decidir"
            />
            <div className="lp-blog-grid reveal-stagger">
              {blogPosts.map((post) => (
                <a className="lp-blog-card" href={post.href} key={post.title}>
                  <div className="lp-blog-media">
                    <img src={post.image} alt="" />
                  </div>
                  <div className="lp-blog-body">
                    <span>{post.tag}</span>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <strong>Ler artigo <Arrow /></strong>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="lojas" className="lp-section lp-stores">
          <div className="container">
            <SectionTitle
              eyebrow="Visite a loja"
              title="Sleep House Ipiranga e unidades da região"
            />
            <div className="lp-stores-grid reveal-stagger">
              {stores.map(([name, address, message]) => (
                <article className="lp-store-card" key={name}>
                  <div>
                    <h3>{name}</h3>
                    <p>{address}</p>
                  </div>
                  <a
                    href={`https://wa.me/5511985608380?text=${encodeURIComponent(`Oi! Quero visitar a loja Sleep House ${message}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp <Arrow />
                  </a>
                </article>
              ))}
            </div>
            <div className="lp-map reveal">
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Sleep House Ipiranga"
                src="https://www.google.com/maps?q=Avenida+Nazar%C3%A9+550+Ipiranga+S%C3%A3o+Paulo&output=embed"
              />
            </div>
          </div>
        </section>

        <section id="contato" className="lp-final-cta brown-section">
          <div className="container reveal">
            <AnimatedHeading>Marcas importadas premium, num único atendimento</AnimatedHeading>
            <p>
              Fale agora com um consultor Sleep House Ipiranga e compare Pikolin,
              Tempur, American Sleep e Stearns &amp; Foster sem pagar preço de loja
              exclusiva — em até 12x sem juros, com entrega no mesmo dia.
            </p>
            <a
              className="lp-primary-button lp-final-button shimmer-button circle-hover"
              href="https://wa.me/5511985608380?text=Oi!%20Quero%20falar%20com%20um%20consultor%20agora."
              target="_blank"
              rel="noreferrer"
            >
              <span>Falar com um consultor no WhatsApp</span> <Arrow /><HoverFill />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer brown-section">
        <div className="container">
          <div className="footer-main">
            <div>
              <img src="/brand/sleep-house/logo.svg" alt="Sleep House" />
              <h2>O colchão certo muda mais do que a sua noite.</h2>
              <p>
                Compare marcas internacionais, experimente cada tecnologia e
                escolha com a orientação de quem entende de sono.
              </p>
            </div>
            <aside>
              <a className="footer-cta circle-hover" href="#contato">
                <span>
                  <strong>Falar com um consultor</strong>
                  <small>Atendimento pelo WhatsApp</small>
                </span>
                <i>
                  <Arrow />
                </i>
                <HoverFill />
              </a>
              <div className="social-links">
                <a href="#marcas">Marcas</a>
                <a href="#ofertas">Ofertas</a>
                <a href="https://wa.me/5511985608380">
                  WhatsApp
                </a>
                <a href="https://www.google.com/maps/search/Sleep+House+Ipiranga">Google</a>
              </div>
            </aside>
          </div>
          <div className="footer-meta">
            <nav>
              <strong>Navegação</strong>
              <div>
                <a href="#">Home</a>
                <a href="#marcas">Marcas</a>
                <a href="#blog">Blog</a>
              </div>
            </nav>
            <address>
              <strong>Ipiranga, São Paulo</strong>
              <p>
                Av. Nazaré, 550 — Ipiranga, São Paulo — SP
              </p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+Nazaré,+550,+São+Paulo">
                ◉ Como chegar &nbsp; <Arrow />
              </a>
            </address>
          </div>
        </div>
        <div className="footer-legal">
          <div className="container">
            <span>© 2026 Sleep House Ipiranga. Todos os direitos reservados.</span>
            <span>
              Marcas premium · consultoria especializada
              <br />Entrega express e montagem gratuita em condições selecionadas
            </span>
          </div>
        </div>
      </footer>

      <div
        className={`floating-actions ${
          contactInView ? "floating-actions-hidden" : ""
        }`}
      >
        {scrolled ? (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ↑
          </button>
        ) : null}
        <a href="https://wa.me/5511985608380" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.44-1.35c1.38.72 2.94 1.14 4.6 1.14h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.9 14.02c-.25.7-1.45 1.34-1.99 1.42-.51.08-1.15.11-1.86-.12-.42-.14-.96-.32-1.65-.62-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.4.27-.28.58-.35.78-.35.2 0 .39.002.56.01.18.008.42-.07.66.5.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.54-.15.15-.3.32-.13.62.17.3.78 1.3 1.68 2.1 1.16 1.03 2.13 1.36 2.44 1.51.31.15.49.13.68-.07.19-.2.79-.9.99-1.21.2-.31.4-.26.66-.16.27.1 1.7.8 1.99.94.29.15.48.22.55.35.07.13.07.72-.18 1.41Z" />
          </svg>
        </a>
        <a className="floating-primary" href="#contato" aria-label="Falar com consultor">
          <i />
          →
        </a>
      </div>
    </>
  );
}
