import React from 'react'
import { ArrowRight, BookOpen, Eye, Hand, Mic, Route } from 'lucide-react'
import { Button } from '@/components/ui/button'
import additionalMockup from '@/assets/mockupherohablagestosterracota-9a39e.webp'

interface AdditionalMaterialSectionProps {
  onOpenCheckout: () => void
}

/**
 * Seção dedicada ao material adicional "Gestos que construyen autoridad".
 * Posição: depois de "LAS 7 PARTES DEL RECORRIDO", antes da oferta.
 * Regras do projeto:
 *  - NUNCA é bono, order bump nem produto separado: faz parte do material principal.
 *  - Usa o mockup terracota anexado pelo autor, sem recortes.
 *  - Os textos exatos abaixo foram ditados pelo autor em espanhol.
 */
const BULLET_POINTS: { icon: React.ElementType; text: string }[] = [
  {
    icon: Eye,
    text: '20 comparaciones A/B para observar distintas maneras de comunicar una misma idea.',
  },
  {
    icon: Hand,
    text: '5 simulaciones prácticas con situaciones como reuniones, entrevistas, presentaciones, preguntas difíciles y videollamadas.',
  },
  {
    icon: Route,
    text: 'Una ruta conectada con las tres semanas del plan para integrar la práctica paso a paso.',
  },
  {
    icon: Mic,
    text: 'Ejercicios para comparar versiones y elegir los recursos que te resulten claros y cómodos en cada contexto.',
  },
]

export const AdditionalMaterialSection: React.FC<AdditionalMaterialSectionProps> = ({
  onOpenCheckout,
}) => {
  return (
    <section id="material-adicional" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <BookOpen className="w-3 h-3 text-amber-700" />
            Material adicional incluido en el producto
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Tu comunicación también se expresa con el cuerpo
          </h2>

          <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed">
            La guía principal organiza la práctica de los 21 días. 'Gestos que construyen autoridad'
            la complementa con recursos visuales para observar, probar y ajustar la postura, las
            manos, la mirada y la voz en distintas situaciones.
          </p>
        </div>

        {/* Corpo: mockup terracota (sem recortes) + pontos do material */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Mockup: lado a lado no desktop; abaixo no mobile, centrado */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md">
              <div
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-amber-200/50 via-orange-100/40 to-amber-100/50 blur-2xl -z-10"
                aria-hidden="true"
              />
              <figure className="relative">
                <img
                  src={additionalMockup}
                  alt="Mockup con la guía principal, el smartphone con el reproductor del audiolibro en español y el material adicional 'Gestos que construyen autoridad' con la cubierta terracota"
                  className="w-full h-auto drop-shadow-[0_18px_35px_rgba(28,25,23,0.25)]"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>

          {/* Pontos do material */}
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              ¿Qué encontrarás en este material?
            </h3>

            <ul className="mt-6 space-y-4">
              {BULLET_POINTS.map((point, idx) => {
                const Icon = point.icon
                return (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 rounded-xl border border-stone-200 bg-stone-50 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 border border-amber-300">
                      <Icon className="w-5 h-5 text-amber-800" aria-hidden="true" />
                    </span>
                    <span className="text-sm sm:text-base text-stone-700 leading-relaxed pt-1.5">
                      {point.text}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Cierre + frase de integração */}
            <div className="mt-6 rounded-xl bg-amber-50 border-2 border-amber-300 p-5">
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed">
                No propone gestos universales ni reglas rígidas: invita a probar opciones y observar
                cómo acompañan tu mensaje.
              </p>
              <p className="mt-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-800">
                Forma parte del material principal y se integra al plan de 21 días.
              </p>
            </div>

            <div className="mt-7 text-center lg:text-left">
              <Button
                onClick={onOpenCheckout}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>VER LA OFERTA COMPLETA</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
