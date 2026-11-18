/**
 * Imagens originais do material, na pasta do Google Drive do projeto
 * (compartilhada por link). Cada imagem é servida pelo endpoint de
 * thumbnail do Drive, em largura fixa.
 */
export const driveImageUrl = (id: string, width = 1200) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`

/** 01_Galeria — prévias "por dentro" (mockups do material) */
export const GALLERY_IMAGES = [
  {
    id: '1hu8mosj51sUlh6ozDsShB3uLxJR2VNni',
    caption: 'Portada: guía práctica de 21 días',
  },
  {
    id: '1sG7_iJdln1G7YbQrK02oSjkiMbZ3O2to',
    caption: 'Introducción: cómo usar este libro',
  },
  {
    id: '1QNm09Uz3vRpx7ngiV2PkqebrLrJwyzza',
    caption: 'Día 01 del plan: tu punto de partida',
  },
]

/** 02_Las_7_partes — uma imagem por parte, na ordem de BOOK_SECTIONS (id 1–7) */
export const PARTE_IMAGES = [
  { id: '1mqCW22MkNvAIOyLInbnua811o0uwNpqQ', title: 'Entender el miedo' },
  { id: '1wsqRneXOkosSCbS_tOFOt28U5HsT0RhX', title: 'Postura y respiración' },
  { id: '1tmFAyQpKPnj7NsBiNB-v_QnAWOSTcl_Q', title: 'Estructura del discurso' },
  { id: '1evFk_g-KFNACHEROiSBq9N36Q1nFNQCN', title: 'La voz' },
  { id: '1Za765NGmbCJjAKsdLhWXaAuurMB9YAt6', title: 'Mirada y gestos' },
  { id: '1TWolnI822LKE4AJkvar1nfMjEqY1mX3e', title: 'Preguntas del público' },
  { id: '1F-C4SYVz1kzFQxFN7lpSBYuOBmiDls7B', title: 'Plan de 21 días' },
]

/** 03_Portadas_bonos — capas dos bônus 1–6 */
export const BONUS_COVER_IMAGES = [
  { id: '19wkV0bJsWeYP9GkZf8ExrrEjEFCFADeo' },
  { id: '1Obq24tK6xJy8emNGEYvRnBtFdp7LmF3s' },
  { id: '1X3ofMXXLUFPQnquiR2-wevPQMbbiQbBS' },
  { id: '1--pZdRuXeXxZidwIQ_KqBZBUIfJJUNk7' },
  { id: '1EbfCAlxwXLDhKbG6DBDnerkb0rGU_e6m' },
  { id: '1NgBktpD_BDf2cogFYklcJ4nO_equ29A9' },
]
