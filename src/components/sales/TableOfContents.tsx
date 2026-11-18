import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BOOK_SECTIONS, SectionItem } from '@/data/productData'
import { PARTE_IMAGES, driveImageUrl } from '@/data/driveImages'
import { BookOpen, Check, Layers, ChevronRight } from 'lucide-react'

export const TableOfContents: React.FC = () => {
  return (
    <section id="temario" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-white text-stone-800 border-stone-300"
          >
            Índice completo y detallado
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Echa un vistazo a las 7 partes y los 38 capítulos del plan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal">
            47 páginas ilustradas organizadas de lo pequeño a lo grande, diseñadas para que
            cualquier persona pueda avanzar a su ritmo.
          </p>
        </div>

        {/* List of 7 parts */}
        <div className="space-y-4">
          {BOOK_SECTIONS.map((sec: SectionItem) => (
            <div
              key={sec.id}
              className="bg-white border-2 border-stone-800 rounded-xl p-5 sm:p-6 shadow-[3px_3px_0px_0px_rgba(28,25,23,0.8)] transition-all hover:translate-x-1"
            >
              {/* Imagem original da parte (Google Drive) */}
              <img
                src={driveImageUrl(PARTE_IMAGES[sec.id - 1].id)}
                alt={`Parte ${sec.id}: ${sec.title}`}
                className="w-full h-auto rounded-lg border-2 border-stone-800 mb-5"
                loading="lazy"
              />
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-50 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                    {sec.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        {sec.part}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">·</span>
                      <span className="text-xs font-semibold text-stone-500">{sec.pages}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">
                      {sec.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                {sec.description}
              </p>

              {/* Subtopics bullet chips */}
              <div className="mt-4 pt-3 border-t border-dashed border-stone-200">
                <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-stone-400" />
                  Capítulos ilustrados incluidos:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sec.topics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <ChevronRight className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Practical recap extra banner */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">
                  Ponte a prueba: 28 preguntas con soluciones
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Autoevaluación al final del libro, resumen de todo el plan en una sola página y
                  referencias bibliográficas.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-3 py-1.5 rounded-md shrink-0">
              pp. 42–47 incluidas
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
