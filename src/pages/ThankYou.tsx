import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  Headphones,
  BookOpen,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  ArrowLeft,
  Mail,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { PRODUCT_DATA } from '@/data/productData'
import { PRICE } from '@/config/checkout'

interface PurchaseState {
  buyerName?: string
  buyerEmail?: string
  purchaseDate?: string
}

const HOTMART_CHECKOUT_URL = 'YOUR_HOTMART_CHECKOUT_URL'

export default function ThankYou() {
  const location = useLocation()
  const state = (location.state as PurchaseState) || {}

  const [buyerName, setBuyerName] = useState<string>(state.buyerName || 'Estudiante')
  const [buyerEmail, setBuyerEmail] = useState<string>(state.buyerEmail || 'tu-correo@ejemplo.com')
  const [purchaseDate, setPurchaseDate] = useState<string>(
    state.purchaseDate
      ? new Date(state.purchaseDate).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-200">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation link back to sales page */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la página principal
          </Link>
        </div>

        {/* Success Header Card */}
        <div className="bg-white border-2 border-stone-800 rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border-2 border-stone-800 flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <Badge className="bg-amber-400 text-stone-900 font-black uppercase tracking-wider text-xs px-3 py-1 hover:bg-amber-400">
            ¡Compra Confirmada!
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
            ¡Enhorabuena, {buyerName}!
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            Tu acceso a <strong>"Habla en público con más confianza"</strong> ha quedado activado
            con éxito. Ya puedes abrir y descargar todos tus materiales desde la carpeta protegida
            de Google Drive.
          </p>

          {/* Buyer recap strip */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <Mail className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">
                <strong className="block text-stone-900 text-[11px]">Correo registrado:</strong>
                {buyerEmail}
              </span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <strong className="block text-stone-900 text-[11px]">Fecha de compra:</strong>
                {purchaseDate}
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-700 sm:col-span-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-stone-900 text-[11px]">Valor pagado:</strong>
                {PRICE.display} (USD) · Guía PDF + Audiobook incluido
              </div>
            </div>
          </div>

          {/* Primary Action Button: Link to Google Drive folder */}
          <div className="pt-4">
            <a
              href={PRODUCT_DATA.driveBonusLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              <FolderOpen className="w-6 h-6" />
              <span>ABRIR CARPETA EN GOOGLE DRIVE Y DESCARGAR</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <p className="text-xs text-stone-500 mt-2">
              Haz clic para abrir de inmediato la carpeta compartida con todo el contenido.
            </p>
          </div>
        </div>

        {/* Included Materials List */}
        <div className="bg-white border-2 border-stone-800 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(28,25,23,0.9)] space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Contenido listo para ti dentro de la carpeta:
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Encontrarás cada archivo listo para descargar a tu ordenador, móvil o tablet.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-stone-100">
            {/* Item 1: Guía principal */}
            <div className="pt-3 first:pt-0 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-sm">
                    Guía "Habla en público con más confianza" (PDF)
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-bold border-stone-300">
                    PDF 47 págs.
                  </Badge>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Las 7 partes ilustradas con esquemas, autodiagnóstico y el plan de los 21 días
                  completo.
                </p>
              </div>
            </div>

            {/* Item 2: Audiobook */}
            <div className="pt-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-sm">
                    Audiobook Completo de Alta Fidelidad (MP3)
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-bold border-stone-300">
                    Junto al producto
                  </Badge>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Narración completa de la guía con ejercicios guiados de respiración paso a paso.
                </p>
              </div>
            </div>

            {/* Item 3: Cuaderno de los 21 días */}
            <div className="pt-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 border border-purple-300 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-sm">
                    El Cuaderno de los 21 Días (PDF imprimible)
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-bold border-stone-300">
                    Regalo #1
                  </Badge>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Fichas para registrar tu nivel de ansiedad diario, escala de situaciones y
                  checklist de preparación.
                </p>
              </div>
            </div>

            {/* Item 4: 30 Fichas */}
            <div className="pt-3 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-stone-900 text-sm">
                    30 Esquemas de Discurso Listos para Rellenar (PDF)
                  </h3>
                  <Badge variant="outline" className="text-[10px] font-bold border-stone-300">
                    Regalo #2
                  </Badge>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Estructuras probadas para presentaciones laborales, exámenes orales, discursos
                  familiares y más.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions and Guarantee */}
        <div className="bg-stone-100 border border-stone-300 rounded-xl p-5 text-xs text-stone-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Soporte y Garantía de 7 días</span>
          </div>
          <p>
            Te sugerimos añadir el enlace de Google Drive a tus marcadores favoritos o guardar una
            copia local en tu dispositivo para tener acceso permanente incluso sin conexión a
            internet.
          </p>
          <p>
            Si tienes cualquier duda técnica o problema para acceder a la carpeta, estamos
            disponibles para ayudarte en todo momento.
          </p>
        </div>
      </div>
    </div>
  )
}
