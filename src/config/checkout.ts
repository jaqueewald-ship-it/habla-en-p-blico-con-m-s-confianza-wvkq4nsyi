/**
 * ============================================================
 *  CENTRAL CHECKOUT CONFIGURATION
 * ============================================================
 *
 * 👉 COLE AQUI O LINK DE CHECKOUT DA HOTMART
 *    (Ex.: 'https://pay.hotmart.com/A12345678B?ap=abc123')
 *
 * Enquanto estiver vazio (''), os botões de compra abrem o
 * modal de checkout de demonstração atual (nome + e-mail
 * salvos no banco → página de obrigado).
 *
 * Assim que o link for preenchido, TODOS os botões de compra
 * do site abrem a página da Hotmart diretamente (nova aba),
 * sem nenhuma outra alteração no código.
 */
export const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/U108550333F?checkoutMode=10'

/** Indica se o checkout real (Hotmart) já está configurado */
export const isHotmartConfigured = (): boolean =>
  typeof HOTMART_CHECKOUT_URL === 'string' && HOTMART_CHECKOUT_URL.trim().length > 0

/** Ação padrão de compra: abre a Hotmart (nova aba) ou devolve false para o chamador abrir o modal demo */
export const openHotmartCheckout = (): boolean => {
  if (!isHotmartConfigured()) return false
  window.open(HOTMART_CHECKOUT_URL, '_blank', 'noopener,noreferrer')
  return true
}

/** Preço exibido no site inteiro, em dólares americanos: "US$ 9.90".
 *  O espaço após "US$" é inquebrável (\u00A0): o valor nunca cai para a linha de baixo. */
export const PRICE = {
  amount: 9.9,
  display: 'US$\u00A09.90',
  currencyLabel: 'USD',
} as const
