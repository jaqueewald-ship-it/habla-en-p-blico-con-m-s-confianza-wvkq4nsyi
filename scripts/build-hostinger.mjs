#!/usr/bin/env node
/**
 * ============================================================
 *  build-hostinger.mjs — gera hostinger-kit.zip via linha de comando
 * ============================================================
 *
 * Uso (na raiz do projeto):
 *
 *   node scripts/build-hostinger.mjs
 *   # ou, se o package.json tiver o script "build:hostinger":
 *   npm run build:hostinger
 *
 * O que faz:
 *   1. Roda o build de produção (npm run build → pasta dist/)
 *   2. Empacota o CONTEÚDO de dist/ na raiz do ZIP
 *      (index.html, assets/, .htaccess — pronto para public_html)
 *   3. Acrescenta o leia-me de deploy em português
 *   4. Gera hostinger-kit.zip na raiz do projeto
 *
 * Nota: package.json é protegido contra edição por IA neste projeto,
 * por isso o comando é rodado com `node scripts/build-hostinger.mjs`
 * (o alias npm só existe se você mesmo registrar "build:hostinger").
 * ============================================================
 */
import { spawnSync } from 'node:child_process'
import { createWriteStream, existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const OUT = join(ROOT, 'hostinger-kit.zip')
const README_PATH = 'README-DEPLOY.txt'

// ------------------------------------------------------------------
// 1. Build de produção
// ------------------------------------------------------------------
const isWin = process.platform === 'win32'
const npmCmd = isWin ? 'npm.cmd' : 'npm'
console.log('→ Rodando o build de produção (npm run build)...')
const build = spawnSync(npmCmd, ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })
if (build.status !== 0) {
  console.error('✗ O build falhou. Corrija os erros acima e tente de novo.')
  process.exit(build.status ?? 1)
}
if (!existsSync(join(DIST, 'index.html'))) {
  console.error(`✗ dist/index.html não encontrado após o build (procurei em ${DIST}).`)
  process.exit(1)
}
console.log('✓ Build concluído.')

// ------------------------------------------------------------------
// 2. Ler todos os arquivos de dist/ (recursivo, preserva a estrutura)
// ------------------------------------------------------------------
function listFiles(dir, base = '') {
  const out = []
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    const rel = base ? `${base}/${name}` : name
    if (statSync(abs).isDirectory()) out.push(...listFiles(abs, rel))
    else out.push({ abs, rel })
  }
  return out
}

const files = listFiles(DIST)
console.log(`→ ${files.length} arquivos em dist/`)

// ------------------------------------------------------------------
// 3. Montar o ZIP com JSZip (mesma biblioteca da página #/hostinger)
// ------------------------------------------------------------------
const { default: JSZip } = await import('jszip')
const zip = new JSZip()

for (const { abs, rel } of files) {
  zip.file(rel, readFileSync(abs))
}

zip.file(README_PATH, readFileSync(join(ROOT, 'scripts', 'hostinger-readme.txt'), 'utf8'))

console.log('→ Compactando (DEFLATE, nível 6)...')
const content = await zip.generateAsync({
  type: 'nodebuffer',
  compression: 'DEFLATE',
  compressionOptions: { level: 6 },
})

await new Promise((ok, fail) => {
  const ws = createWriteStream(OUT)
  ws.on('error', fail)
  ws.on('finish', ok)
  ws.end(content)
})

const sizeMb = (content.length / (1024 * 1024)).toFixed(2)
console.log(`✓ Pacote gerado: ${OUT} (${sizeMb} MB, ${files.length + 1} arquivos)`)
console.log('  Suba o CONTEÚDO do ZIP em public_html pelo Gerenciador de Arquivos da Hostinger.')
