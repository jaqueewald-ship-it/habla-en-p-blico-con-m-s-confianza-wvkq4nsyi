====================================================================
 HOSTINGER-KIT — GUIA DE PUBLICAÇÃO (mundodeguias.com)
 Versão do site: 0.0.68
====================================================================

Este ZIP contém o site JÁ COMPILADO, pronto para subir na Hostinger:

  - index.html        → página principal (fica na RAIZ do ZIP)
  - assets/           → JavaScript e CSS compilados, e as imagens do site
  - .htaccess         → regras de SPA (rotas caem no index.html)
  - bonus-covers/     → capas dos 6 bônus, copiadas do próprio site
  - imagens do site   → favicon, og-image, previews, etc.
  - README-DEPLOY.txt → este arquivo

--------------------------------------------------------------------
 PASSO A PASSO (Gerenciador de Arquivos da Hostinger)
--------------------------------------------------------------------
1. Extraia este ZIP no seu computador (botão direito → Extrair).

2. No hPanel da Hostinger, abra "Gerenciador de Arquivos" e entre
   na pasta public_html do domínio (mundodeguias.com).

3. Envie TODO O CONTEÚDO do ZIP para dentro de public_html —
   o conteúdo, não uma pasta embrulhando tudo. Ao final, a raiz
   de public_html deve ter index.html, a pasta assets/, o
   .htaccess e as imagens diretamente.

4. Confirme que o arquivo .htaccess ficou na raiz de public_html
   (começa com um ponto: pode estar oculto — ative "Mostrar
   arquivos ocultos" no gerenciador). Se ele não subir, crie-o
   manualmente com o conteúdo abaixo.

5. Abra https://mundodeguias.com no navegador. Deve carregar a
   página de vendas. Teste também o link "Obrigado" (/obrigado):
   recarregar nessa rota só funciona se o .htaccess estiver lá.

--------------------------------------------------------------------
 PARA QUE SERVE O .HTACCESS
--------------------------------------------------------------------
O site é uma SPA (aplicação de página única). Sem o .htaccess,
recarregar uma rota interna (ex.: /obrigado) daria erro 404 na
Hostinger. O arquivo redireciona qualquer rota desconhecida para
o index.html, que assume a navegação:

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

--------------------------------------------------------------------
 GERAR O PACOTE NOVAMENTE (exige Node.js)
--------------------------------------------------------------------
Na raiz do projeto:

    npm install
    node scripts/build-hostinger.mjs

Isso roda o build de produção e regenera hostinger-kit.zip.

Ou, pela página do próprio site: acesse /#/hostinger e clique em
"Gerar e baixar pacote" (funciona direto no navegador, sem Node).
====================================================================
