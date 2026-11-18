import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react'

interface GuaranteeSectionProps {
  onOpenCheckout: () => void
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onOpenCheckout }) => {
  return (
    <section id="garantia" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-stone-800 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left: Guarantee badge & title */}
          <div className="p-8 sm:p-10 bg-emerald-50/70 flex flex-col items-center justify-center text-center gap-5 border-b-2 lg:border-b-0 lg:border-r-2 border-stone-800">
            <div className="relative w-36 h-36">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-300 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full bg-white border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.9)] flex flex-col items-center justify-center">
                <ShieldCheck className="w-9 h-9 text-emerald-600" />
                <span className="mt-1 text-3xl font-black text-stone-900 leading-none">7</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-600">
                  Días
                </span>
              </div>
              {/* Corner sparkles */}
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-500" />
              <Sparkles className="absolute -bottom-1 -left-1 w-5 h-5 text-emerald-500" />
            </div>

            <Badge
              variant="outline"
              className="px-4 py-1 text-xs uppercase tracking-wider font-bold bg-white text-emerald-800 border-emerald-300"
            >
              Sin riesgo para ti
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
              Garantía incondicional de devolución de 7 días
            </h2>
          </div>

          {/* Right: Copy & CTA */}
          <div className="p-8 sm:p-10 flex flex-col justify-center gap-5">
            <h3 className="text-xl font-black text-stone-900 leading-snug">
              Prueba el método durante una semana completa
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Descarga la guía, escucha el audiobook y haz los primeros ejercicios. Si en{' '}
              <strong>7 días naturales</strong> sientes que el material no es para ti —o simplemente
              no conecta con tu situación— escríbenos un único correo y te devolvemos{' '}
              <strong>el 100% de tu dinero</strong>. Sin formularios eternos, sin preguntas
              incómodas y sin justificar nada.
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-600 leading-relaxed">
                El riesgo lo asumimos nosotros. Tú solo te quedas con el resultado: hablar con más
                calma y claridad. Ese es nuestro compromiso contigo desde el primer día.
              </p>
            </div>
            <Button
              onClick={onOpenCheckout}
              size="lg"
              className="mt-2 w-full sm:w-auto px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              Empezar sin riesgo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
