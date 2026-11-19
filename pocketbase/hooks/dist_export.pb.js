/// <reference path="../pb_data/types.d.ts" />

// Download do ZIP compilado do site (conteúdo de dist/).
//
// O ZIP é gerado DURANTE o build do frontend pelo gancho em
// scripts/zip-source.cjs (chamado pelo tailwind.config.ts no evento 'exit'
// do processo). Ele grava duas cópias:
//   1. dist/dist-export.zip → servido pelo estático do frontend na URL
//      /dist-export.zip (caminho principal, usado pelo usuário);
//   2. pocketbase/hooks/files/dist-export.zip → servido LOCALMENTE por esta
//      rota, quando a cópia existe no deploy do pb_hooks. Como o build roda
//      em sandbox separada do repo, essa cópia pode não chegar ao backend:
//      nesse caso a rota responde 302 para o ZIP estático do frontend.
routerAdd('GET', '/backend/v1/download/dist-export', (e) => {
  const path = __hooks + '/files/dist-export.zip'
  let bytes = null
  try {
    bytes = $os.readFile(path)
  } catch (_) {
    bytes = null
  }
  if (bytes && bytes.length > 0) {
    e.response.header().set('Content-Disposition', 'attachment; filename="dist-export.zip"')
    return e.blob(200, 'application/zip', bytes)
  }
  // Fallback: o ZIP compilado é servido pelo estático do frontend (a URL é
  // configurável via env; o valor cobre o domínio de preview do projeto).
  const frontend =
    $os.getenv('DIST_EXPORT_FALLBACK_URL') ||
    'https://site-habla-en-publico-65f15--preview.goskip.app'
  return e.redirect(302, frontend + '/dist-export.zip')
})
