import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, ShieldAlert, Sparkles, BookOpen, Clock, HeartHandshake } from 'lucide-react'
import { COMPARISON_DIFF } from '@/data/productData'

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-50 text-amber-900 border-amber-300"
          >
            La diferencia es práctica y progresiva
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Deja de esperar a que «esta vez salga mejor por arte de magia»
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal">
            No es que no hayas nacido para hablar en público. Es que nadie te enseñó la secuencia
            biológica correcta para entrenar cuerpo, mente y voz.
          </p>
        </div>

        {/* 2-column comparative table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Old way */}
          <Card className="border-2 border-stone-300 bg-stone-50 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Lo de siempre
                </span>
                <h3 className="text-xl font-bold text-stone-800 mt-1 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  Improvisar o forzar calma
                </h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                <X className="w-5 h-5" />
              </span>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <ul className="space-y-4">
                {COMPARISON_DIFF.oldWay.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 italic">
                Resultado habitual: Voz temblorosa, taquicardia descontrolada y bloqueo a mitad de
                frase.
              </div>
            </CardContent>
          </Card>

          {/* The 21-Day Plan way */}
          <Card className="border-2 border-stone-900 bg-white rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] flex flex-col relative">
            <div className="absolute top-0 right-0 bg-amber-400 text-stone-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg border-l border-b border-stone-900">
              Método Comprobado
            </div>
            <div className="p-6 bg-amber-50/70 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  El Plan de 21 Días
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Entrenamiento guiado diario
                </h3>
              </div>
              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                <Check className="w-5 h-5" />
              </span>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <ul className="space-y-4">
                {COMPARISON_DIFF.newWay.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-stone-800 text-sm font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-700 font-semibold flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                Primero calmas tu fisiología. Luego organizas tus ideas. Luego hablas con presencia.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3-step principle banners */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center font-black mx-auto mb-3">
              1
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Semana 1: El Cuerpo</h4>
            <p className="text-xs text-stone-600 mt-1">
              Respiración diafragmática, soltar tensión y reencuadre biológico del miedo.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center font-black mx-auto mb-3">
              2
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Semana 2: El Discurso</h4>
            <p className="text-xs text-stone-600 mt-1">
              Estructura en 3 partes, inicios magnéticos, historias breves y fichas de apoyo.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center font-black mx-auto mb-3">
              3
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Semana 3: Ante los Demás</h4>
            <p className="text-xs text-stone-600 mt-1">
              Exposición progresiva, control de la mirada, voz firme y manejo de imprevistos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
