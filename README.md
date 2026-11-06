# Landing page imobiliária

Landing page Direcional em **Next.js 16, React 19 e TypeScript**, com App Router.
O frontend usa componentes React, imagens otimizadas pelo Next.js e fontes locais.
A página inicial e os três empreendimentos são pré-renderizados durante o build.

## Deploy do frontend na Vercel

Importe este repositório e use as configurações padrão de Next.js:

| Campo | Valor |
| --- | --- |
| Root Directory | `.` — raiz do repositório |
| Framework Preset | Next.js |
| Install Command | Automático |
| Build Command | `npm run build` |
| Output Directory | Padrão do Next.js (`.next`) |
| Node.js | 22.x |
| Variáveis de ambiente próprias | Nenhuma necessária |

O `vercel.json` apenas identifica `nextjs`; não substitui instalação, build ou
saída. O `package-lock.json` fixa as dependências. Publique o projeto completo,
incluindo `src/`, `public/`, os arquivos de configuração e o lockfile.
O `.gitignore` mantém builds, dependências instaladas e arquivos locais fora do
repositório.

**Se o projeto da Vercel já usava a versão anterior**, altere Root Directory de
`frontend` para `.`, escolha Next.js e restaure os padrões dos campos Build,
Install e Output. Remova o override antigo `frontend`/`.` do Output Directory e
os comandos vazios de instalação e build. Faça um novo deploy.

Não é necessário executar Python nem exportar HTML manualmente. A Vercel executa
o build de Next.js. Os metadados de compartilhamento usam automaticamente o
domínio fornecido pelas variáveis de sistema `VERCEL_PROJECT_PRODUCTION_URL`
ou `VERCEL_URL`.

Documentação: [Next.js na Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
e [instalação de Next.js](https://nextjs.org/docs/app/getting-started/installation).

## Abrir a landing page

Use Node.js 22 e npm. Na raiz:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra **http://localhost:3000/**. No Windows, o atalho também funciona:

```powershell
.\scripts\abrir-site.ps1
```

Ele inicia Next.js na porta 5030. Use `-NoBrowser` para iniciar sem abrir uma janela.
Para executar o build de produção:

```powershell
npm.cmd run build
npm.cmd start
```

## Rotas e funcionalidades

- `/`: seleção inicial Inove Residence.
- `/imoveis/nature-varzea/`: Nature Várzea, Recife.
- `/imoveis/inove-residence/`: Inove Residence, Contagem.
- `/imoveis/boulevard-ville/`: Conquista Boulevard Ville, Camaçari.

A seleção sincroniza fotos, informações e WhatsApp, com URL própria e suporte ao
histórico do navegador. Galeria, ampliação das plantas, navegação por teclado,
menu mobile e movimento reduzido são implementados em React. Os links antigos
`/?imovel=...` e `/?regiao=...` continuam sendo interpretados no navegador.
Sem JavaScript, os links de cidade e empreendimento abrem as páginas já renderizadas;
as imagens originais e os contatos continuam acessíveis.

Os contatos abrem os canais oficiais do WhatsApp. A aplicação não coleta dados
pessoais, não envia mensagens e não depende de uma API externa para renderizar.
O catálogo é editorial; a equipe oficial confirma disponibilidade e condições.

## Design e organização

- [Créditos e fontes](docs/attributions.md).

Edite o catálogo em `src/content/properties.ts`, os dados institucionais em
`src/content/brand.ts` e as etapas de compra em `src/content/purchase.ts`.
Os componentes ficam em `src/components/`, o CSS em `src/styles/` e os arquivos
públicos em `public/`. As fontes Roboto são carregadas com `next/font/local`.

A implementação Flask, o ambiente Python, os backups da migração e as ferramentas
antigas de captura foram removidos. O frontend atual usa apenas Node.js e npm.

## Verificações

```powershell
npm.cmd run typecheck
npm.cmd run build
npx.cmd playwright install chromium
```

Com `npm.cmd start` ou `npm.cmd run dev` ativo na porta 3000, em outro terminal:

```powershell
npm.cmd test
```

Para testar outra porta, defina `PREVIEW_URL` antes de executar `npm.cmd test`.
Os testes verificam quatro larguras de tela, navegação, URLs, galeria, plantas,
contatos, metadados e navegação sem JavaScript. Relatórios e capturas ficam em
`.taste-skill/migration/qa/`.

## Arquivos versionados

O `.gitignore` inclui explicitamente o código, os assets públicos, as configurações
Next.js/TypeScript/npm, os testes de navegador, o atalho Windows, este README e
os créditos dos materiais. Pastas novas na raiz exigem uma inclusão explícita.

Referências de design, instruções locais de agentes, relatórios, caches, builds,
dependências instaladas e variáveis de ambiente ficam fora do Git. Esses arquivos
locais não são necessários para clonar, executar ou publicar o frontend.
