/**
 * One-shot (roda manualmente nesta sessão): empacota o CÓDIGO-FONTE do
 * projeto em public/site-export.zip — o arquivo fica no repositório e é
 * servido como estático pelo preview (public/ → dist/ no build).
 *
 * Uso: node scripts/zip-source.cjs
 */
const fs = require('node:fs')
const path = require('node:path')
const zlib = require('node:zlib')

const ROOT = path.resolve(__dirname, '..')

// --- Utilidades de ZIP (deflate via zlib, CRC32 em tabela) -------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function dosDateTime(date) {
  const time =
    ((date.getHours() & 0x1f) << 11) |
    ((date.getMinutes() & 0x3f) << 5) |
    (Math.floor(date.getSeconds() / 2) & 0x1f)
  const day =
    (((date.getFullYear() - 1980) & 0x7f) << 9) |
    (((date.getMonth() + 1) & 0x0f) << 5) |
    (date.getDate() & 0x1f)
  return { time, date: day }
}

function buildZip(entries) {
  // entries: [{ name, data: Buffer }]
  const { time, date } = dosDateTime(new Date())
  const localParts = []
  const central = []
  let offset = 0

  for (const entry of entries) {
    const nameBuf = Buffer.from(entry.name, 'utf8')
    const data = entry.data
    const crc = crc32(data)
    let method = 8 // deflate
    let payload = zlib.deflateRawSync(data, { level: 9 })
    if (payload.length >= data.length) {
      method = 0
      payload = data
    }

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4) // version needed
    local.writeUInt16LE(0x0800, 6) // flags: UTF-8
    local.writeUInt16LE(method, 8)
    local.writeUInt16LE(time, 10)
    local.writeUInt16LE(date, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(payload.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(nameBuf.length, 26)
    local.writeUInt16LE(0, 28)
    localParts.push(local, nameBuf, payload)

    const cd = Buffer.alloc(46)
    cd.writeUInt32LE(0x02014b50, 0)
    cd.writeUInt16LE(20, 4) // version made by
    cd.writeUInt16LE(20, 6) // version needed
    cd.writeUInt16LE(0x0800, 8)
    cd.writeUInt16LE(method, 10)
    cd.writeUInt16LE(time, 12)
    cd.writeUInt16LE(date, 14)
    cd.writeUInt32LE(crc, 16)
    cd.writeUInt32LE(payload.length, 20)
    cd.writeUInt32LE(data.length, 24)
    cd.writeUInt16LE(nameBuf.length, 28)
    cd.writeUInt16LE(0, 30) // extra
    cd.writeUInt16LE(0, 32) // comment
    cd.writeUInt16LE(0, 34) // disk
    cd.writeUInt16LE(0, 36) // internal attrs
    cd.writeUInt32LE(0, 38) // external attrs
    cd.writeUInt32LE(offset, 42) // local header offset
    central.push(cd, nameBuf)

    offset += local.length + nameBuf.length + payload.length
  }

  const centralSize = central.reduce((s, c) => s + c.length, 0)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(entries.length, 8)
  eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(centralSize, 12)
  eocd.writeUInt32LE(offset, 16)
  eocd.writeUInt16LE(0, 20)

  return Buffer.concat([...localParts, ...central, eocd])
}

// --- Coleta de arquivos ------------------------------------------------------

const EXCLUDED = new Set([
  'node_modules',
  'dist',
  'dev-dist',
  '.git',
  '.env',
  'bun.lockb',
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'pocketbase',
  'site-export.zip',
  'imagem-do-chatgpt-17-de-nov.de-2026-223139-f4cc2.jpg', // não usada no app
  'scripts', // utilitário desta sessão, não faz parte do app
  'README-DEPLOY.txt', // vai para a raiz do ZIP
])

const INCLUDED_DOTFILES = new Set(['.env.example'])

function walk(dir, base = '') {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    if (EXCLUDED.has(name)) continue
    if (name.startsWith('.') && !INCLUDED_DOTFILES.has(name)) continue
    const full = path.join(dir, name)
    const rel = base ? `${base}/${name}` : name
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      out.push(...walk(full, rel))
    } else {
      out.push({ rel, full })
    }
  }
  return out
}

// --- Geração -----------------------------------------------------------------

function generateSiteZip() {
  try {
    const files = walk(ROOT)
    const readmePath = path.join(ROOT, 'README-DEPLOY.txt')
    const entries = [
      { name: 'README-DEPLOY.txt', data: fs.readFileSync(readmePath) },
      ...files.map((f) => ({ name: f.rel, data: fs.readFileSync(f.full) })),
    ]
    const zip = buildZip(entries)
    const out = path.join(ROOT, 'public', 'site-export.zip')
    fs.writeFileSync(out, zip)
    console.log(
      `[zip-source] public/site-export.zip gerado: ${entries.length} arquivos, ${(zip.length / 1024).toFixed(1)} KB`,
    )
    return { entries: entries.length, bytes: zip.length }
  } catch (err) {
    console.warn(`[zip-source] falhou (não bloqueia o build): ${err.message}`)
    return null
  }
}

module.exports = { generateSiteZip }

if (require.main === module) {
  generateSiteZip()
}
