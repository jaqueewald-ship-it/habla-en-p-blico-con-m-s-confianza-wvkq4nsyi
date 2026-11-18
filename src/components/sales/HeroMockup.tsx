import React from 'react'
import { BookOpen, Headphones, Sparkles, CheckCircle2 } from 'lucide-react'

export const HeroMockup: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none">
      {/* Background soft glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-200/40 via-orange-100/30 to-amber-100/40 blur-2xl -z-10" />

      {/* Main product visual container */}
      <div className="relative bg-white border-2 border-stone-800 rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
        {/* Top badge */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Edición Completa Digital
            </span>
          </div>
          <span className="text-xs font-semibold text-stone-500">Plan 21 Días</span>
        </div>

        {/* Central Book Showcase */}
        <div className="pt-6 pb-4">
          <div className="relative mx-auto max-w-xs bg-gradient-to-b from-stone-50 to-stone-100 border-2 border-stone-800 rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(28,25,23,0.8)]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-amber-700 mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Guía Ilustrada · 47 Páginas
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              Habla en público con más confianza
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed font-medium">
              Un plan práctico de 21 días para organizar tus ideas, entrenar tu voz y aprender a
              manejar los nervios.
            </p>

            {/* Illustration doodle representation */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-stone-300 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400 flex items-center justify-center shrink-0">
                <span className="text-xl font-black text-amber-700">21d</span>
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-stone-800 block">7 partes ilustradas</span>
                <span className="text-stone-500">Respiración · Voz · Discurso · Mirada</span>
              </div>
            </div>

            {/* Included badges */}
            <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap gap-2 text-[11px] font-semibold text-stone-700">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Guía PDF HD
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                <Headphones className="w-3 h-3 text-sky-600" />
                Audiobook MP3
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                <Sparkles className="w-3 h-3 text-purple-600" />2 Cuadernos extra
              </span>
            </div>
          </div>
        </div>

        {/* Floating bonus notification card */}
        <div className="mt-4 bg-stone-900 text-stone-50 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-black text-sm shrink-0">
              +2
            </div>
            <div>
              <p className="font-bold text-white leading-snug">2 Regalos incluidos</p>
              <p className="text-stone-300 text-[11px]">
                Cuaderno de práctica + 30 esquemas listos
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="line-through text-stone-400 text-[11px] block">97€</span>
            <span className="text-amber-400 font-black text-sm">27€</span>
          </div>
        </div>

        {/* Footnote stamp */}
        <div className="mt-4 text-center">
          <p className="text-[11px] font-medium text-stone-500">
            Descarga inmediata tras la compra · Compatible con PC, móvil y tablet
          </p>
        </div>
      </div>
    </div>
  )
}
