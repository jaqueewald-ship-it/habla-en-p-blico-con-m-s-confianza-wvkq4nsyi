import React, { useEffect, useRef, useState } from 'react'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import guiaPdf from '@/assets/guiahablaconmasconfianzacorregido-7d9c9.pdf'

GlobalWorkerOptions.workerSrc = workerUrl

/**
 * Renderiza uma página REAL do PDF do produto dentro de um <canvas>,
 * com a mesma proporção 3:4 usada pelas figuras do PagePreviews.
 * Não há placeholder: se a página não renderizar, o espaço fica em branco
 * dentro do cartão (o PDF é embarcado no bundle, o erro não é esperado).
 */
export const PdfPage: React.FC<{
  pageNumber: number
  className?: string
}> = ({ pageNumber, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    let doc: PDFDocumentProxy | null = null

    const render = async () => {
      try {
        doc = await getDocument({ data: guiaPdf }).promise
        if (cancelled) return
        const page = await doc.getPage(pageNumber)
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        // Área visível de 3:4 → viewport de alta resolução recortada nessa proporção
        const viewport = page.getViewport({ scale: 2 })
        const targetW = viewport.width
        const targetH = (targetW * 4) / 3
        canvas.width = targetW
        canvas.height = targetH
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        await page.render({
          canvasContext: context,
          viewport,
        }).promise
      } catch {
        if (!cancelled) setError(true)
      }
    }

    render()
    return () => {
      cancelled = true
      doc?.destroy()
    }
  }, [pageNumber])

  if (error) return <div className={className} aria-hidden="true" />

  return (
    <canvas ref={canvasRef} className={className} aria-label={`Página ${pageNumber} da guia`} />
  )
}
