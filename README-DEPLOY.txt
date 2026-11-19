====================================================================
 HABLA EN PÚBLICO CON MÁS CONFIANZA — GUIA DE PUBLICAÇÃO (HOSTINGER)
====================================================================

Este ZIP contém:
  - dist/            → site JÁ COMPILADO (pronto para subir)
  - código-fonte     → src/, public/, scripts/, package.json, index.html,
                       vite.config.ts, tailwind.config.ts etc. ficam NA RAIZ
                       do ZIP (para referência ou para recompilar), sem
                       node_modules e sem segredos.

O `npm run build` compila o site sem depender de nenhum script de export:
o gancho opcional do tailwind.config.ts só gera o ZIP no ambiente de
desenvolvimento e, se o script faltar ou falhar, o build segue normalmente.

Você tem dois caminhos. O CAMINHO SIMPLES não exige nada instalado.

--------------------------------------------------------------------
 (a) CAMINHO SIMPLES — subir a pasta dist já pronta
--------------------------------------------------------------------
1. Extraia o ZIP no seu computador.
2. Entre na pasta `dist/` que veio dentro dele.
3. No hPanel da Hostinger, abra "Gerenciador de Arquivos" e vá até
   `public_html` (ou a pasta do domínio/subdomínio).
4. Envie TODO o conteúdo da pasta `dist/` (index.html, assets/, etc.)
   para dentro de `public_html` — o conteúdo, não a pasta `dist` em si.
5. Crie na raiz do `public_html`, junto com os arquivos da dist, um
   arquivo chamado `.htaccess` com o conteúdo abaixo. Ele é necessário
   porque o site é SPA: rotas como /obrigado precisam cair no index.html.

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

(Observação: a pasta dist já traz um .htaccess igual a esse. Se ele não
aparecer no gerenciador de arquivos, crie-o manualmente como acima.)

Não é preciso rodar npm install nem npm run build neste caminho.

--------------------------------------------------------------------
 (b) CAMINHO COMPLETO — compilar a partir do código-fonte
--------------------------------------------------------------------
Use este caminho se quiser alterar o site e gerar um build novo.
Requer Node.js instalado. Na raiz do projeto (onde está este README):

    npm install
    npm run build

Isso cria a pasta `dist/` com o site estático pronto. Depois suba o
conteúdo de `dist/` para `public_html` exatamente como no caminho (a),
e crie o mesmo `.htaccess` (conteúdo acima) na raiz do `public_html`.

--------------------------------------------------------------------
 VARIÁVEIS DE AMBIENTE (só para o caminho completo)
--------------------------------------------------------------------
Copie `.env.example` para `.env` e preencha antes do build:

    HOTMART_CHECKOUT_URL   → link de checkout da Hotmart
                             (ex.: pay.hotmart.com/U108550333F?checkoutMode=10)
                             vazio = modal demo como fallback.

O pixel da Syncar já está embutido no index.html (no head).
No caminho simples a dist já vem com o link da Hotmart configurado.

--------------------------------------------------------------------
 ESTRUTURA DO PROJETO (RESUMO)
--------------------------------------------------------------------
src/pages/Index.tsx        → página de vendas (monta todas as seções)
src/components/sales/      → seções: Hero, Previews, Bônus, Oferta, FAQ…
src/data/productData.ts    → textos/dados do produto
src/data/driveImages.ts    → URLs de imagens do Google Drive
src/config/checkout.ts     → link Hotmart + preço
public/                    → estáticos servidos na raiz
                             (inclui previews/, favicon, .htaccess etc.)

Dependências: veja package.json (React 18, Vite, Tailwind v3,
shadcn/ui). Não há backend obrigatório para publicar: o site é
100% estático.
