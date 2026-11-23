import React from 'react'
import { Sparkles } from 'lucide-react'
import heroMockup from '@/assets/mockup-produto-fundo-transparente-5d22d.webp'

export const HeroMockup: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-lg">
      {/* Background soft glow (valoriza o recorte transparente da imagem e ecoa o verde-escuro do mockup) */}
      <div
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-emerald-200/45 via-stone-100/40 to-emerald-100/45 blur-2xl -z-10"
        aria-hidden="true"
      />

      {/* Badge flutuante acima do mockup (fora da imagem, sem sobrepor o livro) */}
      <span className="relative z-10 mb-5 ml-3 flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/95 text-amber-900 border border-amber-300 backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        Edición Completa Digital
      </span>

      {/* Mockup principal: livro físico + livro de gestos + smartphone com Audiolibro
          (versão com fundo verde-escuro enviada pelo usuário; import estático para
          o Vite empacotar em dist/assets — o caminho /visual-edits/ de public/
          não ia no deploy e a imagem ficava sem carregar) */}
      <figure className="relative">
        <img
          src={heroMockup}
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
