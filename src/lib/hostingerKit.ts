/**
 * ============================================================
 *  HOSTINGER KIT — monta hostinger-kit.zip no navegador
 * ============================================================
 *
 * Página utilitária (#/hostinger): busca os arquivos do deploy
 * atual por fetch relativo e empacota com JSZip. O mecanismo é o
 * mesmo do projeto "Materiales de Apoyo Profesional" que o
 * usuário referenciou como modelo.
 *
 * A raiz do ZIP é o conteúdo de dist/ (index.html, assets/,
 * .htaccess na raiz — pronto para subir em public_html).
 * O index.html de produção referencia os assets com caminhos
 * absolutos (/assets/...), então esses arquivos são resolvidos
 * a partir da raiz do deploy; os demais partem do diretório da
 * página.
 *
 * Se algum arquivo falhar, a página avisa na tela quais faltaram
 * em vez de gerar um ZIP quebrado.
 * ============================================================
 */
import JSZip from 'jszip'

/** Manifesto dos arquivos de imagem do site (além dos assets do build) */
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
  - assets/           → JavaScript e CSS compilados
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
  const addOrTrack = (name: string, data: Blob | string | null) => {
    if (data === null) failed.push(name)
    else zip.file(name, data)
  }

  // 1. index.html na raiz do ZIP
  addOrTrack('index.html', html)

  // 2. .htaccess na raiz do ZIP (SPA)
  addOrTrack('.htaccess', await fetchDeployFile('.htaccess'))

  // 3. assets listados no HTML compilado
  const assetPaths = extractAssetPaths(html)
  for (const p of assetPaths) {
    addOrTrack(p, await fetchDeployFile(p))
  }

  // 4. imagens do site (favicon, og-image, previews, etc.)
  for (const p of SITE_IMAGE_FILES) {
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
    result: { ok: true, failed, fileCount: assetPaths.length + SITE_IMAGE_FILES.length + 3 },
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
