import React from 'react'
import { ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GuaranteeSectionProps {
  onOpenCheckout: () => void
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-20 bg-stone-50 border-t border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-stone-800 rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(28,25,23,1)]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Guarantee Badge Stamp */}
            <div className="shrink-0 text-center">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-amber-100 border-4 border-dashed border-stone-800 flex flex-col items-center justify-center p-2 text-stone-900 mx-auto">
                <ShieldCheck className="w-8 h-8 text-amber-700 mb-0.5" />
                <span className="text-2xl font-black leading-none">30</span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Días</span>
                <span className="text-[9px] font-semibold text-stone-600">Garantía 100%</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block">
                Tu compra está totalmente protegida
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                Garantía incondicional de devolución de 30 días
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Prueba el plan durante un mes entero. Lee las 47 páginas, escucha el audiobook y pon
                a prueba los ejercicios de respiración y voz en tu próxima reunión.
              </p>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Si por cualquier motivo sientes que el material no ha cumplido tus expectativas o
                tienes cualquier dificultad técnica para abrir los archivos,{' '}
                <strong>
                  nos envías un mensaje y te reembolsamos el 100% de tu dinero de inmediato
                </strong>
                . Sin trámites complicados ni preguntas incómodas.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-900" />
                  Devolución rápida sin preguntas
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Cero riesgo para ti
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
