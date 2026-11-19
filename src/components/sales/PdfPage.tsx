import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import guiaPdf from '@/assets/guiahablaconmasconfianzacorregido-7d9c9.pdf?url'

// pdf.js 4.x: sem o worker configurado, getDocument pode falhar em silêncio e
// deixar o canvas em branco — era a causa provável do bug anterior.
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

interface PdfPageProps {
  pageNumber: number
  /** aspect ratio width/height da caixa que envolve o canvas */
  aspect?: number
}

/**
 * Renderiza UMA página física do PDF do guia num canvas.
 *
 * Pontos que faziam as prévias saírem em branco antes:
 *  1. Worker do pdf.js não configurado → configurei via ?url acima.
 *  2. Render disparado com container de largura 0 (seção fora da viewport /
 *     paint inicial) → o render só acontece quando o ResizeObserver reporta
 *     largura > 0, e re-renderiza se a largura mudar.
 *  3. Buffer transferido ao worker → cada instância faz fetch próprio e usa
 *     uma CÓPIA do ArrayBuffer (getDocument transfere o buffer).
 *  4. Erros engolidos → estado `failed` visível com mensagem.
 */
export const PdfPage: React.FC<PdfPageProps> = ({ pageNumber, aspect = 3 / 4 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const bufferRef = useRef<Uint8Array | null>(null)
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'failed'>('loading')

  const renderAt = useCallback(
    async (width: number) => {
      const canvas = canvasRef.current
      if (!canvas || width < 10) return

      // Cancela um render em andamento antes de iniciar outro
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch {
          /* já concluída */
        }
        renderTaskRef.current = null
      }

      try {
        // Cópia por instância: getDocument transfere o buffer ao worker
        if (!bufferRef.current) {
          const res = await fetch(guiaPdf)
          if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar o PDF`)
          const buf = await res.arrayBuffer()
          bufferRef.current = new Uint8Array(buf.slice(0))
        }
        const data = new Uint8Array(bufferRef.current.buffer.slice(0))

        const doc = await pdfjsLib.getDocument({ data }).promise
        const page = await doc.getPage(pageNumber)
        const base = page.getViewport({ scale: 1 })
        const cssWidth = Math.floor(width)
        const dpr = Math.min(window.devicePixelRatio || 1, 3)
        const viewport = page.getViewport({ scale: (cssWidth * dpr) / base.width })

        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        canvas.style.width = '100%'
        canvas.style.height = 'auto'

        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Canvas 2D indisponível')
        const task = page.render({ canvasContext: ctx, viewport })
        renderTaskRef.current = task
        await task.promise
        renderTaskRef.current = null
        await doc.destroy()
        setStatus('ok')
      } catch (err) {
        // Render cancelado por um novo render: não é falha
        if (
          err &&
          typeof err === 'object' &&
          (err as { name?: string }).name === 'RenderingCancelledException'
        ) {
          return
        }
        console.error(`PdfPage: falha ao renderizar página ${pageNumber}`, err)
        setStatus('failed')
      }
    },
    [pageNumber],
  )

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // Só renderiza quando a caixa tem largura real (> 0)
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      if (w > 10) renderAt(w)
    })
    ro.observe(wrap)
    return () => {
      ro.disconnect()
      try {
        renderTaskRef.current?.cancel()
      } catch {
        /* noop */
      }
    }
  }, [renderAt])

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: String(aspect) }}>
      <canvas
        ref={canvasRef}
        className="block w-full h-auto"
        aria-label={`Página ${pageNumber} da guía`}
      />
      {status !== 'ok' && (
        <div
          className={`absolute inset-0 flex items-center justify-center text-center text-[11px] px-3 ${
            status === 'failed'
              ? 'bg-rose-50 text-rose-700 font-semibold'
              : 'bg-stone-100 text-stone-500 animate-pulse'
          }`}
        >
          {status === 'failed' ? (
            <span>No se pudo cargar la vista previa de esta página.</span>
          ) : (
            <span>Cargando página…</span>
          )}
        </div>
      )}
    </div>
  )
}
