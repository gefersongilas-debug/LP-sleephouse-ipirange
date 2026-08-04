# Sleep House — Monorepo de Landing Pages

Monorepo React/Vite com dois projetos independentes e uma landing page
compartilhada:

- `apps/ipiranga`: domínio e dados da unidade Ipiranga;
- `apps/sao-caetano`: domínio e dados da unidade São Caetano;
- `packages/landing-page`: componentes, formulário, estilos e assets comuns.

## Rodar localmente

```bash
npm install
npm run dev:ipiranga
npm run dev:sao-caetano
```

Ipiranga usa `http://localhost:3000` e São Caetano usa
`http://localhost:3001`.

## Rotas

Em ambos os projetos:

- `/`: LP principal com conversão pelo formulário;
- `/whats`: LP com conversão direta pelo WhatsApp;
- `/formulario`: alias da LP principal;
- `/formulario/etapas`: formulário multietapas;
- `/obrigado`: confirmação de envio.

## Validação

```bash
npm run build
npm run lint
```

## Publicar na Vercel

Crie dois projetos na Vercel a partir do mesmo repositório e configure os
diretórios raiz como `apps/ipiranga` e `apps/sao-caetano`. Ative a opção da
Vercel para incluir arquivos externos ao diretório raiz, pois os dois apps
consomem `packages/landing-page`.

Defina `VITE_SITE_URL` em cada projeto com o domínio final, sem barra no fim.
Os arquivos `vercel.json` de cada app já contêm os rewrites necessários.

O projeto inclui:

- imagem imersiva com parallax no hero;
- animação de entrada e reveals acionados por scroll;
- vitrine responsiva das marcas premium;
- diferenciais, ofertas e conteúdo educativo;
- cinco artigos de apoio para SEO local;
- prova social, unidades, mapa e CTAs para WhatsApp;
- layout responsivo para desktop e mobile.
