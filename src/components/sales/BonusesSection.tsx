import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BONUSES, BonusItem } from '@/data/productData'
import { Gift, Headphones, FileSpreadsheet, Check, Sparkles } from 'lucide-react'

export const BonusesSection: React.FC = () => {
  return (
    <section id="bonus" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-50 text-amber-900 border-amber-300"
          >
            <Gift className="w-3.5 h-3.5 mr-1 text-amber-600 inline" />
            Materiales complementarios de regalo
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Pero eso no es todo: hoy te llevas 3 regalos exclusivos incluidos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal">
            Con un valor combinado de 70€ por separado, directos a tu carpeta de Google Drive sin
            coste adicional.
          </p>
        </div>

        {/* 3 Bonus cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BONUSES.map((bonus: BonusItem) => (
            <Card
              key={bonus.id}
              className="border-2 border-stone-800 bg-stone-50/50 rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(28,25,23,0.9)] flex flex-col justify-between"
            >
              <div>
                <div className="p-5 bg-stone-100 border-b border-stone-200">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-amber-700 uppercase tracking-wider">
                      Regalo #{bonus.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-stone-300 text-stone-800 font-extrabold text-[11px]">
                      Valor: {bonus.value}€
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 leading-snug">{bonus.title}</h3>
                  <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {bonus.badge}
                  </span>
                </div>

                <CardContent className="p-5">
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{bonus.description}</p>
                  <ul className="space-y-2">
                    {bonus.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <div className="p-4 bg-emerald-50 border-t border-emerald-100 text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  GRATIS con tu pedido hoy
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
