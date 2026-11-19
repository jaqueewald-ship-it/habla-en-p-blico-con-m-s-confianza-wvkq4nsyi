import React, { useEffect, useRef, useState } from 'react'
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import guiaPdf from '@/assets/guiahablaconmasconfianzacorregido-7d9c9.pdf'

GlobalWorkerOptions.workerSrc = workerUrl

/**
 * Renderiza uma página REAL de um PDF dentro de um <canvas>.
 *
 * ⚠️ IMPORTANTE: o import `?url` do Vite devolve uma STRING de URL
 * ("/src/assets/guia….pdf"). Essa string NÃO pode ir direto para
 * `getDocument({ data })`: o pdf.js interpreta `data: string` como bytes
 * binários (código de cada caractere), falha ao detectar o cabeçalho "%PDF"
 * e o canvas fica em branco em silêncio. Por isso o PDF é baixado via fetch
 * e entregue como Uint8Array.
 */
const bufferCache = new Map<string, Promise<ArrayBuffer>>()
const loadPdfBuffer = (url: string): Promise<ArrayBuffer> => {
  let cached = bufferCache.get(url)
  if (!cached) {
    cached = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`Falha ao carregar o PDF (HTTP ${res.status})`)
      return res.arrayBuffer()
    })
    bufferCache.set(url, cached)
  }
  return cached
}

/**
 * Por padrão usa o PDF do guia; `pdf` permite apontar outro arquivo
 * (ex.: capas dos bônus). Se a página não renderizar, o espaço fica
 * em branco dentro do cartão e o erro é logado no console.
 */
export const PdfPage: React.FC<{
  pageNumber: number
  pdf?: string
  className?: string
}> = ({ pageNumber, pdf = guiaPdf, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    let doc: PDFDocumentProxy | null = null

    const render = async () => {
      try {
        // Bytes frescos por instância: o pdf.js transfere (detach) o buffer
        // ao postar no worker, então cada documento recebe uma CÓPIA.
        const buffer = await loadPdfBuffer(pdf)
        if (cancelled) return
        doc = await getDocument({ data: new Uint8Array(buffer.slice(0)) }).promise
        if (cancelled) return
        const page = await doc.getPage(pageNumber)
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        // Página inteira em alta resolução; o CSS (object-fit: contain)
        // encaixa a página dentro da caixa 3:4 do cartão, sem recortar.
        const viewport = page.getViewport({ scale: 2 })
        canvas.width = Math.ceil(viewport.width)
        canvas.height = Math.ceil(viewport.height)
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.objectFit = 'contain'
        canvas.style.background = '#ffffff'

        await page.render({
          canvasContext: context,
          viewport,
        }).promise
      } catch (err) {
        console.error(`PdfPage: falha ao renderizar a página ${pageNumber}`, err)
        if (!cancelled) setError(true)
      }
    }

    render()
    return () => {
      cancelled = true
      doc?.destroy()
    }
  }, [pageNumber, pdf])

  if (error) return <div className={className} aria-hidden="true" />

  return (
    <canvas ref={canvasRef} className={className} aria-label={`Página ${pageNumber} do material`} />
  )
}
