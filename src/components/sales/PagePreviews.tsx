import React from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Headphones, Sparkles, ZoomIn } from 'lucide-react'
import { GALLERY_IMAGES, driveImageUrl } from '@/data/driveImages'

interface PagePreviewsProps {
  onSelectCta: () => void
}

// Mockups originais do material (pasta 01_Galeria no Google Drive):
// portada, introducción y día 01.

export const PagePreviews: React.FC<PagePreviewsProps> = ({ onSelectCta }) => {
  return (
    <section id="previa" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Así es por dentro
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Páginas reales del material
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Nada de promesas vacías: mira directamente cómo se ve la guía ilustrada por dentro y
            cómo llega a ti, junto con el audiobook completo.
          </p>
        </div>

        {/* 3 mockups do material + audiobook cover */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {GALLERY_IMAGES.map((page, idx) => (
            <figure
              key={page.id}
              className="group relative bg-white border-2 border-stone-800 rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(28,25,23,0.85)] hover:shadow-[7px_7px_0px_0px_rgba(28,25,23,1)] transition-shadow"
            >
              <div className="relative aspect-[3/4] bg-white">
                <img
                  src={driveImageUrl(page.id)}
                  alt={page.caption}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-stone-900/80 px-2 py-1 rounded">
                    <ZoomIn className="w-3 h-3" />
                    Página {idx + 1}
                  </span>
                </div>
              </div>
              <figcaption className="p-3 text-[11px] font-semibold text-stone-600 border-t-2 border-stone-800 bg-stone-50">
                {page.caption}
              </figcaption>
            </figure>
          ))}

          {/* Audiobook cover — visual do app (fundo escuro, âmbar) */}
          <figure className="group relative bg-stone-900 border-2 border-stone-800 rounded-xl overflow-hidden shadow-[5px_5px_0px_0px_rgba(28,25,23,0.85)] hover:shadow-[7px_7px_0px_0px_rgba(28,25,23,1)] transition-shadow text-white">
            <div className="relative aspect-[3/4] bg-stone-900">
              <img
                src="/previews/audiobook.svg"
                alt="Audiobook: Habla en público con más confianza"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-900 px-2 py-1 rounded">
                  <Headphones className="w-3 h-3" />
                  Audiobook MP3
                </span>
              </div>
            </div>
            <figcaption className="p-3 text-[11px] font-semibold bg-amber-50 text-stone-900 border-t-2 border-stone-800">
              Audiobook completo · narración de toda la guía
            </figcaption>
          </figure>
        </div>

        {/* Note: audiobook is part of the main product, NOT a bonus */}
        <div className="mt-8 max-w-2xl mx-auto flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-xl p-4">
          <Headphones className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-900 leading-relaxed">
            <strong>El audiobook viene con la guía:</strong> al comprar, recibes juntos el PDF
            ilustrado y el audiobook completo — no son productos separados ni regalos aparte.
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
    </section>
  )
}
