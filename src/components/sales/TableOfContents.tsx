import React from 'react'
import { Badge } from '@/components/ui/badge'
import { BOOK_SECTIONS, SectionItem } from '@/data/productData'
import { LOCAL_PART_IMAGES } from '@/data/partImages'
import { BookOpen, Layers, ChevronRight } from 'lucide-react'

export const TableOfContents: React.FC = () => {
  return (
    <section id="temario" className="py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-white text-stone-800 border-stone-300"
          >
            Índice completo y detallado
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Echa un vistazo a las 7 partes y los 38 capítulos del plan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-normal">
            47 páginas organizadas de lo pequeño a lo grande, diseñadas para que cualquier persona
            pueda avanzar a su ritmo.
          </p>
        </div>

        {/* Grade das 7 partes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BOOK_SECTIONS.map((sec: SectionItem) => {
            const partImage = LOCAL_PART_IMAGES[sec.id]
            return (
              <article
                key={sec.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20 ring-1 ring-stone-200"
              >
                {/* Ilustração: largura total, altura automática (sem corte nem distorção) */}
                <div className="relative bg-stone-100 border-b border-stone-200">
                  {partImage ? (
                    <img
                      src={partImage}
                      alt={sec.title}
                      className="block w-full h-auto"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center text-6xl font-black text-stone-300">
                      {sec.id}
                    </div>
                  )}
                  {/* Número da parte em destaque */}
                  <div className="absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-stone-900 font-black text-lg shadow-md ring-2 ring-white">
                    {sec.id}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {sec.part}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">·</span>
                    <span className="text-xs font-semibold text-stone-500">{sec.pages}</span>
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                    {sec.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{sec.description}</p>

                  {/* Capítulos */}
                  <div className="mt-5 pt-4 border-t border-dashed border-stone-200">
                    <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-stone-400" />
                      Capítulos incluidos:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sec.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-amber-600 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Practical recap extra banner */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
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
    </section>
  )
}
