/**
 * ============================================================
 *  GOOGLE DRIVE IMAGES — imagens oficiais do material
 * ============================================================
 *
 * Pasta do Drive preparada pelo autor com as imagens/capas usadas
 * na página de vendas (prévias "por dentro", capas das 7 partes e
 * capas dos bônus).
 *
 * Estrutura esperada na pasta (nomes de arquivo):
 *   - 3 prévias por dentro:  Portada, Introducción, Día 01
 *   - 7 capas de partes:     Parte 1 … Parte 7
 *   - 6 capas de bônus:      Bono 01 … Bono 06
 *
 * Cada entrada mapeia o NOME do arquivo na pasta → fileId.
 * Para descobrir o fileId: abra o arquivo no Drive → botão
 * "Compartilhar" → copiar link → o ID é o trecho entre
 * "/d/" e "/view" (ex.: drive.google.com/file/d/FILE_ID/view).
 *
 * A pasta precisa estar compartilhada como "qualquer pessoa com o
 * link" para as imagens carregarem no site.
 *
 * ⚠️ Regra do autor: as imagens podem aparecer na página, mas
 * NADA aqui pode ser divulgado como método de entrega ou acesso
 * — a entrega comunicada no site continua sendo exclusivamente
 * pela Hotmart.
 * ============================================================
 */

export const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1Jp6WiMXvp-cW5SLgvqkJGMX9wmRRHbDp'

declare global {
  interface Window {
    /** Mapa fileId → caminho local, injetado pelo hostinger-kit.zip quando as capas dos bônus são embutidas */
    __BONUS_COVER_FILES?: Record<string, string>
  }
}

/**
 * URL pública de thumbnail do Drive para um arquivo (sz = largura máx.).
 * Se o hostinger-kit.zip embutiu a capa localmente (pasta bonus-covers/),
 * um <script> no index.html injeta window.__BONUS_COVER_FILES e o site
 * publicado usa a cópia local em vez do hotlink.
 */
export const driveImageUrl = (fileId: string, width = 1200): string => {
  const local = typeof window !== 'undefined' ? window.__BONUS_COVER_FILES?.[fileId] : undefined
  if (local) return local
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`
}

/**
 * Cadeia de candidatos de URL para uma imagem do Drive, do mais confiável ao
 * alternativo. O endpoint /thumbnail às vezes para de carregar no navegador
 * (bloqueio do Google); os candidatos seguintes contornam isso.
 */
export const driveImageCandidates = (fileId: string, width = 1200): string[] => [
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`,
  `https://drive.usercontent.google.com/download?id=${fileId}&export=view`,
  `https://lh3.googleusercontent.com/d/${fileId}=w${width}`,
]

/* ------------------------------------------------------------
 * Prévias "por dentro" — Portada, Introducción, Día 01
 * (placeholders enquanto os fileIds reais não são colados aqui)
 * ------------------------------------------------------------ */
export const DRIVE_PAGE_PREVIEWS: { id: string; label: string; caption: string; fileId: string }[] =
  [
    {
      id: 'preview-portada',
      label: 'Portada',
      caption: 'Portada: guía práctica de 21 días',
      fileId: '1hu8mosj51sUlh6ozDsShB3uLxJR2VNni',
    },
    {
      id: 'preview-introduccion',
      label: 'Introducción',
      caption: 'Introducción: cómo usar el plan',
      fileId: '1sG7_iJdln1G7YbQrK02oSjkiMbZ3O2to',
    },
    {
      id: 'preview-dia01',
      label: 'Día 01',
      caption: 'Día 01 del plan: tu punto de partida',
      fileId: '1QNm09Uz3vRpx7ngiV2PkqebrLrJwyzza',
    },
  ]

/* ------------------------------------------------------------
 * Capas das 7 partes (seção "Las 7 partes")
 * (placeholders enquanto os fileIds reais não são colados aqui)
 * ------------------------------------------------------------ */
export const DRIVE_PART_IMAGES: Record<number, string> = {
  1: '1mqCW22MkNvAIOyLInbnua811o0uwNpqQ',
  2: '1wsqRneXOkosSCbS_tOFOt28U5HsT0RhX',
  3: '1tmFAyQpKPnj7NsBiNB-v_QnAWOSTcl_Q',
  4: '1evFk_g-KFNACHEROiSBq9N36Q1nFNQCN',
  5: '1Za765NGmbCJjAKsdLhWXaAuurMB9YAt6',
  6: '1TWolnI822LKE4AJkvar1nfMjEqY1mX3e',
  7: '1F-C4SYVz1kzFQxFN7lpSBYuOBmiDls7B',
}

/* ------------------------------------------------------------
 * Capas dos 6 bônus — não usadas: as 6 capas agora vêm de
 * src/data/bonusCoverImages.ts (local ou URL fixa do storage),
 * sem passar pelo Google Drive. Mantido apenas para referência
 * dos fileIds originais.
 * ------------------------------------------------------------ */
export const DRIVE_BONUS_IMAGES: Record<string, string> = {
  '01': '19wkV0bJsWeYP9GkZf8ExrrEjEFCFADeo',
  '02': '1Obq24tK6xJy8emNGEYvRnBtFdp7LmF3s',
  '03': '1X3ofMXXLUFPQnquiR2-wevPQMbbiQbBS',
  '04': '1--pZdRuXeXxZidwIQ_KqBZBUIfJJUNk7',
  '05': '1EbfCAlxwXLDhKbG6DBDnerkb0rGU_e6m',
  '06': '1NgBktpD_BDf2cogFYklcJ4nO_equ29A9',
}
