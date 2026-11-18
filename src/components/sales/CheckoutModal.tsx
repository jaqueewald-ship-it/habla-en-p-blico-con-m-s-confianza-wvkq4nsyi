import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Loader2, Lock, ShieldCheck, Sparkles, X } from 'lucide-react'
import { buyersService } from '@/services/buyers'
import { extractFieldErrors, getErrorMessage } from '@/lib/pocketbase/errors'
import { PRICE } from '@/config/checkout'

interface CheckoutModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (data: { name: string; email: string }) => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose, onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError('Por favor, completa tu nombre y tu correo electrónico.')
      return
    }

    setLoading(true)
    try {
      await buyersService.createBuyer({
        name,
        email,
        amount: PRICE.amount,
        currency: PRICE.currencyLabel,
      })
      onSuccess({ name: name.trim(), email: email.trim() })
      setName('')
      setEmail('')
    } catch (err) {
      const fieldErrors = extractFieldErrors(err)
      if (Object.keys(fieldErrors).length > 0) {
        setError(Object.values(fieldErrors)[0])
      } else {
        setError(getErrorMessage(err))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
      {/* Card */}
      <div className="relative w-full max-w-lg bg-white border-2 border-stone-800 rounded-2xl shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 pb-5 border-b border-stone-200">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Pack completo · Guía PDF + Audiobook
            </span>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Confirma tu acceso por {PRICE.display}
            </h2>
            <p className="text-xs text-stone-500">
              Pago único · acceso inmediato a todos los materiales
            </p>
          </div>

          {/* Summary */}
          <div className="mt-5 bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-600 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Guía "Habla en público con más confianza" (PDF)
              </span>
              <span className="font-bold text-emerald-700">Incluido</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Audiobook completo (MP3) — junto al producto
              </span>
              <span className="font-bold text-emerald-700">Incluido</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Cuaderno de los 21 días + 30 esquemas (regalos)
              </span>
              <span className="font-bold text-amber-700">Gratis</span>
            </div>
            <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between">
              <span className="font-black text-stone-900">Total hoy</span>
              <span className="font-black text-stone-900 text-lg">{PRICE.display}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="checkout-name" className="text-xs font-bold text-stone-800">
                Tu nombre
              </Label>
              <Input
                id="checkout-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="María García"
                className="border-stone-300 focus-visible:ring-amber-400"
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="checkout-email" className="text-xs font-bold text-stone-800">
                Tu correo electrónico
              </Label>
              <Input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@ejemplo.com"
                className="border-stone-300 focus-visible:ring-amber-400"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-base font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                `CONFIRMAR Y DESCARGAR POR ${PRICE.display}`
              )}
            </Button>
          </form>

          {/* Footer badges */}
          <div className="mt-5 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-stone-600">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-stone-800" />
              Compra segura vía Hotmart
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Garantía de 7 días
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              Entrega instantánea
            </span>
          </div>

          <p className="mt-3 text-center text-[10px] text-stone-400 leading-relaxed">
            Al confirmar, recibirás el PDF, el audiobook y los materiales directamente por Hotmart,
            en tu área de comprador.
          </p>
        </div>
      </div>
    </div>
  )
}
