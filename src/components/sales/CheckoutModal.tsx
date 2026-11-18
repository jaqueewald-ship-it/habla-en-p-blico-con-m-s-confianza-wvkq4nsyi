import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Lock, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { buyersService } from '@/services/buyers'
import { PRODUCT_DATA } from '@/data/productData'

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!name.trim()) {
      setErrorMsg('Por favor, introduce tu nombre.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor, introduce un correo electrónico válido.')
      return
    }

    setIsSubmitting(true)

    try {
      const buyer = await buyersService.createBuyer({
        name: name.trim(),
        email: email.trim(),
        amount: PRODUCT_DATA.promoPrice,
        currency: 'EUR',
      })

      // Close modal and navigate to Thank You page with buyer state
      onOpenChange(false)
      navigate('/obrigado', {
        state: {
          buyerName: buyer.name,
          buyerEmail: buyer.email,
          purchaseDate: buyer.purchase_date,
          amount: buyer.amount,
        },
      })
    } catch (err: any) {
      console.error('Error saving buyer record in PocketBase:', err)
      // Provide a resilient fallback so checkout never completely blocks users
      navigate('/obrigado', {
        state: {
          buyerName: name.trim(),
          buyerEmail: email.trim(),
          purchaseDate: new Date().toISOString(),
          amount: PRODUCT_DATA.promoPrice,
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-stone-800 bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(28,25,23,1)]">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Checkout de Demostración
            </span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-stone-900">
            Completa tu pedido y accede al instante
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-stone-600">
            Ingresa tu nombre y correo para registrar tu compra y recibir acceso inmediato a la
            carpeta de Google Drive con todo el material.
          </DialogDescription>
        </DialogHeader>

        {/* Product recap box */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 my-2 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-stone-900">Habla en público con más confianza</p>
            <p className="text-stone-500 text-[11px]">Guía PDF + Audiobook + 2 Cuadernos</p>
          </div>
          <div className="text-right">
            <span className="line-through text-stone-400 text-[11px] block">97€</span>
            <span className="text-base font-black text-stone-900">27€</span>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5 text-left">
            <Label htmlFor="checkout-name" className="text-xs font-bold text-stone-800">
              Tu nombre completo
            </Label>
            <Input
              id="checkout-name"
              type="text"
              placeholder="Ej. Ana García"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-stone-300 focus:border-stone-900 text-sm h-11"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="checkout-email" className="text-xs font-bold text-stone-800">
              Tu correo electrónico (para recibir el acceso)
            </Label>
            <Input
              id="checkout-email"
              type="email"
              placeholder="ana.garcia@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-stone-300 focus:border-stone-900 text-sm h-11"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Demonstration Notice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Modo demostración activo:</strong> No se solicitarán datos de tarjeta de
              crédito reales. Al pulsar el botón, tu registro se guardará y accederás de inmediato
              al material.
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-sm font-black bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 rounded-xl shadow-[3px_3px_0px_0px_rgba(28,25,23,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Generando acceso al material...</span>
              </>
            ) : (
              <span>CONFIRMAR Y DESCARGAR POR 27€</span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Garantía de 30 días
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-stone-700" />
              Acceso a Google Drive
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
