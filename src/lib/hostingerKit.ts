/**
 * ============================================================
 *  HOSTINGER KIT — monta hostinger-kit.zip no navegador
 * ============================================================
 *
 * Página utilitária (#/hostinger): busca os arquivos do deploy
 * atual por fetch relativo e empacota com JSZip. A raiz do ZIP é
 * o conteúdo de dist/ (index.html, assets/, .htaccess na raiz —
 * pronto para subir em public_html).
 *
 * A lista do ZIP vem de três fontes combinadas:
 *   1. dist/file-manifest.json — manifesto com a lista COMPLETA de
 *      arquivos de dist/, gravado pelo gancho de build
 *      (scripts/zip-source.cjs). Resolve imagens importadas no
 *      código (hero, prévias) que aparecem só dentro dos bundles
 *      JS com nomes hasheados.
 *   2. Varredura dos bundles JS/CSS por referências a /assets/* —
 *      fallback caso o manifesto não exista (deploy antigo) ou
 *      tenha ficado incompleto.
 *   3. Lista fixa de arquivos soltos da raiz (favicon, og-image…)
 *      que sempre existem em public/.
 *
 * Se algum arquivo falhar, a página avisa na tela quais faltaram
 * em vez de gerar um ZIP quebrado.
 * ============================================================
 */
import JSZip from 'jszip'

/** Manifesto gravado no build pelo gancho em scripts/zip-source.cjs */
const MANIFEST_PATH = 'file-manifest.json'

/**
 * Arquivos da raiz de public/ que sempre entram no ZIP, mesmo sem
 * manifesto e sem aparecer no HTML ou nos bundles.
 */
export const SITE_IMAGE_FILES = [
  'favicon.ico',
  'og-image.png',
  'placeholder.svg',
  'previews/audiobook.svg',
  'skip.png',
] as const

/** Caminho do leia-me gerado dentro do ZIP */
export const README_PATH = 'README-DEPLOY.txt'

export interface KitResult {
  ok: boolean
  failed: string[]
  fileCount: number
}

/** Conteúdo do leia-me de deploy (em português, passo a passo da Hostinger) */
export function buildDeployReadme(): string {
  return `====================================================================
 HOSTINGER-KIT — GUIA DE PUBLICAÇÃO (mundodeguias.com)
====================================================================

Este ZIP contém o site JÁ COMPILADO, pronto para subir na Hostinger:

  - index.html        → página principal (fica na RAIZ do ZIP)
  - assets/           → JavaScript e CSS compilados, e as imagens do site
  - .htaccess         → regras de SPA (rotas caem no index.html)
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
      RewriteRule ^index\\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

--------------------------------------------------------------------
 GERAR O PACOTE LOCALMENTE (opcional, exige Node.js)
--------------------------------------------------------------------
Na raiz do projeto:

    npm install
    node scripts/build-hostinger.mjs

Isso roda o build de produção e gera hostinger-kit.zip com o
mesmo conteúdo deste arquivo.
====================================================================
`
}

/**
 * Busca um arquivo do deploy atual. `rel` é o caminho como ele deve
 * aparecer no ZIP; a origem é derivada de onde o index.html referencia.
 */
async function fetchDeployFile(rel: string): Promise<Blob | null> {
  const src = rel.startsWith('assets/') ? `/${rel}` : rel
  try {
    const res = await fetch(src, { cache: 'no-store' })
    if (!res.ok) return null
    const blob = await res.blob()
    if (blob.size === 0) return null
    return blob
  } catch {
    return null
  }
}

/**
 * Extrai os caminhos dos assets do HTML de produção:
 *  - src/href com caminho absoluto (/assets/...) → mantidos como estão
 *  - demais caminhos relativos → resolvidos a partir do diretório da página
 */
export function extractAssetPaths(html: string): string[] {
  const paths = new Set<string>()
  const re = /(?:src|href)=["']([^"']+)["']/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const raw = m[1]
    if (!raw || raw.startsWith('#') || raw.startsWith('data:')) continue
    if (/^https?:\/\//i.test(raw)) continue
    if (raw.startsWith('//')) continue
    if (raw.endsWith('/')) continue
    // remove query/hash de versão do Vite (ex.: /assets/x.js?v=abc)
    const clean = raw.split('?')[0].split('#')[0]
    if (!clean) continue
    paths.add(clean.replace(/^\//, ''))
  }
  return Array.from(paths).sort()
}

/**
 * Fallback: varre bundles JS/CSS em busca de referências a arquivos
 * do build (caminhos absolutos /assets/xxx.ext com nome hasheado do
 * Vite, ou relativos ./assets/...). Só aceita caminhos com extensão
 * de arquivo estático para não capturar rotas da SPA.
 */
export function extractBundleAssetRefs(jsOrCss: string): string[] {
  const paths = new Set<string>()
  const re = /["'(](\/?assets\/[\w@./-]+\.[a-zA-Z0-9]{1,8})["')]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(jsOrCss)) !== null) {
    const clean = m[1].split('?')[0].split('#')[0]
    if (!clean || clean.endsWith('/')) continue
    paths.add(clean.replace(/^\//, ''))
  }
  return Array.from(paths)
}

/** True quando a string parece ser um bundle JS/CSS do Vite */
function isCodeAsset(rel: string): boolean {
  return rel.startsWith('assets/') && /(\.m?js|\.css)$/i.test(rel)
}

/**
 * Monta a lista completa de arquivos do deploy:
 *   manifesto do build → + assets do HTML → + refs dentro dos bundles.
 */
async function collectDeployFiles(html: string): Promise<string[]> {
  const files = new Set<string>()

  // 1. Manifesto gerado no build (lista completa de dist/)
  const manifestBlob = await fetchDeployFile(MANIFEST_PATH)
  if (manifestBlob) {
    try {
      const list = JSON.parse(await manifestBlob.text()) as unknown
      if (Array.isArray(list)) {
        for (const entry of list) {
          if (typeof entry === 'string' && entry && !entry.includes('..')) {
            files.add(entry.replace(/^\//, ''))
          }
        }
      }
    } catch {
      // manifesto inválido → segue com o fallback
    }
  }

  // 2. Assets referenciados no HTML (JS, CSS, favicon, og-image…)
  for (const p of extractAssetPaths(html)) files.add(p)

  // 3. Fallback: referências DENTRO dos bundles JS/CSS (imagens
  //    importadas no código têm nomes hasheados e só aparecem aqui).
  for (const p of Array.from(files)) {
    if (!isCodeAsset(p)) continue
    const blob = await fetchDeployFile(p)
    if (!blob) continue
    const text = await blob.text()
    for (const ref of extractBundleAssetRefs(text)) files.add(ref)
  }

  return Array.from(files).sort()
}

/**
 * Monta o hostinger-kit.zip e devolve o Blob pronto para download.
 * Arquivos que falharem voltam em `failed` — o chamador decide
 * avisar na tela em vez de gerar um ZIP quebrado.
 */
export async function buildHostingerKit(): Promise<{ blob: Blob; result: KitResult }> {
  const zip = new JSZip()

  const htmlRes = await fetch('index.html', { cache: 'no-store' })
  if (!htmlRes.ok) {
    throw new Error(`index.html não acessível (HTTP ${htmlRes.status})`)
  }
  const html = await htmlRes.text()

  const failed: string[] = []
  const added = new Set<string>()
  const addOrTrack = (name: string, data: Blob | string | null) => {
    if (data === null) {
      failed.push(name)
    } else {
      added.add(name)
      zip.file(name, data)
    }
  }

  // 1. index.html na raiz do ZIP
  addOrTrack('index.html', html)

  // 2. .htaccess na raiz do ZIP (SPA)
  addOrTrack('.htaccess', await fetchDeployFile('.htaccess'))

  // 3. Todos os arquivos do deploy: manifesto + HTML + bundles JS
  const deployFiles = await collectDeployFiles(html)
  for (const p of deployFiles) {
    if (p === MANIFEST_PATH || added.has(p)) continue
    addOrTrack(p, await fetchDeployFile(p))
  }

  // 4. Arquivos fixos da raiz de public/ (podem não estar em lugar nenhum)
  for (const p of SITE_IMAGE_FILES) {
    if (added.has(p) || failed.includes(p)) continue
    addOrTrack(p, await fetchDeployFile(p))
  }

  // 5. leia-me de deploy
  zip.file(README_PATH, buildDeployReadme())

  if (failed.length > 0) {
    return { blob: new Blob(), result: { ok: false, failed, fileCount: 0 } }
  }

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  return {
    blob,
    result: { ok: true, failed, fileCount: added.size + 2 },
  }
}

/** Dispara o download do Blob no navegador */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
