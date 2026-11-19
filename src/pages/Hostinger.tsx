import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Download,
  FileArchive,
  Loader2,
  TriangleAlert,
  CheckCircle2,
} from 'lucide-react'
import { buildHostingerKit, downloadBlob, KitResult } from '@/lib/hostingerKit'

type State =
  | { phase: 'idle' }
  | { phase: 'building' }
  | { phase: 'done'; result: KitResult }
  | { phase: 'error'; message: string; failed?: string[] }

export default function Hostinger() {
  const [state, setState] = useState<State>({ phase: 'idle' })

  const handleGenerate = async () => {
    setState({ phase: 'building' })
    try {
      const { blob, result } = await buildHostingerKit()
      if (!result.ok) {
        setState({
          phase: 'error',
          message: 'Alguns arquivos não puderam ser baixados:',
          failed: result.failed,
        })
        return
      }
      downloadBlob(blob, 'hostinger-kit.zip')
      setState({ phase: 'done', result })
    } catch (err) {
      setState({
        phase: 'error',
        message: err instanceof Error ? err.message : 'Erro inesperado ao montar o pacote.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center">
              <FileArchive className="w-5 h-5 text-stone-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900">Pacote de publicação — Hostinger</h1>
              <p className="text-xs text-stone-500">Página utilitária · mundodeguias.com</p>
            </div>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            Monta e baixa um arquivo <strong>hostinger-kit.zip</strong> com o site compilado
            (index.html, assets/, .htaccess), as imagens e um leia-me com o passo a passo da
            Hostinger. As capas dos 6 bônus são embutidas na pasta <strong>bonus-covers/</strong> do
            pacote (Bono 04–06 do próprio build; Bono 01–03 ainda do Google Drive). Após baixar,
            extraia o conteúdo na pasta <strong>public_html</strong> pelo Gerenciador de Arquivos.
          </p>

          <Button
            onClick={handleGenerate}
            disabled={state.phase === 'building'}
            className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white font-bold"
          >
            {state.phase === 'building' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Montando o pacote...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Gerar e baixar pacote
              </>
            )}
          </Button>

          {state.phase === 'done' && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Pacote gerado com {state.result.fileCount} arquivos
                  {state.result.embeddedCovers > 0
                    ? `, incluindo ${state.result.embeddedCovers} capa(s) de bônus embutida(s) em bonus-covers/.`
                    : '.'}{' '}
                  Se o download não começou sozinho, verifique os downloads do navegador.
                </span>
              </div>

              {state.result.coverFailures.length > 0 && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                  <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>
                      <strong>
                        {state.result.coverFailures.length} capa(s) de bônus não puderam ser
                        buscadas do Google Drive
                      </strong>{' '}
                      (o Drive pode ter bloqueado o acesso ou a pasta não está mais pública). Para
                      essas, o ZIP mantém o hotlink do Drive no site publicado: se o Drive voltar a
                      servir as imagens, as capas voltam a aparecer na Hostinger sem novo pacote. Se
                      preferir garanti-las localmente, compartilhe a pasta do Drive como
                      &quot;qualquer pessoa com o link&quot; e gere o pacote de novo.
                    </p>
                    <ul className="list-disc list-inside">
                      {state.result.coverFailures.map((f) => (
                        <li key={f} className="font-mono">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {state.phase === 'error' && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
              <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">{state.message}</p>
                {state.failed && state.failed.length > 0 && (
                  <ul className="list-disc list-inside">
                    {state.failed.map((f) => (
                      <li key={f} className="font-mono">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <p>O ZIP não foi gerado para evitar enviar um pacote quebrado.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
