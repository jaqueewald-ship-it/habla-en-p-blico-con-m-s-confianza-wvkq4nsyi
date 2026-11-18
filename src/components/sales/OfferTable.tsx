import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ShieldCheck, Zap, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { PRODUCT_DATA, BONUSES } from '@/data/productData'

interface OfferTableProps {
  onOpenCheckout: () => void
}

export const OfferTable: React.FC<OfferTableProps> = ({ onOpenCheckout }) => {
  return (
    <section id="oferta" className="py-20 bg-stone-100 border-t-2 border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-400 text-stone-900 border border-stone-800 hover:bg-amber-400">
            Oferta promocional de lanzamiento
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Todo lo que te llevas hoy en un solo paquete completo
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Acceso vitalicio inmediato a la guía digital, al audiobook y a los 2 cuadernos
            descargables en Google Drive.
          </p>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white border-2 border-stone-800 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-stone-900 text-stone-50 border-b-2 border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">
                Pack Completo Digital + Audiobook
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Habla en público con más confianza
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Plan práctico de 21 días + todos los materiales de apoyo
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="inline-block px-3 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                Ahorras 70€
              </span>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="divide-y divide-stone-200 text-sm">
            {/* Main book */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">
                    Guía "Habla en público con más confianza"
                  </span>
                  <span className="text-xs text-stone-500">
                    47 páginas ilustradas en 7 partes con esquemas visuales
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4 font-semibold text-stone-700">27,00€</div>
            </div>

            {/* Bonus 1: Audiobook */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block flex items-center gap-2">
                    Bonus #1: Audiobook Completo en MP3
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                      Gratis
                    </span>
                  </span>
                  <span className="text-xs text-stone-500">
                    Narración en alta calidad para escuchar donde quieras
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="line-through text-stone-400 text-xs mr-2">29,00€</span>
                <span className="font-bold text-emerald-700">0,00€</span>
              </div>
            </div>

            {/* Bonus 2: Cuaderno de Práctica */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block flex items-center gap-2">
                    Bonus #2: El Cuaderno de los 21 Días
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                      Gratis
                    </span>
                  </span>
                  <span className="text-xs text-stone-500">
                    Fichas imprimibles para seguimiento diario y termómetro de ansiedad
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="line-through text-stone-400 text-xs mr-2">19,00€</span>
                <span className="font-bold text-emerald-700">0,00€</span>
              </div>
            </div>

            {/* Bonus 3: 30 Esquemas */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block flex items-center gap-2">
                    Bonus #3: Las 30 Fichas de Discurso Rellenables
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                      Gratis
                    </span>
                  </span>
                  <span className="text-xs text-stone-500">
                    Guiones listos para reuniones, presentaciones, tesis y eventos
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="line-through text-stone-400 text-xs mr-2">22,00€</span>
                <span className="font-bold text-emerald-700">0,00€</span>
              </div>
            </div>

            {/* Extra: Actualizaciones y entrega inmediata */}
            <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">
                    Entrega inmediata en carpeta Google Drive + PDF alta resolución
                  </span>
                  <span className="text-xs text-stone-500">
                    Descarga en todos tus dispositivos y opción de imprimir sin restricciones
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4 font-bold text-emerald-700">Incluido</div>
            </div>
          </div>

          {/* Total & Price Bar */}
          <div className="p-6 sm:p-8 bg-stone-50 border-t-2 border-stone-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs text-stone-500 line-through">
                  Valor total por separado: 97,00€
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-stone-900 text-sm font-bold">Hoy por solo:</span>
                  <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                    27€
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    (pago único, sin suscripción)
                  </span>
                </div>
                <div className="text-xs text-emerald-700 font-bold mt-1">
                  ¡Ahorras 70€ con esta edición digital completa!
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  onClick={onOpenCheckout}
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>SÍ, QUIERO EL PLAN DE 21 DÍAS A 27€</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Badges footer */}
            <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-stone-800" />
                Acceso inmediato y seguro
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Garantía total de 30 días
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Entrega instantánea en Google Drive
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
