import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Lightbulb, FileText, ArrowRight } from 'lucide-react'
import { PREVIEW_CARDS, PreviewItem } from '@/data/productData'

interface PagePreviewsProps {
  onSelectCta?: () => void
}

export const PagePreviews: React.FC<PagePreviewsProps> = ({ onSelectCta }) => {
  return (
    <section id="previa" className="py-20 bg-stone-50 border-t border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-white text-stone-800 border-stone-300"
          >
            Cada tema en una sola página ilustrada
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Mira cómo son las páginas del plan que vas a descubrir
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Sin rodeos teóricos interminables: un concepto clave, un esquema visual y recuadros
            claros con exactamente <strong>qué hacer hoy</strong>.
          </p>
        </div>

        {/* Grid of illustrated page preview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREVIEW_CARDS.map((item: PreviewItem) => (
            <Card
              key={item.id}
              className="bg-white border-2 border-stone-800 rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,0.9)] hover:translate-y-[-2px] transition-transform flex flex-col"
            >
              <div className={`p-4 border-b border-stone-200 bg-gradient-to-br ${item.color}`}>
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-stone-800" />
                    Página del Guía
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/80 border border-stone-300 text-stone-800 font-bold">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black text-stone-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  {item.subtitle}
                </p>
              </div>

              <CardContent className="p-4 flex-1 flex flex-col justify-between text-xs space-y-4">
                <p className="text-stone-700 leading-relaxed">{item.summary}</p>

                {/* Practical tips block */}
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1 mb-2">
                    <Lightbulb className="w-3 h-3 text-amber-600" />
                    Puntos clave explicados:
                  </div>
                  <ul className="space-y-1.5">
                    {item.tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-stone-600 leading-tight"
                      >
                        <CheckCircle2 className="w-3 h-3 text-stone-800 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Daily exercise box */}
                <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="line-clamp-2">{item.exercise}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Micro CTA under preview grid */}
        <div className="mt-12 text-center">
          <button
            onClick={onSelectCta}
            className="inline-flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-stone-700 underline underline-offset-4 decoration-2"
          >
            Quiero tener las 47 páginas del plan completo en mi pantalla o impresas
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
