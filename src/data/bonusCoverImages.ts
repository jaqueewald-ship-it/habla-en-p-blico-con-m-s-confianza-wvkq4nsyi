/**
 * ============================================================
 *  BONUS COVER IMAGES — capas dos 6 bônus
 * ============================================================
 *
 * Bono 03–06: capas anexadas pelo autor e salvas como assets
 * locais (src/assets), importadas estaticamente — o Vite as emite
 * em dist/assets/ com nome hasheado e o site nunca depende de
 * hotlink para exibi-las.
 *
 * Bono 01–02: capas enviadas pelo autor em anexo anterior, hoje
 * servidas pelo storage público de anexos da plataforma (Supabase)
 * — não puderam ser gravadas em src/assets nesta rodada. São URLs
 * fixas do próprio storage, sem passar pelo Google Drive. Quando as
 * imagens forem anexadas de novo, movê-las para LOCAL (imports
 * estáticos como em 03–06). Bono 03 foi movido para LOCAL porque a
 * URL remota estava servindo uma capa desatualizada.
 *
 * Chave = número do bônus ("01"…"06"), valor = URL da capa.
 * ============================================================
 */
import bono03 from '@/assets/portadabono3presentamanana-ef811.webp'
import bono04 from '@/assets/portadabono4laboratoriodiccionvoz-71d7b.webp'
import bono05 from '@/assets/portadabono5comunicacionefectiva-fdad9.webp'
import bono06 from '@/assets/portadabono6comunicacionasertiva-3e921.webp'

/** Capas LOCAIS do bundle (primárias e definitivas) */
export const LOCAL_BONUS_COVER_IMAGES: Record<string, string | undefined> = {
  '03': bono03,
  '04': bono04,
  '05': bono05,
  '06': bono06,
}

/** Capas 01–02: URL fixa no storage público de anexos (sem Google Drive) */
export const REMOTE_BONUS_COVER_IMAGES: Record<string, string | undefined> = {
  '01': 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/4f3c6cca-e558-46a8-8cff-14d811c48538/portadabono1cuaderno21dias-7c93d.webp',
  '02': 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/4f3c6cca-e558-46a8-8cff-14d811c48538/portadabono230modelos-22413.webp',
}

/** Capa final de um bônus: local primeiro; cai para a URL fixa se não houver asset */
export const getBonusCoverUrl = (bonusNumber: string): string | undefined =>
  LOCAL_BONUS_COVER_IMAGES[bonusNumber] ?? REMOTE_BONUS_COVER_IMAGES[bonusNumber]

/** Todos os números de bônus com capa definida (local ou fixa remota) */
export const ALL_BONUS_COVER_NUMBERS: string[] = Array.from(
  new Set([...Object.keys(LOCAL_BONUS_COVER_IMAGES), ...Object.keys(REMOTE_BONUS_COVER_IMAGES)]),
).sort()
