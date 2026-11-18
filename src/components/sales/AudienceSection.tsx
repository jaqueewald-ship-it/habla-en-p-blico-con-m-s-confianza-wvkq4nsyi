import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react'
import { AUDIENCE_CARDS } from '@/data/productData'

export const AudienceSection: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'briefcase':
        return <Briefcase className="w-6 h-6 text-stone-900" />
      case 'graduation':
        return <GraduationCap className="w-6 h-6 text-stone-900" />
      default:
        return <Sparkles className="w-6 h-6 text-stone-900" />
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-50 text-amber-900 border-amber-300"
          >
            ¿Es este material para ti?
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Diseñado para quien necesita comunicar con serenidad y claridad
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal">
            No necesitas ser un orador profesional ni aspirar a dar charlas TED. Si tienes que
            hablar y quieres que no te tiemble la voz, este método es para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUDIENCE_CARDS.map((aud, idx) => (
            <Card
              key={idx}
              className="border-2 border-stone-800 bg-stone-50 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,0.9)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-300 border-2 border-stone-800 flex items-center justify-center mb-5">
                  {getIcon(aud.icon)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  {aud.subtitle}
                </span>
                <h3 className="text-xl font-black text-stone-900 leading-snug mb-3">{aud.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {aud.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-2 text-xs font-bold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paso a paso adaptado a tu situación</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
