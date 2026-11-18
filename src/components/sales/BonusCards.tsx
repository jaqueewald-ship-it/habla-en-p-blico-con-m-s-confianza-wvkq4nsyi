import React from 'react'
import { Gift, FileText } from 'lucide-react'
import { BONUS_COVER_IMAGES, driveImageUrl } from '@/data/driveImages'

/**
 * Cards dos 6 bônus dentro da seção da oferta final (#oferta).
 * A capa de cada card é a imagem original do bônus (Google Drive).
 * Sem valor individual: os bônus são sempre "REGALO" incluído — o preço só aparece no total.
 */
const BONUS_CARDS = [
  {
    number: '01',
    title: 'Cuaderno de 21 días',
    description: 'Fichas de trabajo para seguir tu progreso día a día',
    cover: BONUS_COVER_IMAGES[0].id,
  },
  {
    number: '02',
    title: '30 modelos de discursos',
    description: 'Estructuras listas para rellenar con tus datos, sin empezar desde cero',
    cover: BONUS_COVER_IMAGES[1].id,
  },
  {
    number: '03',
    title: 'Presenta mañana: prepárate y recupera el hilo',
    description: 'Preparación exprés para una presentación próxima',
    cover: BONUS_COVER_IMAGES[2].id,
  },
  {
    number: '04',
    title: 'Laboratorio de dicción y voz',
    description: 'Ejercicios prácticos de articulación, proyección y claridad vocal',
    cover: BONUS_COVER_IMAGES[3].id,
  },
  {
    number: '05',
    title: 'Comunicación efectiva: habla y escribe con claridad',
    description: 'Organiza ideas, transmite tu mensaje y confirma la comprensión',
    cover: BONUS_COVER_IMAGES[4].id,
  },
  {
    number: '06',
    title: 'Comunicación asertiva en la práctica',
    description: 'Expresa tus ideas, necesidades y límites con claridad y respeto',
    cover: BONUS_COVER_IMAGES[5].id,
  },
]

export const BonusCards: React.FC = () => {
  return (
    <div className="mt-14">
      {/* Heading do bloco de bônus */}
      <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
          <Gift className="w-3 h-3 text-amber-600" />
          Regalos incluidos
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          6 regalos exclusivos, incluidos en tu compra
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed">
          Seis guías prácticas que llegan junto al producto principal, por la Hotmart, sin coste
          adicional.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {BONUS_CARDS.map((bonus) => (
          <figure
            key={bonus.number}
            className="group relative bg-white border-2 border-stone-800 rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(28,25,23,0.85)] hover:shadow-[7px_7px_0px_0px_rgba(28,25,23,1)] transition-shadow flex flex-col"
          >
            {/* Capa original do bônus (Google Drive) */}
            <div className="relative aspect-[3/4] bg-white">
              <img
                src={driveImageUrl(bonus.cover)}
                alt={`Bono ${bonus.number}: ${bonus.title}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Etiqueta REGALO sobre a capa */}
              <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-900 px-2 py-1 rounded border border-stone-900">
                <Gift className="w-3 h-3" />
                Regalo
              </span>
            </div>

            {/* Título + descrição */}
            <figcaption className="p-4 border-t-2 border-stone-800 bg-stone-50 flex-1 flex flex-col">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5">
                <FileText className="w-3 h-3" />
                Bono {bonus.number}
              </span>
              <span className="text-sm font-black text-stone-900 leading-snug block">
                {bonus.title}
              </span>
              <span className="text-xs text-stone-600 leading-relaxed mt-1.5 block">
                {bonus.description}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Nota: regalo, sem valor individual */}
      <p className="mt-6 text-center text-xs text-stone-500">
        Los seis regalos vienen incluidos con tu compra — no se venden por separado.
      </p>
    </div>
  )
}
