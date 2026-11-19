====================================================================
 HABLA EN PÚBLICO CON MÁS CONFIANZA — GUIA DE PUBLICAÇÃO (HOSTINGER)
====================================================================

Este ZIP contém o CÓDIGO-FONTE completo do site (SPA React + Vite +
Tailwind), sem node_modules e sem segredos.

--------------------------------------------------------------------
 1. GERAR O BUILD DE PRODUÇÃO
--------------------------------------------------------------------
Na raiz do projeto (onde está este README):

    npm install
    npm run build

Isso cria a pasta `dist/` com o site estático pronto.

--------------------------------------------------------------------
 2. PUBLICAR NA HOSTINGER
--------------------------------------------------------------------
1. No hPanel da Hostinger, abra "Gerenciador de Arquivos" e vá até
   `public_html` (ou a pasta do domínio/subdomínio).
2. Envie TODO o conteúdo da pasta `dist/` (index.html, assets/, etc.)
   para dentro dela — não a pasta em si, e sim o que há dentro.
3. Crie/edite o arquivo `.htaccess` em `public_html` com o conteúdo
   abaixo (necessário porque o site é SPA — rotas como /obrigado
   precisam cair no index.html):

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

--------------------------------------------------------------------
 3. VARIÁVEIS DE AMBIENTE
--------------------------------------------------------------------
Copie `.env.example` para `.env` e preencha antes do build:

    HOTMART_CHECKOUT_URL   → link de checkout da Hotmart
                             (ex.: pay.hotmart.com/U108550333F?checkoutMode=10)
                             vazio = modal demo como fallback.

O pixel da Syncar já está embutido no index.html.

--------------------------------------------------------------------
 4. ESTRUTURA DO PROJETO (RESUMO)
--------------------------------------------------------------------
src/pages/Index.tsx        → página de vendas (monta todas as seções)
src/components/sales/      → seções: Hero, Previews, Bônus, Oferta, FAQ…
src/data/productData.ts    → textos/dados do produto
src/data/driveImages.ts    → URLs de imagens do Google Drive
src/config/checkout.ts     → link Hotmart + preço
public/                    → estáticos servidos na raiz
                             (inclui previews/, favicon etc.)

Dependências: veja package.json (React 18, Vite, Tailwind v3,
shadcn/ui). Não há backend obrigatório para publicar: o site é
100% estático.
