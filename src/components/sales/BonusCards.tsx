import React from 'react'
import { Gift, FileText } from 'lucide-react'
import { getBonusCoverUrl } from '@/data/bonusCoverImages'

/**
 * Cards dos bônus na seção "Regalos incluidos" (antes da oferta final).
 * A capa de cada card vem de LOCAL_BONUS_COVER_IMAGES (src/data/bonusCoverImages.ts)
 * — todas as capas são assets locais, nenhuma usa URL externa.
 * Sem valor individual: os bônus são sempre "REGALO" incluído — o preço só aparece no total.
 */
export const BONUS_CARDS = [
  {
    number: '01',
    title: 'Cuaderno de 21 días',
    description: 'Fichas de trabajo para acompañar tu progreso día a día',
  },
  {
    number: '02',
    title: '30 modelos de discursos',
    description: 'Plantillas listas para adaptar a cualquier presentación',
  },
  {
    number: '03',
    title: 'Presenta mañana: prepárate y recupera el hilo',
    description: 'Preparación exprés para una presentación próxima',
  },
  {
    number: '04',
    title: 'Laboratorio de dicción y voz',
    description: 'Ejercicios prácticos de articulación, proyección y claridad vocal',
  },
  {
    number: '05',
    title: 'Comunicación efectiva: habla y escribe con claridad',
    description: 'Organiza ideas, transmite tu mensaje y confirma la comprensión',
  },
  {
    number: '06',
    title: 'Comunicación asertiva en la práctica',
    description: 'Expresa tus ideas, necesidades y límites con claridad y respeto',
  },
]

/** Capa de um card: local do bundle. No site publicado via hostinger-kit.zip, a cópia
 *  embutida em bonus-covers/ (window.__BONUS_COVER_FILES) tem prioridade. */
const BonusCover: React.FC<{ number: string; alt: string }> = ({ number, alt }) => {
  const embedded = typeof window !== 'undefined' ? window.__BONUS_COVER_FILES?.[number] : undefined
  const src = embedded ?? getBonusCoverUrl(number)
  if (!src) return null
  return (
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top" />
  )
}

export const BonusCards: React.FC = () => {
  return (
    <div>
      {/* Heading do bloco de bônus */}
      <div className="text-center space-y-2 max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
          <Gift className="w-3 h-3 text-amber-600" />
          Regalos incluidos
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Regalos exclusivos, incluidos en tu compra
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          Guías prácticas que llegan junto al producto principal, por la Hotmart, sin coste
          adicional.
        </p>
      </div>

      {/* Cards com capa, título e descrição */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {BONUS_CARDS.map((bonus) => (
          <figure
            key={bonus.number}
            className="group relative bg-white border-2 border-stone-800 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,0.85)] flex flex-col"
          >
            {/* Capa do bônus: asset local */}
            <div className="relative aspect-[3/4] bg-white">
              <BonusCover number={bonus.number} alt={bonus.title} />
              {/* Etiqueta REGALO sobre a capa */}
              <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded border border-stone-900">
                <Gift className="w-3 h-3" />
                Regalo
              </span>
            </div>

            {/* Título e descrição */}
            <figcaption className="px-3 py-3 border-t-2 border-stone-800 bg-stone-50 flex-1 flex flex-col">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                <FileText className="w-3 h-3" />
                Bono {bonus.number}
              </span>
              <span className="text-sm font-black text-stone-900 leading-snug block mt-1">
                {bonus.title}
              </span>
              <span className="text-xs text-stone-600 leading-relaxed block mt-1.5">
                {bonus.description}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Nota: regalo, sem valor individual */}
      <p className="mt-6 text-center text-xs text-stone-500">
        Los regalos vienen incluidos con tu compra — no se venden por separado.
      </p>
    </div>
  )
}
