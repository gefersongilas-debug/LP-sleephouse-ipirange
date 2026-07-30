"use client";

import { FormEvent, useEffect, useState } from "react";

const journey = [
  {
    title: "Diagnóstico",
    image: "/images/journey/diagnostico.jpg",
    description:
      "Histórico, exames e composição corporal para revelar onde o corpo está travado.",
  },
  {
    title: "Implementação",
    image: "/images/journey/implementacao.jpg",
    description:
      "Um protocolo individual transforma os dados da avaliação em ações práticas e precisas.",
  },
  {
    title: "Monitoramento",
    image: "/images/journey/monitoramento.jpg",
    description:
      "Acompanhamento próximo para entender respostas, ajustar rotas e sustentar a evolução.",
  },
  {
    title: "Consolidação",
    image: "/images/journey/consolidacao.jpg",
    description:
      "Resultados consistentes se tornam uma nova base para saúde, energia e longevidade.",
  },
];

const pillars = [
  {
    title: "Hormônio",
    description:
      "O equilíbrio hormonal é a base fundamental da vitalidade, do humor, da libido e da composição corporal. Realizamos uma avaliação minuciosa para ajustar cada detalhe, garantindo que todo o seu sistema funcione em harmonia.",
    icon: "♡",
  },
  {
    title: "Metabolismo",
    description:
      "Investigamos profundamente os fatores que podem estar travando o seu metabolismo e impedindo resultados. A velocidade, a eficiência e a resposta biológica ao tratamento dependem diretamente desta leitura técnica.",
    icon: "✦",
  },
  {
    title: "Inflamação",
    description:
      "A inflamação crônica e silenciosa é a causa oculta por trás do cansaço constante e da dificuldade em emagrecer. Identificamos esses processos e tratamos a causa para evitar o envelhecimento precoce.",
    icon: "⌁",
  },
  {
    title: "Saúde Muscular",
    description:
      "Massa muscular não é apenas estética, mas um pilar para longevidade e autonomia. Monitoramos sua musculatura para garantir metabolismo ativo e envelhecimento saudável.",
    icon: "⌇",
  },
  {
    title: "Intestino",
    description:
      "A saúde intestinal impacta diretamente a imunidade, o humor e a absorção de nutrientes. Uma microbiota equilibrada transforma a resposta a qualquer tratamento.",
    icon: "◌",
  },
  {
    title: "Nutrientes",
    description:
      "Deficiências nutricionais silenciosas podem comprometer energia, sono e performance cognitiva. Identificamos e corrigimos cada carência com precisão médica.",
    icon: "☼",
  },
  {
    title: "Estilo de Vida",
    description:
      "Sono, estresse e rotina diária moldam a sua biologia. Integramos esses elementos comportamentais ao protocolo individual de forma personalizada.",
    icon: "◇",
  },
];

const stories = [
  "Recuperamos a nossa autoestima",
  "A nossa vida mudou completamente",
  "A nossa vida mudou completamente",
  "Nós fomos os primeiros pacientes",
  "Nós somos outro casal, vivemos melhor",
  "Nós somos outro casal, vivemos melhor",
  "O nosso corpo é a base dos nossos sonhos",
];

const reviews = [
  {
    initials: "GJ",
    name: "Gabi Jorge",
    quote:
      "Viajamos 130 km para ser atendidas e valeu cada centímetro. Desde a chegada, o consultório encanta e toda a equipe é super acolhedora.",
  },
  {
    initials: "JL",
    name: "João Luiz Lopes",
    quote:
      "Atendimento impecável e humano. Toda a equipe transmite segurança e o acompanhamento faz diferença de verdade.",
  },
  {
    initials: "NK",
    name: "Nara Kitsidis",
    quote:
      "Uma experiência completa, com cuidado em cada detalhe e profissionais que realmente escutam o paciente.",
  },
  {
    initials: "AL",
    name: "Ana Letícia Bacha",
    quote:
      "O espaço é maravilhoso e o atendimento superou minhas expectativas. Me senti acolhida desde o primeiro contato.",
  },
  {
    initials: "JS",
    name: "Joyce Silva",
    quote:
      "Profissionalismo, atenção e carinho. A Grape mudou a maneira como eu cuido da minha saúde.",
  },
];

const faqs = [
  {
    question: "Em quanto tempo posso perceber mudanças?",
    answer:
      "Cada corpo responde de um jeito. Algumas pacientes percebem sinais nas primeiras semanas, mas o tempo depende da avaliação, adesão e resposta individual.",
  },
  {
    question: "O acompanhamento serve para qualquer pessoa?",
    answer:
      "A indicação depende da avaliação inicial. A equipe entende o momento, o histórico e os objetivos antes de orientar o próximo passo.",
  },
  {
    question: "Preciso iniciar com exercícios intensos?",
    answer:
      "Não. A rotina é construída de forma gradual e individual, respeitando sua condição atual e o que é sustentável para você.",
  },
  {
    question: "Preciso seguir uma dieta restritiva?",
    answer:
      "O método não parte de soluções genéricas. A estratégia alimentar é personalizada e alinhada à sua realidade.",
  },
  {
    question: "Como funciona o acompanhamento?",
    answer:
      "Após o diagnóstico, você recebe um plano individual e passa por monitoramentos periódicos para ajustes e consolidação dos resultados.",
  },
];

const Arrow = ({ left = false }: { left?: boolean }) => (
  <span aria-hidden="true">{left ? "←" : "→"}</span>
);

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
      <h2>{title}</h2>
      {body ? <p className="section-copy">{body}</p> : null}
    </div>
  );
}

export default function GrapeClinic() {
  const [intro, setIntro] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [pillarIndex, setPillarIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntro(false), 2400);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -8% 0px" },
    );
    document
      .querySelectorAll(".reveal, .reveal-stagger")
      .forEach((node) => observer.observe(node));

    return () => {
      window.clearTimeout(introTimer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormStep((step) => Math.min(step + 1, 2));
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <div className={`site-intro ${intro ? "intro-visible" : "intro-hidden"}`}>
        <div className="intro-mark">G</div>
        <img src="/brand/grapeclinic-logo-dark.svg" alt="" />
        <div className="intro-line" />
      </div>

      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <a href="#" className="header-logo" aria-label="Grape Clinic, início">
          <img
            src={
              scrolled
                ? "/brand/grapeclinic-logo-dark.svg"
                : "/brand/grapeclinic-logo-light.svg"
            }
            alt="Grape Clinic"
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#">Home</a>
          <a href="#metodo">Método</a>
        </nav>
        <div className="header-actions">
          <button className="theme-button" aria-label="Alternar tema">
            ◔
          </button>
          <a className="header-cta" href="#contato">
            Solicitar avaliação
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
          >
            <i /> Menu <i />
          </button>
        </div>
        <div className={`menu-panel ${menuOpen ? "menu-open" : ""}`}>
          <a href="#" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>
            Método Grape
          </a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Solicitar avaliação
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero">
          <video
            className="hero-media"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/foto-da-clinica.jpg"
          >
            <source src="/videos/clinic-hero-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-title-wrap">
              <p className="hero-location">Pouso Alegre, MG</p>
              <h1 aria-label="Saúde, performance e longevidade">
                {"Saúde, performance e longevidade".split(" ").map((word, index) => (
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${1.35 + index * 0.13}s` }}
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
                  <strong>1000+</strong>
                  <span>vidas transformadas</span>
                </div>
                <div>
                  <strong>1:1</strong>
                  <span>avaliação individual</span>
                </div>
                <div>
                  <strong>MG</strong>
                  <span>atendimento presencial</span>
                </div>
              </div>
              <div className="hero-ctas">
                <a className="button button-light" href="#contato">
                  Solicitar avaliação <Arrow />
                </a>
                <a className="button button-ghost" href="#metodo">
                  Conhecer o método Grape
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto brown-section">
          <div className="grape-watermark">G</div>
          <div className="manifesto-inner reveal">
            <div className="method-chip">
              <span>Método Grape</span>
              <i />
            </div>
            <h2>Quando o corpo entra em equilíbrio, tudo muda</h2>
            <p>
              Quando o seu corpo entra em equilíbrio hormonal e metabólico, a
              composição corporal muda de forma natural e sustentável. É assim
              que trabalhamos na Grape.
            </p>
          </div>
        </section>

        <section className="gallery patterned-section">
          <div className="container">
            <SectionTitle
              eyebrow="Galeria da clínica"
              title="Um ecossistema de saúde premium"
            />
            <div className="gallery-grid reveal-stagger">
              <figure className="gallery-a">
                <img
                  src="/images/spaces/foto-clinica-retrato.jpg"
                  alt="Recepção ampla da Grape Clinic"
                />
              </figure>
              <figure className="gallery-b">
                <img
                  src="/images/spaces/fx-00024.jpg"
                  alt="Consultório com ambiente acolhedor"
                />
              </figure>
              <figure className="gallery-c">
                <img
                  src="/images/spaces/fx-00052.jpg"
                  alt="Corredor interno da Grape Clinic"
                />
              </figure>
              <figure className="gallery-d">
                <img
                  src="/images/spaces/fx-00047.jpg"
                  alt="Sala de atendimento da Grape Clinic"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="journey-section">
          <div className="container">
            <SectionTitle
              eyebrow="Etapas da Jornada"
              title="Saúde contínua, inteligente e integrada"
              body="Acompanhamento contínuo, personalizado e baseado em dados com foco em energia, performance, equilíbrio hormonal e qualidade de vida."
            />
            <div className="journey-layout reveal">
              <article className="journey-card">
                {journey.map((item, index) => (
                  <img
                    key={item.title}
                    className={journeyIndex === index ? "journey-image active" : "journey-image"}
                    src={item.image}
                    alt={`Etapa de ${item.title.toLowerCase()} na jornada Grape`}
                  />
                ))}
                <div className="journey-shade" />
                <div className="journey-card-copy">
                  <span>
                    ETAPA {String(journeyIndex + 1).padStart(2, "0")} ·{" "}
                    {String(journeyIndex + 1).padStart(2, "0")} DE 04
                  </span>
                  <h3>{journey[journeyIndex].title}</h3>
                  <p>{journey[journeyIndex].description}</p>
                </div>
              </article>
              <div className="journey-tabs">
                <div className="journey-tabs-head">
                  <strong>{journey[journeyIndex].title}</strong>
                  <span>{String(journeyIndex + 1).padStart(2, "0")} / 04</span>
                </div>
                {journey.map((item, index) => (
                  <button
                    key={item.title}
                    className={journeyIndex === index ? "active" : ""}
                    onClick={() => setJourneyIndex(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.title}</strong>
                    <i>{journeyIndex === index ? "⊙" : "→"}</i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="pillars brown-section">
          <div className="container">
            <div className="pillars-main reveal">
              <div className="pillar-copy">
                <span className="outline-chip">MÉTODO GRAPE</span>
                <h2>Conheça os 7 pilares de acompanhamento do método</h2>
                <div className="active-front">
                  <span>⌁ &nbsp; Frente ativa</span>
                  <i />
                  <span>{String(pillarIndex + 1).padStart(2, "0")} / 07</span>
                </div>
                <h3>{pillars[pillarIndex].title}</h3>
                <p>{pillars[pillarIndex].description}</p>
              </div>
              <div className="orbit" aria-hidden="true">
                <div className="orbit-line" />
                <div className="orbit-center">
                  <span>G</span>
                </div>
                {pillars.map((pillar, index) => (
                  <div
                    className={`orbit-node orbit-node-${index + 1} ${
                      pillarIndex === index ? "active" : ""
                    }`}
                    key={pillar.title}
                  >
                    {pillar.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="pillar-tabs reveal-stagger">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.title}
                  className={pillarIndex === index ? "active" : ""}
                  onClick={() => setPillarIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{pillar.title}</strong>
                  <i>{pillarIndex === index ? "⊙" : "•"}</i>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="doctor patterned-section">
          <div className="container doctor-grid reveal">
            <figure className="doctor-portrait">
              <img
                src="/images/spaces/doutora.jpg"
                alt="Retrato profissional da Dra. Marcela Ferreira de Oliveira"
              />
              <figcaption>
                <span>Ginecologia e Obstetrícia</span>
                <small>CRM/MG: 55051 · RQE Nº: 33744 · MENTORA DE MÉDICOS</small>
              </figcaption>
            </figure>
            <article className="doctor-copy brown-section">
              <h2>Dra. Marcela Ferreira de Oliveira</h2>
              <span>FUNDADORA DO ECOSSISTEMA GRAPE</span>
              <p>
                Médica, <strong>ginecologista e obstetra</strong>. Pós-graduada
                em <strong>Nutrologia</strong>,{" "}
                <strong>Nutriendocrinologia</strong> e{" "}
                <strong>Ciências da Obesidade e Sarcopenia</strong>.
              </p>
              <div className="doctor-rule">·</div>
              <p className="doctor-story">
                Em <strong>2022</strong>, após minha gestação, enfrentei
                obesidade no pós-parto — e foi esse momento que deu origem ao{" "}
                <strong>Método Grape</strong>. Porque emagrecer não bastava: era
                preciso entender o corpo por inteiro.
              </p>
            </article>
          </div>
        </section>

        <section className="stories-section">
          <div className="container">
            <SectionTitle
              eyebrow="Histórias reais, vidas transformadas"
              title="Trajetórias reais e transformações de vida"
              body="Descubra como o Método Grape impacta a saúde através de seus 7 pilares fundamentais."
            />
            <div className="stories-layout reveal">
              <div className="story-list">
                {stories.map((story, index) => (
                  <button
                    className={storyIndex === index ? "active" : ""}
                    onClick={() => setStoryIndex(index)}
                    key={`${story}-${index}`}
                  >
                    <span>{story}</span>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                  </button>
                ))}
                <div className="stories-nav">
                  <span>{String(storyIndex + 1).padStart(2, "0")} / 07</span>
                  <div>
                    <button
                      onClick={() =>
                        setStoryIndex((index) => (index + stories.length - 1) % stories.length)
                      }
                      aria-label="História anterior"
                    >
                      <Arrow left />
                    </button>
                    <button
                      onClick={() => setStoryIndex((index) => (index + 1) % stories.length)}
                      aria-label="Próxima história"
                    >
                      <Arrow />
                    </button>
                  </div>
                </div>
              </div>
              <article className="story-visual">
                <img src="/images/reels/ivan-isabela.jpg" alt="" />
                <div className="story-count">{String(storyIndex + 1).padStart(2, "0")} / 07</div>
                <button className="play-button" aria-label="Reproduzir depoimento">
                  ▶
                </button>
                <h3>{stories[storyIndex]}</h3>
              </article>
            </div>
          </div>
        </section>

        <section
          className="reviews-section"
          style={{ backgroundImage: "url('/images/sections/historias-background.jpg')" }}
        >
          <div className="reviews-overlay" />
          <div className="container reviews-content">
            <div className="reviews-heading reveal">
              <p className="eyebrow">Avaliações reais no Google</p>
              <h2>O que quem passou pela Grape conta.</h2>
              <a
                href="https://www.google.com/maps/place/Grape+Clinic/"
                target="_blank"
                rel="noreferrer"
              >
                Google &nbsp; ★★★★★ &nbsp; 5,0 · 937 avaliações
              </a>
            </div>
            <div className="reviews-layout reveal">
              <article className="review-card">
                <div className="quote-mark">”</div>
                <blockquote>“{reviews[reviewIndex].quote}”</blockquote>
                <footer>
                  <div className="review-avatar">{reviews[reviewIndex].initials}</div>
                  <div>
                    <strong>{reviews[reviewIndex].name}</strong>
                    <span>★★★★★</span>
                    <small>Avaliação verificada no Google</small>
                  </div>
                </footer>
              </article>
              <div className="review-list">
                {reviews.map((review, index) => (
                  <button
                    className={reviewIndex === index ? "active" : ""}
                    onClick={() => setReviewIndex(index)}
                    key={review.name}
                  >
                    <i>{review.initials}</i>
                    <span>
                      <strong>{review.name}</strong>
                      <small>★★★★★</small>
                    </span>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                  </button>
                ))}
                <div className="review-nav">
                  <span>{String(reviewIndex + 1).padStart(2, "0")} / 05</span>
                  <div>
                    <button
                      onClick={() =>
                        setReviewIndex((index) => (index + reviews.length - 1) % reviews.length)
                      }
                    >
                      <Arrow left />
                    </button>
                    <button
                      onClick={() => setReviewIndex((index) => (index + 1) % reviews.length)}
                    >
                      <Arrow />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section patterned-section">
          <div className="container faq-layout">
            <SectionTitle
              eyebrow="01 / 04"
              title="Principais dúvidas antes da primeira avaliação."
              body="Respostas curtas para decidir se faz sentido conversar com a equipe."
            />
            <div className="faq-list reveal">
              {faqs.map((faq, index) => (
                <article className={openFaq === index ? "open" : ""} key={faq.question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <i>{openFaq === index ? "⌃" : "⌄"}</i>
                    <strong>{faq.question}</strong>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="contact-section patterned-section">
          <div className="container">
            <div className="contact-panel brown-section reveal">
              <div className="contact-copy">
                <p className="eyebrow">Avaliação estratégica</p>
                <h2>Comece com uma leitura individual do seu momento.</h2>
                <div>
                  <p>
                    As respostas ajudam a equipe a entender se a avaliação faz
                    sentido para o seu caso e qual próximo passo deve ser indicado.
                  </p>
                  <span>03 etapas objetivas · cerca de 2 min para iniciar</span>
                </div>
              </div>
              <form onSubmit={onFormSubmit}>
                <div className="form-head">
                  <div>
                    <span>0{formStep + 1} / 03</span>
                    <h3>
                      {formStep === 0
                        ? "Primeiro contato"
                        : formStep === 1
                          ? "Seu objetivo"
                          : "Últimos detalhes"}
                    </h3>
                    <p>
                      {formStep === 0
                        ? "Dados básicos para a equipe entender quem deve retornar."
                        : formStep === 1
                          ? "Conte qual mudança você deseja construir."
                          : "Escolha o melhor período para conversarmos."}
                    </p>
                  </div>
                  <i>{Math.round(((formStep + 1) / 3) * 100)}%</i>
                </div>
                <div className="form-progress">
                  <span style={{ width: `${((formStep + 1) / 3) * 100}%` }} />
                </div>

                <div className="form-fields">
                  {formStep === 0 ? (
                    <>
                      <label>
                        Nome
                        <input required placeholder="Seu nome" />
                      </label>
                      <label>
                        WhatsApp
                        <input required type="tel" placeholder="(00) 00000-0000" />
                      </label>
                      <label>
                        Cidade
                        <input required placeholder="Onde você mora" />
                      </label>
                    </>
                  ) : formStep === 1 ? (
                    <>
                      <label>
                        Objetivo principal
                        <select defaultValue="">
                          <option value="" disabled>
                            Selecione uma opção
                          </option>
                          <option>Emagrecimento</option>
                          <option>Equilíbrio hormonal</option>
                          <option>Performance e longevidade</option>
                        </select>
                      </label>
                      <label>
                        Conte um pouco sobre o seu momento
                        <textarea placeholder="Sua mensagem" rows={4} />
                      </label>
                    </>
                  ) : (
                    <>
                      <label>
                        Melhor período para contato
                        <select defaultValue="Manhã">
                          <option>Manhã</option>
                          <option>Tarde</option>
                          <option>Noite</option>
                        </select>
                      </label>
                      <div className="form-success">
                        Tudo pronto. A equipe Grape pode continuar o atendimento
                        com você pelo WhatsApp.
                      </div>
                    </>
                  )}
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    disabled={formStep === 0}
                    onClick={() => setFormStep((step) => Math.max(step - 1, 0))}
                  >
                    <Arrow left /> Voltar
                  </button>
                  {formStep < 2 ? (
                    <button className="primary" type="submit">
                      Continuar <Arrow />
                    </button>
                  ) : (
                    <a
                      className="primary"
                      href="https://api.whatsapp.com/send?phone=5535991390358"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Falar com a equipe <Arrow />
                    </a>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer brown-section">
        <div className="container">
          <div className="footer-main">
            <div>
              <img src="/brand/grapeclinic-logo-light.svg" alt="Grape Clinic" />
              <h2>Uma avaliação individual é o melhor começo.</h2>
              <p>
                A equipe entende seu momento, orienta o próximo passo e indica se
                a Grape Clinic é o caminho certo para você.
              </p>
            </div>
            <aside>
              <a className="footer-cta" href="#contato">
                <span>
                  <strong>Solicitar avaliação</strong>
                  <small>Falar com a equipe</small>
                </span>
                <i>
                  <Arrow />
                </i>
              </a>
              <div className="social-links">
                <a href="https://www.instagram.com/grapeclinic_/">Instagram</a>
                <a href="https://www.youtube.com/channel/UCjaaFEZQH5Ef8D9g-OJCTfw">
                  YouTube
                </a>
                <a href="https://api.whatsapp.com/send?phone=5535991390358">
                  WhatsApp
                </a>
                <a href="https://www.google.com/maps/place/Grape+Clinic/">Google</a>
              </div>
            </aside>
          </div>
          <div className="footer-meta">
            <nav>
              <strong>Navegação</strong>
              <div>
                <a href="#">Home</a>
                <a href="#metodo">Método</a>
              </div>
            </nav>
            <address>
              <strong>Pouso Alegre, MG</strong>
              <p>
                R. Cel. Brito Filho, n°461 - e 469 - Fátima, Pouso Alegre - MG,
                37554-246
              </p>
              <a href="https://www.google.com/maps/dir//R.+Cel.+Brito+Filho">
                ◉ Como chegar &nbsp; <Arrow />
              </a>
            </address>
          </div>
        </div>
        <div className="footer-legal">
          <div className="container">
            <span>© 2026 Grape Clinic. Todos os direitos reservados.</span>
            <span>
              Dra. Marcela Ferreira de Oliveira
              <br />
              CRM/MG: 55051 · RQE Nº: 33744
              <br />
              Ginecologia e Obstetrícia
            </span>
          </div>
        </div>
      </footer>

      <div className="floating-actions">
        {scrolled ? (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ↑
          </button>
        ) : null}
        <a href="https://api.whatsapp.com/send?phone=5535991390358" aria-label="WhatsApp">
          ◔
        </a>
        <a className="floating-primary" href="#contato" aria-label="Solicitar avaliação">
          <i />
          ✎
        </a>
      </div>
    </>
  );
}
