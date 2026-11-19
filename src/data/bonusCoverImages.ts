/**
 * ============================================================
 *  BONUS COVER IMAGES — capas locais dos bônus (assets do bundle)
 * ============================================================
 *
 * Capas dos bônus que foram anexadas pelo autor e salvas como
 * assets locais (src/assets). São importadas estaticamente, então
 * o Vite as emite em dist/assets/ com nome hasheado — o site nunca
 * depende do Google Drive para exibi-las.
 *
 * Bono 01–03 ainda não têm asset local: continuam carregando pelo
 * Drive via DriveImage até as imagens serem anexadas.
 *
 * Chave = número do bônus ("01"…"06"), valor = URL do asset emitido.
 * ============================================================
 */
import bono04 from '@/assets/portadabono4laboratoriodiccionvoz-71d7b.webp'
import bono05 from '@/assets/portadabono5comunicacionefectiva-fdad9.webp'
import bono06 from '@/assets/portadabono6comunicacionasertiva-3e921.webp'

export const LOCAL_BONUS_COVER_IMAGES: Record<string, string | undefined> = {
  '04': bono04,
  '05': bono05,
  '06': bono06,
}
