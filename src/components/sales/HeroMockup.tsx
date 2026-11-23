import React from 'react'
import { Sparkles } from 'lucide-react'
import heroMockup from '@/assets/mockupherohablagestosterracota-9a39e.webp'

export const HeroMockup: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-lg">
      {/* Background soft glow (valoriza o recorte transparente da imagem) */}
      <div
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-amber-200/50 via-orange-100/40 to-amber-100/50 blur-2xl -z-10"
        aria-hidden="true"
      />

      {/* Badge flutuante acima do mockup (fora da imagem, sem sobrepor o livro) */}
      <span className="relative z-10 mb-5 ml-3 flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/95 text-amber-900 border border-amber-300 backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Edición Completa Digital
      </span>

      {/* Mockup principal: livro físico + smartphone com Audiolibro (imagem real) */}
      <figure className="relative">
        <img
          src="/visual-edits/mockup-habla-gestos-audiolibro-transparente-35399990.webp"
          alt="Mockup con los libros Habla en público con más confianza y Gestos que construyen autoridad junto a un smartphone mostrando el reproductor del audiolibro en español"
          className="w-full h-auto drop-shadow-[0_18px_35px_rgba(28,25,23,0.25)]"
          loading="eager"
          decoding="async"
        />
      </figure>

      {/* Nota de entrega: PDF é download; audiolibro é reprodutor em linha */}
      <p className="mt-5 text-center text-[11px] font-medium text-stone-500">
        PDF de 85 páginas descargable inmediatamente · Audiolibro desde el navegador · Compatible
        con PC, móvil y tablet
      </p>
    </div>
  )
}
