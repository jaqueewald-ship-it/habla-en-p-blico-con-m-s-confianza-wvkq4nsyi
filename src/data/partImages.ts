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
import parte01 from '@/assets/parte01entenderelmiedo-e22d9.webp'
import parte02 from '@/assets/parte02posturayrespiracion-94e88.webp'
import parte03 from '@/assets/parte03estructuradeldiscurso-6ae23.webp'
import parte04 from '@/assets/parte04lavoz-0d74d.webp'
import parte05 from '@/assets/parte05miradaygestos-c25d2.webp'
import parte06 from '@/assets/parte06preguntasdelpublico-24494.webp'
import parte07 from '@/assets/parte07plande21dias-77660.webp'

/** Ilustrações LOCAIS do bundle (primárias) */
export const LOCAL_PART_IMAGES: Record<number, string | undefined> = {
  1: parte01, // Parte 1 — Entender el miedo (pág. 04, "Antes de tomar la palabra")
  2: parte02, // Parte 2 — Postura y respiración (pág. 08, "Apoyo cómodo de pie")
  3: parte03, // Parte 3 — Estructura del discurso (pág. 10, "Del inicio al siguiente paso")
  4: parte04, // Parte 4 — La voz (pág. 13, "Prueba con una persona")
  5: parte05, // Parte 5 — Mirada y gestos (pág. 16, "Reparte la atención")
  6: parte06, // Parte 6 — Preguntas del público (pág. 20, "Escucha la pregunta completa")
  7: parte07, // Parte 7 — Tu plan de 21 días (pág. 25, "Aumenta el reto paso a paso")
}

/** Números de parte com ilustração local definida */
export const LOCAL_PART_NUMBERS: number[] = Object.entries(LOCAL_PART_IMAGES)
  .filter(([, src]) => Boolean(src))
  .map(([n]) => Number(n))

/** true quando a parte tem asset local (muda o encaixe da imagem no card) */
export const isLocalPartImage = (partId: number): boolean => Boolean(LOCAL_PART_IMAGES[partId])
