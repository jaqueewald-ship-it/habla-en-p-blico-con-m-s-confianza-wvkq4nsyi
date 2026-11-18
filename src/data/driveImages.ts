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

/** URL pública de thumbnail do Drive para um arquivo (sz = largura máx.) */
export const driveImageUrl = (fileId: string, width = 1200): string =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`

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
      fileId: '1PORTADAPLACEHOLDER0000000000000000',
    },
    {
      id: 'preview-introduccion',
      label: 'Introducción',
      caption: 'Introducción: cómo usar el plan',
      fileId: '1INTRODUCCIONPLACEHOLDER000000000000',
    },
    {
      id: 'preview-dia01',
      label: 'Día 01',
      caption: 'Día 01 del plan: tu punto de partida',
      fileId: '1DIA01PLACEHOLDER0000000000000000000',
    },
  ]

/* ------------------------------------------------------------
 * Capas das 7 partes (seção "Las 7 partes")
 * (placeholders enquanto os fileIds reais não são colados aqui)
 * ------------------------------------------------------------ */
export const DRIVE_PART_IMAGES: Record<number, string> = {
  1: '1PARTE1PLACEHOLDER00000000000000000000',
  2: '1PARTE2PLACEHOLDER00000000000000000000',
  3: '1PARTE3PLACEHOLDER00000000000000000000',
  4: '1PARTE4PLACEHOLDER00000000000000000000',
  5: '1PARTE5PLACEHOLDER00000000000000000000',
  6: '1PARTE6PLACEHOLDER00000000000000000000',
  7: '1PARTE7PLACEHOLDER00000000000000000000',
}

/* ------------------------------------------------------------
 * Capas dos 6 bônus
 * ------------------------------------------------------------ */
export const DRIVE_BONUS_IMAGES: Record<string, string> = {
  '01': '1BONO01PLACEHOLDER00000000000000000000',
  '02': '1BONO02PLACEHOLDER00000000000000000000',
  '03': '1BONO03PLACEHOLDER00000000000000000000',
  '04': '1BONO04PLACEHOLDER00000000000000000000',
  '05': '1BONO05PLACEHOLDER00000000000000000000',
  '06': '1BONO06PLACEHOLDER00000000000000000000',
}
