import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Headphones, FileText, Lock, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
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

/** Formato do site, igual ao preço: "US$ 19.90" (espaço inquebrável) */
const formatUsd = (value: number): string => `US$\u00A0${value.toFixed(2)}`

const TOTAL_FICTITIOUS =
  FICTITIOUS_VALUES.guia +
  FICTITIOUS_VALUES.audiobook +
  FICTITIOUS_VALUES.material +
  FICTITIOUS_VALUES.bono * BONUS_CARDS.length

/** Valor riscado ao lado do nome do item; nunca quebra a linha do "$" */
const StrikePrice: React.FC<{ value: number }> = ({ value }) => (
  <span className="line-through text-stone-400 text-[11px] font-medium whitespace-nowrap">
    {formatUsd(value)}
  </span>
)

/** Linha compacta da lista de itens: check + nome + valor riscado + etiqueta */
const OfferRow: React.FC<{
  title: React.ReactNode
  detail?: React.ReactNode
  right?: React.ReactNode
  strike?: number
  tone?: 'included' | 'gift'
}> = ({ title, detail, right, strike, tone = 'included' }) => (
  <div className="px-3 py-2 sm:px-4 flex items-center justify-between gap-2 hover:bg-stone-50 transition-colors">
    <div className="flex items-start gap-2 min-w-0">
      <span
        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          tone === 'gift' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
        }`}
      >
        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
      </span>
      <div className="min-w-0">
        <span className="font-bold text-stone-900 block text-[12.5px] leading-snug">{title}</span>
        {detail ? (
          <span className="text-[11px] text-stone-500 leading-snug block">{detail}</span>
        ) : null}
      </div>
    </div>
    <div className="text-right shrink-0 flex items-center gap-1.5">
      {strike !== undefined ? <StrikePrice value={strike} /> : null}
      {right}
    </div>
  </div>
)

const IncludedPill: React.FC<{ icon?: React.ReactNode }> = ({ icon }) => (
  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 whitespace-nowrap">
    {icon}
    Incluido
  </span>
)

export const OfferTable: React.FC<OfferTableProps> = ({ onOpenCheckout }) => {
  return (
    <section id="oferta" className="py-6 sm:py-8 bg-stone-100 border-t-2 border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho compacto */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <Badge className="mb-1.5 px-3 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-400 text-stone-900 border border-stone-800 hover:bg-amber-400">
            Oferta única por tiempo limitado
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
            Todo lo que te llevas hoy por solo {PRICE.display}
          </h2>
          <p className="mt-1.5 text-stone-600 text-[12.5px] sm:text-sm leading-snug">
            Guía PDF, audiobook y material adicional, más los regalos exclusivos. Entrega inmediata
            vía Hotmart. Pago único, sin suscripciones.
          </p>
        </div>

        {/* Pricing Table Card: duas colunas no desktop, empilhado no celular */}
        <div className="bg-white border-2 border-stone-800 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(28,25,23,1)] lg:grid lg:grid-cols-[1fr_290px]">
          {/* Coluna da lista de itens */}
          <div className="min-w-0">
            {/* Header */}
            <div className="px-3 py-3 sm:px-4 bg-stone-900 text-stone-50 border-b-2 border-stone-800">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                Pack Completo Digital
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 leading-tight">
                Habla en público con más confianza
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                Guía PDF + audiobook + material adicional "Gestos que construyen autoridad" + 6
                bonos digitales
              </p>
            </div>

            {/* Itens principais */}
            <div className="divide-y divide-stone-200 text-sm">
              {/* Produto principal: Guia */}
              <OfferRow
                strike={FICTITIOUS_VALUES.guia}
                right={<IncludedPill icon={<FileText className="w-3 h-3" />} />}
                title={
                  <span>
                    Guía "Habla en público con más confianza" (PDF)
                    <span className="text-[11px] text-stone-500 font-normal">
                      {' '}
                      · 85 páginas en 7 partes
                    </span>
                  </span>
                }
              />

              {/* Produto principal: Audiobook (NÃO é bônus) */}
              <OfferRow
                strike={FICTITIOUS_VALUES.audiobook}
                right={<IncludedPill />}
                title={
                  <span className="flex items-center gap-1.5 flex-wrap">
                    <Headphones className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    Audiobook en español
                    <span className="text-[9px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                      Junto al producto
                    </span>
                  </span>
                }
                detail="Reproductor en línea, para escuchar donde quieras"
              />

              {/* Extra: entrega inmediata */}
              <OfferRow
                title="Entrega inmediata del PDF por Hotmart + alta resolución"
                detail="Descarga en todos tus dispositivos e impresión sin restricciones"
                right={
                  <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
                    Incluido
                  </span>
                }
              />
            </div>

            {/* Linha própria do material adicional (NÃO é bônus): antes da lista de bônus */}
            <div className="border-t-2 border-stone-800">
              <OfferRow
                strike={FICTITIOUS_VALUES.material}
                right={<IncludedPill />}
                title={
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">
                    Material adicional del producto principal
                  </span>
                }
                detail="Gestos que construyen autoridad — atlas visual con 20 comparaciones A/B y 5 simulaciones para practicar gestos, postura, mirada y voz."
              />
            </div>

            {/* Lista de bônus com valor fictício riscado (os cards acima permanecem sem valores) */}
            <div className="divide-y divide-stone-200 border-t-2 border-stone-800">
              {BONUS_CARDS.map((bonus) => (
                <OfferRow
                  key={bonus.number}
                  tone="gift"
                  strike={FICTITIOUS_VALUES.bono}
                  title={
                    <span>
                      Bono {bonus.number} · {bonus.title}
                    </span>
                  }
                  right={
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 whitespace-nowrap">
                      Regalo
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          {/* Coluna do preço e botão */}
          <div className="p-4 sm:p-5 bg-stone-50 border-t-2 lg:border-t-0 lg:border-l-2 border-stone-800 flex flex-col justify-center">
            <div className="flex flex-col items-center text-center gap-2.5">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-stone-600 text-xs font-medium whitespace-nowrap">
                  Valor total:
                  <span className="line-through text-stone-400 ml-1.5 font-bold whitespace-nowrap">
                    {formatUsd(TOTAL_FICTITIOUS)}
                  </span>
                </span>
                <span className="text-stone-700 text-[9px] font-black uppercase tracking-wider mt-1">
                  PRECIO DE HOY
                </span>
                <span className="inline-block px-3 py-1 rounded-lg bg-amber-400 border-2 border-stone-900 text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-none whitespace-nowrap">
                  {PRICE.display}
                </span>
                <span className="text-xs text-stone-700 font-semibold mt-1">
                  Pago único · sin suscripción
                </span>
                <span className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  Guía PDF + Audiobook + regalos, un solo precio
                </span>
              </div>

              <div className="w-full">
                <Button
                  onClick={onOpenCheckout}
                  size="lg"
                  className="w-full h-auto min-h-12 whitespace-normal px-4 sm:px-6 py-2.5 text-sm leading-tight text-center font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span className="text-balance">SÍ, QUIERO EL PLAN DE 21 DÍAS</span>
                  <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                </Button>
              </div>

              {/* Badges footer */}
              <div className="pt-2.5 border-t border-stone-200 w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-stone-600 font-medium">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-stone-800" />
                  Compra segura vía Hotmart
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Garantía total de 7 días
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-600" />
                  Entrega instantánea por Hotmart
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
