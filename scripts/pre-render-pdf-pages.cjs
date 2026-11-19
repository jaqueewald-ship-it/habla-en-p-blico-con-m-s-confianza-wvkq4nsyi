/*
 * Pré-renderiza páginas específicas do PDF do guia como imagens estáticas
 * (public/previews/page-XX.png) para uso direto na seção "Así es por dentro".
 *
 * Executar manualmente (uma vez, após trocar o PDF):
 *   npm install pdfjs-dist canvas 2>/dev/null  # opcional, já no package.json
 *   node scripts/pre-render-pdf-pages.cjs
 *
 * Saída: public/previews/page-10.png, page-21.png, page-44.png
 * (via canvas do node-canvas, sem browser). Requer `npm i pdfjs-dist canvas`
 * se ainda não estiverem instaladas.
 */
const fs = require('fs')
const path = require('path')
const { createCanvas } = require('canvas')

const PDF_PATH = path.resolve(
  __dirname,
  '../src/assets/guiahablaconmasconfianzacorregido-7d9c9.pdf',
)
const OUT_DIR = path.resolve(__dirname, '../public/previews')
const PAGES = [10, 21, 44]
const SCALE = 2.5 // ~180 DPI: boa qualidade, arquivo pequeno

async function main() {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const canvasFactory = {
    create(width, height) {
      const c = createCanvas(width, height)
      return { canvas: c, context: c.getContext('2d') }
    },
    destroy({ canvas }) {
      canvas.width = 0
      canvas.height = 0
    },
    reset(canvasAndContext, width, height) {
      canvasAndContext.canvas.width = width
      canvasAndContext.canvas.height = height
    },
  }

  const data = new Uint8Array(fs.readFileSync(PDF_PATH))
  const doc = await pdfjs.getDocument({ data, canvasFactory }).promise

  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const num of PAGES) {
    const page = await doc.getPage(num)
    const viewport = page.getViewport({ scale: SCALE })
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    await page.render({ canvasContext: ctx, viewport, canvasFactory }).promise
    const out = path.join(OUT_DIR, `page-${num}.png`)
    fs.writeFileSync(out, canvas.toBuffer('image/png'))
    console.log(`✓ página ${num} → ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`)
    page.cleanup()
  }

  await doc.destroy()
  console.log('Pronto.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
