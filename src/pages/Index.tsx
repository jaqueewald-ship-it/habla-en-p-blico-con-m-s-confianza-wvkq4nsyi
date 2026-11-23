import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Sparkles, Lock, ArrowRight, Headphones, BookOpen } from 'lucide-react'
import { PRODUCT_DATA } from '@/data/productData'
import { useCheckoutAction } from '@/hooks/useCheckoutAction'
import { HeroMockup } from '@/components/sales/HeroMockup'
import { PagePreviews } from '@/components/sales/PagePreviews'
import { ComparisonSection } from '@/components/sales/ComparisonSection'
import { TableOfContents } from '@/components/sales/TableOfContents'
import { AdditionalMaterialSection } from '@/components/sales/AdditionalMaterialSection'
import { OfferTable } from '@/components/sales/OfferTable'
import { BonusCards } from '@/components/sales/BonusCards'
import { AudienceSection } from '@/components/sales/AudienceSection'
import { GuaranteeSection } from '@/components/sales/GuaranteeSection'
import { FaqSection } from '@/components/sales/FaqSection'
import { CheckoutModal } from '@/components/sales/CheckoutModal'

export default function Index() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const navigate = useNavigate()

  // Se a Hotmart estiver configurada, abre o link direto; senão, abre o modal demo
  const { handleBuyClick } = useCheckoutAction(() => setCheckoutOpen(true))

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans selection:bg-amber-200">
      {/* Top Banner - Urgency notice similar to Studio Facile */}
      <div className="bg-stone-900 text-stone-100 py-2.5 px-4 text-xs font-semibold text-center border-b border-stone-800">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-stone-900 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
            Oferta Especial
          </span>
          <span>Guía PDF de 85 páginas + Audiobook incluido, acceso digital vitalicio</span>
          <button
            onClick={handleBuyClick}
            className="underline underline-offset-2 hover:text-amber-300 ml-1 text-[11px] font-bold"
          >
            Aprovechar oferta →
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 border-2 border-stone-900 flex items-center justify-center font-black text-stone-900 text-sm shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
              21
            </div>
            <div className="leading-tight">
              <span className="text-sm font-black text-stone-900 block tracking-tight">
                Habla en Público
              </span>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                con más confianza
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <a href="#previa" className="hover:text-stone-900 transition-colors">
              Páginas por dentro
            </a>
            <a href="#temario" className="hover:text-stone-900 transition-colors">
              Las 7 partes
            </a>
            <a href="#oferta" className="hover:text-stone-900 transition-colors">
              Oferta
            </a>
            <a href="#faq" className="hover:text-stone-900 transition-colors">
              Preguntas
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <a href="#oferta" className="hover:text-stone-900 transition-colors">
              Oferta
            </a>
          </div>
          <div>
            <Button
              onClick={handleBuyClick}
              size="sm"
              className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-black border-2 border-stone-900 text-xs shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] rounded-lg px-4"
            >
              Comprar
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />1 ejercicio al día · Plan de 21
                días
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.08]">
                Habla en público con más confianza
              </h1>

              <p className="text-lg sm:text-xl font-medium text-stone-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Una guía ilustrada con un plan práctico de 21 días, acompañada por un audiolibro en
                español y el material adicional 'Gestos que construyen autoridad', integrado al
                recorrido.
              </p>

              <p className="text-sm sm:text-base font-semibold text-stone-800 leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-4 border-amber-400 pl-4">
                Guía principal + audiolibro en español desde el navegador + atlas visual de gestos,
                postura, mirada y voz.
              </p>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Reuniones de trabajo, exámenes orales, presentaciones o brindis: el corazón
                acelerado y la voz temblorosa no son un defecto; son una alarma fisiológica que se
                puede entrenar con esquemas claros.
              </p>

              {/* Primary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  onClick={handleBuyClick}
                  size="lg"
                  className="w-full sm:w-auto px-8 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>QUIERO EL PLAN DE LOS 21 DÍAS</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="text-xs text-stone-500 font-semibold text-center sm:text-left">
                  <span className="block text-stone-800 font-bold">Pago único</span>
                  <span>Sin suscripción ni cargos extra</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-stone-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-900" />
                  Acceso inmediato
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Garantía de 7 días
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  Guía PDF de 85 páginas
                </span>
                <span className="flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-sky-600" />
                  Audiobook incluido
                </span>
              </div>
            </div>

            {/* Right Mockup */}
            {/* Mockup da hero: junto ao texto no desktop; abaixo, centrado, no mobile */}
            <div className="lg:col-span-5">
              <HeroMockup />
            </div>
          </div>

          {/* 4 Feature Value Pillars below Hero */}
          <div className="mt-16 pt-12 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-stone-800 rounded-xl p-5 shadow-[3px_3px_0px_0px_rgba(28,25,23,0.8)]"
              >
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300">
                  {stat.badge}
                </span>
                <h3 className="font-black text-stone-900 text-base mt-2.5">{stat.title}</h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE PREVIEWS SECTION */}
      <PagePreviews onSelectCta={handleBuyClick} />

      {/* COMPARISON OLD VS NEW WAY */}
      <ComparisonSection />

      {/* TABLE OF CONTENTS - 7 PARTS */}
      <TableOfContents />

      {/* MATERIAL ADICIONAL: nova dobra própria (depois das 7 partes, antes da oferta) */}
      <AdditionalMaterialSection onOpenCheckout={handleBuyClick} />

      {/* REPEATED CTA BANNER 1 */}
      <section className="py-12 bg-amber-50 text-stone-900 border-t-2 border-b-2 border-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Badge className="bg-amber-400 text-stone-900 font-bold uppercase tracking-wider text-xs hover:bg-amber-400">
            Paso a paso, a tu ritmo
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Un recorrido en 3 semanas, paso a paso
          </h2>
          <p className="text-stone-700 text-sm max-w-2xl mx-auto">
            En lugar de esperar a que la angustia desaparezca por sí sola, sigue el plan: una semana
            para el cuerpo, una para el discurso y una para hablar ante los demás.
          </p>
          <div className="pt-2">
            <Button
              onClick={handleBuyClick}
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-black px-8 py-6 rounded-xl border-2 border-amber-300 shadow-[4px_4px_0px_0px_rgba(245,158,11,1)]"
            >
              VER LA OFERTA COMPLETA
            </Button>
          </div>
        </div>
      </section>

      {/* AUDIENCE SECTION: FOR WHOM */}
      <AudienceSection />

      {/* REGALOS INCLUIDOS: seção dos 6 bônus com capas, ANTES da oferta */}
      <section className="py-20 bg-stone-100 border-t-2 border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BonusCards />
        </div>
      </section>

      {/* OFFER TABLE & PRICING (valores riscados, total e preço) */}
      <OfferTable onOpenCheckout={handleBuyClick} />

      {/* GUARANTEE 7 DAYS */}
      <GuaranteeSection onOpenCheckout={handleBuyClick} />

      {/* FAQ SECTION */}
      <FaqSection />

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-stone-900 text-stone-100 border-t-2 border-stone-800">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-900 font-black text-2xl flex items-center justify-center mx-auto border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            21
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Una última cosa antes de que decidas...
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            No tienes que volver a decir que no cada vez que te pidan hablar. No tienes que volver a
            sentir que la voz desaparece a mitad de frase. Y definitivamente{' '}
            <strong>
              no tienes que esperar a que «esta vez salga mejor» sin un método probado
            </strong>
            .
          </p>
          <p className="text-stone-300 text-sm sm:text-base">
            Hay un camino más sencillo, práctico y respaldado por la fisiología. Y está a un clic de
            distancia.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleBuyClick}
              size="lg"
              className="w-full sm:w-auto px-10 py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)]"
            >
              SÍ, QUIERO HABLAR EN PÚBLICO CON MÁS CONFIANZA
            </Button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-400">
            <span>Garantía total de 7 días</span>
            <span>·</span>
            <span>Entrega del PDF por Hotmart</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-100 text-stone-600 py-10 text-xs border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 text-center">
          <div>
            <span className="font-bold text-stone-900 block text-sm">
              Habla en público con más confianza
            </span>
            <span className="text-stone-600 text-[11px]">
              El plan práctico de 21 días · Guía en PDF de 85 páginas, audiobook y fichas de
              trabajo.
            </span>
          </div>

          <div className="text-[11px] text-stone-600">
            <p>Todos los derechos reservados © {new Date().getFullYear()}</p>
            <p className="mt-0.5">Entrega digital instantánea por Hotmart.</p>
            <p className="mt-1">
              <Link
                to="/hostinger"
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                Hostinger
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Checkout Modal (usado enquanto o link da Hotmart não está configurado) */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={({ name, email }) => {
          setCheckoutOpen(false)
          navigate('/obrigado', {
            state: { buyerName: name, buyerEmail: email, purchaseDate: new Date().toISOString() },
          })
        }}
      />
    </div>
  )
}
