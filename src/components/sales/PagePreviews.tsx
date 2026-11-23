import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Sparkles, ZoomIn, X } from 'lucide-react'
import sampleEstructura from '@/assets/pagina21guiaestructuraentrespartes-b509f.webp'
import sampleManos from '@/assets/pagina09gestoslasmanosenunareunion-0e873.webp'

interface PagePreviewsProps {
  onSelectCta: () => void
}

// Amostras "por dentro": as DUAS páginas anexadas pelo autor, e somente elas
// (não duplicar na seção das 7 partes).
//   - Guia principal, p. 21: "La estructura en tres partes"
//   - Material adicional, p. 05: "Las manos en una reunión"
const SAMPLE_PAGES: { id: string; src: string; source: string; caption: string }[] = [
  {
    id: 'sample-estructura',
    src: sampleEstructura,
    source: 'Guía principal · pág. 21',
    caption: 'La estructura en tres partes',
  },
  {
    id: 'sample-manos',
    src: sampleManos,
    source: 'Material adicional · pág. 05',
    caption: 'Las manos en una reunión',
  },
]

export const PagePreviews: React.FC<PagePreviewsProps> = ({ onSelectCta }) => {
  const [zoomed, setZoomed] = useState<{ src: string; caption: string } | null>(null)

  return (
    <section id="previa" className="py-20 bg-stone-900 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Así es por dentro
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Páginas reales del material
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Nada de promesas vacías: mira directamente cómo se ve la guía por dentro y cómo se
            integra el material adicional que acompaña tu práctica.
          </p>
        </div>

        {/* As duas amostras anexadas, com opção de ampliar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
          {SAMPLE_PAGES.map((page) => (
            <figure
              key={page.id}
              className="group relative bg-white border-2 border-stone-800 rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(28,25,23,0.85)] hover:shadow-[7px_7px_0px_0px_rgba(28,25,23,1)] transition-shadow"
            >
              <button
                type="button"
                onClick={() => setZoomed({ src: page.src, caption: page.caption })}
                className="block w-full cursor-zoom-in bg-white p-2 text-left"
                aria-label={`Ampliar página: ${page.caption}`}
              >
                <img
                  src={page.src}
                  alt={`Página de muestra: ${page.caption}`}
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </button>
              <figcaption className="p-3 text-[11px] font-semibold text-stone-600 border-t-2 border-stone-800 bg-stone-50 flex items-center justify-between gap-2">
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                    {page.source}
                  </span>
                  {page.caption}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-700 bg-stone-200 px-2 py-1 rounded shrink-0">
                  <ZoomIn className="w-3 h-3" />
                  Ampliar
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Nota: audiobook acessível pelo navegador, não é bônus */}
        <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-xl p-4">
          <BookOpen className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-900 leading-relaxed">
            <strong>Audiobook incluido:</strong> se escucha en español desde un reproductor en
            línea, directamente en el navegador — viene junto con la guía de 85 páginas, sin
            descargas ni productos aparte.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button
            onClick={onSelectCta}
            size="lg"
            className="px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            VER LA OFERTA COMPLETA
          </Button>
        </div>
      </div>

      {/* Lightbox de ampliação */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-sm p-4"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Página ampliada: ${zoomed.caption}`}
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-stone-800 transition-colors"
            aria-label="Cerrar página ampliada"
          >
            <X className="w-5 h-5" />
          </button>
          <figure
            className="max-w-3xl w-full max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomed.src}
              alt={`Página ampliada: ${zoomed.caption}`}
              className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg bg-white shadow-2xl"
            />
            <figcaption className="text-xs font-semibold text-stone-200">
              {zoomed.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
