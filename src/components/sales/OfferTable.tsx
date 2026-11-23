import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Headphones, FileText, Lock, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import { PRODUCT_DATA } from '@/data/productData'
import { PRICE } from '@/config/checkout'
import { BONUS_CARDS } from '@/components/sales/BonusCards'

interface OfferTableProps {
  onOpenCheckout: () => void
}

/** Valores fictícios (riscados) de cada item da oferta — só para comparação de valor.
 *  O preço real continua sendo PRICE.display (src/config/checkout.ts). */
const FICTITIOUS_VALUES = {
  guia: 19.9,
  audiobook: 14.9,
  material: 12.9,
  bono: 9.9,
} as const

/** Formato do site: vírgula decimal e espaço inquebrável antes do $ */
const formatUsd = (value: number): string => `${value.toFixed(2).replace('.', ',')}\u00A0$`

const TOTAL_FICTITIOUS =
  FICTITIOUS_VALUES.guia +
  FICTITIOUS_VALUES.audiobook +
  FICTITIOUS_VALUES.material +
  FICTITIOUS_VALUES.bono * BONUS_CARDS.length

/** Valor riscado ao lado do nome do item; nunca quebra a linha do "$" */
const StrikePrice: React.FC<{ value: number }> = ({ value }) => (
  <span className="line-through text-stone-400 text-xs font-medium whitespace-nowrap">
    {formatUsd(value)}
  </span>
)

export const OfferTable: React.FC<OfferTableProps> = ({ onOpenCheckout }) => {
  return (
    <section id="oferta" className="py-20 bg-stone-100 border-t-2 border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="mb-3 px-3.5 py-1 text-xs uppercase tracking-wider font-bold bg-amber-400 text-stone-900 border border-stone-800 hover:bg-amber-400">
            Oferta única por tiempo limitado
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Todo lo que te llevas hoy por solo {PRICE.display}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            El producto principal (guía PDF + audiobook con material adicional de práctica) y los
            regalos exclusivos, con entrega inmediata vía Hotmart. Todo por un único pago — sin
            suscripciones.
          </p>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white border-2 border-stone-800 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-stone-900 text-stone-50 border-b-2 border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">
                Pack Completo Digital
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Habla en público con más confianza
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Guía PDF + audiobook + material adicional "Gestos que construyen autoridad" + 6
                bonos digitales
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="inline-block px-3 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                Pago único
              </span>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="divide-y divide-stone-200 text-sm">
            {/* Produto principal: Guia */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">
                    Guía "Habla en público con más confianza" (PDF)
                  </span>
                  <span className="text-xs text-stone-500">
                    85 páginas en 7 partes con esquemas claros
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 flex items-center gap-3">
                <StrikePrice value={FICTITIOUS_VALUES.guia} />
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <FileText className="w-3 h-3" />
                  Incluido
                </span>
              </div>
            </div>

            {/* Produto principal: Audiobook (NÃO é bônus) */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-sky-600" />
                    Audiobook en español
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.2 rounded">
                      Junto al producto
                    </span>
                  </span>
                  <span className="text-xs text-stone-500">
                    Reproductor en línea desde el navegador, para escuchar donde quieras
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 flex items-center gap-3">
                <StrikePrice value={FICTITIOUS_VALUES.audiobook} />
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  Incluido
                </span>
              </div>
            </div>

            {/* Extra: entrega inmediata */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">
                    Entrega inmediata del PDF por Hotmart + alta resolución
                  </span>
                  <span className="text-xs text-stone-500">
                    Descarga en todos tus dispositivos y opción de imprimir sin restricciones
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4 font-bold text-emerald-700">Incluido</div>
            </div>
          </div>

          {/* Linha própria do material adicional (NÃO é bônus): antes da lista de bônus */}
          <div className="p-4 sm:p-5 flex items-center justify-between gap-4 border-t-2 border-stone-800 hover:bg-stone-50 transition-colors">
            <div className="flex items-start gap-3 min-w-0">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <div>
                <span className="font-bold text-stone-900 block text-[11px] sm:text-xs uppercase tracking-wider">
                  Material adicional del producto principal
                </span>
                <span className="text-xs text-stone-500">
                  Gestos que construyen autoridad — atlas visual con 20 comparaciones A/B y 5
                  simulaciones para practicar gestos, postura, mirada y voz.
                </span>
              </div>
            </div>
            <div className="text-right shrink-0 flex items-center gap-3">
              <StrikePrice value={FICTITIOUS_VALUES.material} />
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                Incluido
              </span>
            </div>
          </div>

          {/* Lista de bônus com valor fictício riscado (os cards abaixo permanecem sem valores) */}
          <div className="divide-y divide-stone-200 text-sm border-t-2 border-stone-800">
            {BONUS_CARDS.map((bonus) => (
              <div
                key={bonus.number}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 block">
                      Bono {bonus.number} · {bonus.title}
                    </span>
                    <span className="text-xs text-stone-500">Regalo incluido</span>
                  </div>
                </div>
                <div className="text-right shrink-0 flex items-center gap-3">
                  <StrikePrice value={FICTITIOUS_VALUES.bono} />
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                    Regalo
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Price Bar */}
          <div className="p-6 sm:p-8 bg-stone-50 border-t-2 border-stone-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-2 mt-1">
                  <span className="text-stone-600 text-sm font-medium whitespace-nowrap">
                    Valor total:
                    <span className="line-through text-stone-400 ml-1.5 font-bold whitespace-nowrap">
                      {formatUsd(TOTAL_FICTITIOUS)}
                    </span>
                  </span>
                  <span className="text-stone-900 text-sm font-bold whitespace-nowrap">
                    Todo hoy por solo:
                  </span>
                  <span className="inline-block px-3 py-1 rounded-lg bg-amber-400 border-2 border-stone-900 text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-none whitespace-nowrap">
                    {PRICE.display}
                  </span>
                </div>
                <div className="text-xs text-stone-500 font-medium mt-2">
                  (pago único, sin suscripción)
                </div>
                <div className="text-xs text-emerald-700 font-bold mt-1">
                  Guía PDF + Audiobook + regalos, un solo precio
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  onClick={onOpenCheckout}
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>SÍ, QUIERO EL PLAN DE 21 DÍAS POR {PRICE.display}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Badges footer */}
            <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-stone-800" />
                Compra segura vía Hotmart
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Garantía total de 7 días
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Entrega instantánea por Hotmart
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
