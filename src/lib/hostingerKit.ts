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
 * As 6 capas dos bônus são ASSETS LOCAIS (imports estáticos em
 * src/data/bonusCoverImages.ts, emitidos em dist/assets/ ou embutidos
 * como data: URI pelo Vite) e entram na pasta bonus-covers/ do ZIP
 * copiadas do próprio deploy — NADA é baixado de fora (nem do Google
 * Drive, nem de storage remoto). Um <script> gravado no index.html do
 * pacote injeta window.__BONUS_COVER_FILES apontando para essas cópias
 * locais, que passam a ter prioridade sobre os imports do bundle.
 *
 * Se um arquivo DEPLOY falhar, a página avisa na tela quais faltaram
 * em vez de gerar um ZIP quebrado.
 * ============================================================
 */
import JSZip from 'jszip'
import { LOCAL_BONUS_COVER_IMAGES, ALL_BONUS_COVER_NUMBERS } from '@/data/bonusCoverImages'

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

/**
 * Amostras "por dentro" (2 páginas anexadas pelo autor) e o mockup da hero:
 * assets locais importados estaticamente; no pacote entram como imagens do
 * site pela varredura de /assets/* nos bundles — esta lista é a rede de
 * segurança caso algum fique fora do manifesto/da varredura (ex.: inline).
 */
export const CORE_SITE_ASSETS = [
  'mockupherohablagestosterracota-9a39e.webp',
  'pagina21guiaestructuraentrespartes-b509f.webp',
  'pagina09gestoslasmanosenunareunion-0e873.webp',
] as const

/** Caminho do leia-me gerado dentro do ZIP */
export const README_PATH = 'README-DEPLOY.txt'

export interface KitResult {
  ok: boolean
  failed: string[]
  fileCount: number
  /** Capas dos bônus embutidas em bonus-covers/ */
  embeddedCovers: number
  /** Capas que NÃO puderam ser copiadas do deploy */
  coverFailures: string[]
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
      RewriteRule ^index\\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>

--------------------------------------------------------------------
 GERAR O PACOTE LOCALMENTE (opcional, exige Node.js)
--------------------------------------------------------------------
Isso roda o build de produção e gera hostinger-kit.zip com o
mesmo conteúdo deste arquivo.

--------------------------------------------------------------------
 DOIS CAMINHOS DE DOWNLOAD NA PÁGINA /#/hostinger
--------------------------------------------------------------------
1. Principal — "Gerar e baixar pacote": monta o hostinger-kit.zip
   no navegador (com capas dos bônus e leia-me).

2. Alternativo — "Baixar dist-export.zip (build do servidor)":
   baixa https://<seu-site>/download/dist-export.zip, o ZIP gerado
   pelo build de produção (index.html, assets/, .htaccess na raiz).
   Use-o se o botão principal falhar. O caminho /download/ é um
   arquivo estático comum: não passa pelas regras de SPA.
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

/** Extensão pelo content-type, para gravar bonus-covers/bono-01.webp etc. */
function extFromType(type: string): string {
  if (type.includes('png')) return 'png'
  if (type.includes('webp')) return 'webp'
  if (type.includes('gif')) return 'gif'
  if (type.includes('svg')) return 'svg'
  if (type.includes('jpeg')) return 'jpg'
  return 'jpg'
}

/**
 * Embute as capas dos 6 bônus no ZIP (bonus-covers/) e grava o
 * <script> de injeção no index.html. Devolve quantas entraram e a
 * lista das que ficaram de fora (para aviso na tela).
 *
 * TODAS as capas são assets locais do próprio build (dist/assets/
 * com nome hasheado, ou data: URI se o Vite embutiu <4 KB) — nada é
 * baixado de origem externa.
 */
async function embedBonusCovers(
  zip: JSZip,
  indexHtml: string,
  fetchAsset: (rel: string) => Promise<Blob | null>,
): Promise<{
  embeddedCovers: number
  coverFailures: string[]
  html: string
}> {
  const coverMap: Record<string, string> = {}
  const failures: string[] = []

  for (const bonusNum of ALL_BONUS_COVER_NUMBERS) {
    const localUrl = LOCAL_BONUS_COVER_IMAGES[bonusNum]
    if (!localUrl) {
      failures.push(`bonus-covers/bono-${bonusNum} (sem capa definida)`)
      continue
    }

    // Asset emitido pelo Vite (assets/…) ou inlined como data: URI
    // (imports < 4 KB o Vite embute em base64 no bundle — fetch resolve ambos)
    let blob: Blob | null
    if (localUrl.startsWith('data:')) {
      blob = await fetchDataUri(localUrl)
    } else {
      const rel = localUrl.startsWith('/') ? localUrl.slice(1) : localUrl
      blob = await fetchAsset(rel)
    }
    if (!blob) {
      failures.push(`bonus-covers/bono-${bonusNum} (asset local ${localUrl} não acessível)`)
      continue
    }

    const name = `bonus-covers/bono-${bonusNum}.${extFromType(blob.type)}`
    zip.file(name, blob)
    // A chave do mapa é o identificador que o site usa para achar a capa.
    coverMap[bonusNum] = name
  }

  if (Object.keys(coverMap).length === 0)
    return { embeddedCovers: 0, coverFailures: failures, html: indexHtml }
  const script = `<script>window.__BONUS_COVER_FILES=${JSON.stringify(coverMap)};</script>`
  const withHead = /<\/head>/i.test(indexHtml)
    ? indexHtml.replace(/<\/head>/i, `${script}</head>`)
    : `${script}${indexHtml}`
  return {
    embeddedCovers: Object.keys(coverMap).length,
    coverFailures: failures,
    html: withHead,
  }
}

/** Converte um data: URI em Blob (capa inlined pelo Vite no bundle) */
function fetchDataUri(dataUri: string): Blob | null {
  const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(dataUri)
  if (!match) return null
  const mime = match[1] || 'application/octet-stream'
  const isBase64 = Boolean(match[2])
  const raw = match[3]
  try {
    if (isBase64) {
      const bin = atob(raw)
      const bytes = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
      return new Blob([bytes], { type: mime })
    }
    return new Blob([decodeURIComponent(raw)], { type: mime })
  } catch {
    return null
  }
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
  let html = await htmlRes.text()

  const failed: string[] = []
  const added = new Set<string>()

  // 0. Capas dos bônus: assets locais do próprio build (Bono 01–06)
  //    → copiadas do deploy para bonus-covers/ no pacote, sem origem externa
  const coverResult = await embedBonusCovers(zip, html, fetchDeployFile)
  html = coverResult.html
  const coverFailures = coverResult.coverFailures
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

  // 4b. Rede de segurança: mockup da hero + as 2 amostras "por dentro".
  //     Se o Vite as emitiu com nome hasheado, o manifesto/varredura de
  //     bundles já as trouxe; aqui tentamos o caminho base do asset
  //     (sem hash) só por garantia — falha silenciosa não bloqueia o kit.
  for (const baseName of CORE_SITE_ASSETS) {
    if (Array.from(added).some((p) => p.startsWith('assets/') && p.includes(baseName))) continue
    const blob = await fetchDeployFile(`assets/${baseName}`)
    if (blob) {
      added.add(`assets/${baseName}`)
      zip.file(`assets/${baseName}`, blob)
    }
  }

  // 5. leia-me de deploy
  zip.file(README_PATH, buildDeployReadme())

  if (failed.length > 0) {
    return {
      blob: new Blob(),
      result: { ok: false, failed, fileCount: 0, embeddedCovers: 0, coverFailures: [] },
    }
  }

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  return {
    blob,
    result: {
      ok: true,
      failed,
      fileCount: added.size + 2,
      embeddedCovers: coverResult.embeddedCovers,
      coverFailures,
    },
  }
}

/** Dispara o download do Blob no navegador */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
