/**
 * ============================================================
 *  BONUS COVER IMAGES — capas dos 6 bônus
 * ============================================================
 *
 * Bono 01–06: capas anexadas pelo autor e salvas como assets
 * locais (src/assets), importadas estaticamente — o Vite as emite
 * em dist/assets/ com nome hasheado e o site nunca depende de
 * hotlink para exibi-las.
 *
 * REMOTE_BONUS_COVER_IMAGES fica vazio de propósito: nenhuma capa
 * usa URL externa. O mapa é mantido apenas para que o kit da
 * Hostinger (src/lib/hostingerKit.ts) continue com o mesmo contrato.
 *
 * Chave = número do bônus ("01"…"06"), valor = URL da capa.
 * ============================================================
 */
import bono01 from '@/assets/portadabono1cuaderno21dias-b6965.webp'
import bono02 from '@/assets/portadabono230modelos-7e7fb.webp'
import bono03 from '@/assets/portadabono3presentamanana-ef811.webp'
import bono04 from '@/assets/portadabono4laboratoriodiccionvoz-71d7b.webp'
import bono05 from '@/assets/portadabono5comunicacionefectiva-fdad9.webp'
import bono06 from '@/assets/portadabono6comunicacionasertiva-3e921.webp'

/** Capas LOCAIS do bundle (primárias e definitivas) */
export const LOCAL_BONUS_COVER_IMAGES: Record<string, string | undefined> = {
  '01': bono01,
  '02': bono02,
  '03': bono03,
  '04': bono04,
  '05': bono05,
  '06': bono06,
}

/** Sem capas remotas: todas as capas são locais (mapa vazio, mantido por contrato) */
export const REMOTE_BONUS_COVER_IMAGES: Record<string, string | undefined> = {}

/** Capa final de um bônus: sempre a local */
export const getBonusCoverUrl = (bonusNumber: string): string | undefined =>
  LOCAL_BONUS_COVER_IMAGES[bonusNumber] ?? REMOTE_BONUS_COVER_IMAGES[bonusNumber]

/** Todos os números de bônus com capa definida */
export const ALL_BONUS_COVER_NUMBERS: string[] = Array.from(
  new Set([...Object.keys(LOCAL_BONUS_COVER_IMAGES), ...Object.keys(REMOTE_BONUS_COVER_IMAGES)]),
).sort()
