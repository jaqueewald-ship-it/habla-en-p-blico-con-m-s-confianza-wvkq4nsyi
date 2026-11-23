import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Wind,
  ListOrdered,
  Mic,
  Eye,
  MessageCircleQuestion,
  CalendarCheck,
  Users,
} from 'lucide-react'

/**
 * Seção "LAS 7 PARTES DEL RECORRIDO" — reformulada a pedido do autor:
 * sete cards BREVES com ícones (sem páginas escaneadas do PDF),
 * agrupamento visual por semana (Semana 1: 1–2 · Semana 2: 3–5 ·
 * Semana 3: 6–7) e destaque do material adicional na parte 5.
 * Os textos exatos abaixo foram ditados pelo autor em espanhol.
 */
const PARTS: { id: number; title: string; description: string; icon: React.ElementType }[] = [
  {
    id: 1,
    title: 'Comprende tus nervios',
    description: 'Reconoce cómo reaccionas al hablar y define tu punto de partida.',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Regula la respiración y el cuerpo',
    description: 'Practica la respiración y la postura antes de comunicar tu mensaje.',
    icon: Wind,
  },
  {
    id: 3,
    title: 'Organiza tu discurso',
    description: 'Ordena tus ideas con una apertura, un desarrollo y un cierre.',
    icon: ListOrdered,
  },
  {
    id: 4,
    title: 'Entrena tu voz',
    description: 'Trabaja el volumen, las pausas, la entonación y la dicción.',
    icon: Mic,
  },
  {
    id: 5,
    title: 'Practica la mirada y los gestos',
    description: 'Explora cómo usar las manos, la postura y el contacto visual al hablar.',
    icon: Eye,
  },
  {
    id: 6,
    title: 'Prepárate para situaciones concretas',
    description: 'Practica cómo responder preguntas y desenvolverte en distintos contextos.',
    icon: MessageCircleQuestion,
  },
  {
    id: 7,
    title: 'Integra lo aprendido en 21 días',
    description: 'Avanza con ejercicios graduales y aplica la práctica a tu rutina.',
    icon: CalendarCheck,
  },
]

const WEEKS: { label: string; parts: number[] }[] = [
  { label: 'Semana 1', parts: [1, 2] },
  { label: 'Semana 2', parts: [3, 4, 5] },
  { label: 'Semana 3', parts: [6, 7] },
]

const weekOfPart = (id: number): string => WEEKS.find((w) => w.parts.includes(id))?.label ?? ''

export const TableOfContents: React.FC = () => {
  return (
    <section id="temario" className="py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-white text-stone-800 border-stone-300"
          >
            Índice del recorrido
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            LAS 7 PARTES DEL RECORRIDO
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal">
            Un plan progresivo de 21 días para comprender tus nervios, preparar tus ideas y
            practicar cómo comunicarte ante otras personas.
          </p>
        </div>

        {/* Rótulos das semanas: progressão visual do plano */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {WEEKS.map((week) => (
            <div
              key={week.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-3"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-stone-900">
                {week.parts.length}
              </span>
              <span className="text-sm font-black text-white tracking-wide">{week.label}</span>
              <span className="text-xs font-semibold text-stone-400">
                partes {week.parts.join(' y ')}
              </span>
            </div>
          ))}
        </div>

        {/* Grade das 7 partes: cards breves com ícones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PARTS.map((part) => {
            const Icon = part.icon
            return (
              <article
                key={part.id}
                className="flex flex-col rounded-2xl bg-white p-5 sm:p-6 shadow-lg shadow-black/20 ring-1 ring-stone-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 border border-amber-300">
                    <Icon className="w-6 h-6 text-amber-800" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    Parte {part.id}
                  </span>
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-black text-stone-900 leading-tight">
                  {part.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{part.description}</p>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  {weekOfPart(part.id)}
                </span>
              </article>
            )
          })}
        </div>

        {/* Destaque: material adicional que acompanha o recorrido (parte 5).
            Não é bono, não é oitava parte, não é produto separado. */}
        <div className="mt-8 rounded-2xl bg-amber-50 border-2 border-amber-300 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-200 border border-amber-400 shrink-0">
            <Users className="w-6 h-6 text-amber-900" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-black text-stone-900 text-base sm:text-lg">
              Material adicional para acompañar tu práctica
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed mt-1">
              <strong>Gestos que construyen autoridad:</strong> 20 comparaciones A/B y 5
              simulaciones para practicar la postura, las manos, la mirada y la voz en situaciones
              concretas.
            </p>
          </div>
          <span className="sm:ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-900 border border-amber-400">
            Acompaña la parte 5
          </span>
        </div>
      </div>
    </section>
  )
}
