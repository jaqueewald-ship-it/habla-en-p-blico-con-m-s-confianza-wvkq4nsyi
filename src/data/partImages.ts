/**
 * ============================================================
 *  PART IMAGES — ilustrações dos cards das 7 partes
 * ============================================================
 *
 * Ilustrações (miniaturas de páginas do guia) anexadas pelo autor
 * e salvas como assets locais (src/assets), importadas
 * estaticamente — o Vite as emite em dist/assets/ com nome
 * hasheado (ou as embute como data URI se <4KB) e o site nunca
 * depende de hotlink para exibi-las.
 *
 * Partes SEM asset local ainda caem no fallback do Google Drive
 * (DRIVE_PART_IMAGES em src/data/driveImages.ts) — quando o autor
 * anexar as imagens restantes, basta salvá-las em src/assets e
 * preencher a entrada correspondente aqui.
 *
 * Chave = número da parte (1…7), valor = URL da ilustração.
 * ============================================================
 */
import parte07 from '@/assets/parte07plande21dias-77660.webp'

/** Ilustrações LOCAIS do bundle (primárias) */
export const LOCAL_PART_IMAGES: Record<number, string | undefined> = {
  1: undefined, // Parte 1 — Entender el miedo (pendente: anexar imagem)
  2: undefined, // Parte 2 — Postura y respiración (pendente: anexar imagem)
  3: undefined, // Parte 3 — Estructura del discurso (pendente: anexar imagem)
  4: undefined, // Parte 4 — La voz (pendente: anexar imagem)
  5: undefined, // Parte 5 — Mirada y gestos (pendente: anexar imagem)
  6: undefined, // Parte 6 — Preguntas del público (pendente: anexar imagem)
  7: parte07, // Parte 7 — Tu plan de 21 días (pág. 25, "Aumenta el reto paso a paso")
}

/** Números de parte com ilustração local definida */
export const LOCAL_PART_NUMBERS: number[] = Object.entries(LOCAL_PART_IMAGES)
  .filter(([, src]) => Boolean(src))
  .map(([n]) => Number(n))

/** true quando a parte tem asset local (muda o encaixe da imagem no card) */
export const isLocalPartImage = (partId: number): boolean => Boolean(LOCAL_PART_IMAGES[partId])
