=====================================================================
  GUIA DE PUBLICAÇÃO NA HOSTINGER — "Habla en público con más confianza"
=====================================================================

Este ZIP contém o CÓDIGO-FONTE do site (React + Vite + TypeScript +
Tailwind). Siga os passos abaixo para publicá-lo na Hostinger (ou
qualquer hospedagem com Apache/nginx).

---------------------------------------------------------------------
1. INSTALAR E COMPILAR
---------------------------------------------------------------------

Requisitos: Node.js 20 ou superior (https://nodejs.org).

Abra o terminal NA PASTA EXTRAÍDA do ZIP e rode:

    npm install
    npm run build

Isso cria a pasta `dist/` — é ELA que vai para a hospedagem.

---------------------------------------------------------------------
2. ENVIAR PARA A HOSTINGER
---------------------------------------------------------------------

No painel da Hostinger (hPanel > Arquivos > Gerenciador de Arquivos),
abra a pasta pública do domínio (normalmente `public_html`) e envie
TODO O CONTEÚDO de dentro da pasta `dist/` (e não a pasta dist em si):

    index.html
    assets/...
    favicon.ico
    (demais arquivos)

Dica: compacte o conteúdo da `dist/` num ZIP, envie esse ZIP pelo
Gerenciador de Arquivos e use a opção "Extrair".

---------------------------------------------------------------------
3. .HTACCESS — ROTAS DA SPA (OBRIGATÓRIO)
---------------------------------------------------------------------

O site é uma SPA (React Router): sem o arquivo abaixo, atualizar a
página em /obrigado (rota de agradecimento) retorna erro 404.

Crie o arquivo `.htaccess` NA RAIZ do `public_html` (mesmo nível do
index.html) com exatamente este conteúdo:

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

---------------------------------------------------------------------
4. VARIÁVEL DE AMBIENTE (OPCIONAL)
---------------------------------------------------------------------

O arquivo .env não vem no ZIP (nunca deve ir). O único valor que o
site pode usar é:

    VITE_POCKETBASE_URL=<url do backend, se usar o cadastro de compradores>

Sem essa variável o site funciona normalmente — a única função que
deixa de operar é o registro de compradores no PocketBase; a página
de vendas e o checkout da Hotmart não dependem dela.

---------------------------------------------------------------------
5. CONFERIR DEPOIS DE PUBLICAR
---------------------------------------------------------------------

    [ ] A home abre em https://seudominio.com
    [ ] Recarregar https://seudominio.com/obrigado NÃO dá 404
        (prova de que o .htaccess está ativo)
    [ ] Os botões de compra abrem o checkout da Hotmart

Dúvidas comuns:
- Página em branco após publicar: confirme que enviou o CONTEÚDO da
  dist/ e não a pasta dist inteira.
- 404 ao recarregar rotas: o .htaccess não está ativo (verifique se
  o nome do arquivo começa com ponto e está na raiz do public_html).
