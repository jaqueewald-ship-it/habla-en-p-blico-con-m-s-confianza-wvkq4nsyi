import { openHotmartCheckout } from '@/config/checkout'

/**
 * Hook central de compra: se o link da Hotmart estiver configurado em
 * src/config/checkout.ts, abre a Hotmart diretamente (nova aba); senão,
 * chama o callback que abre o modal de checkout de demonstração.
 */
export const useCheckoutAction = (openDemoModal: () => void) => {
  const handleBuyClick = () => {
    if (openHotmartCheckout()) return
    openDemoModal()
  }

  return { handleBuyClick }
}
