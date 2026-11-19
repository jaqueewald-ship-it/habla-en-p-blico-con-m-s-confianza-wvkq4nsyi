/// <reference path="../pb_data/types.d.ts" />

// Download do ZIP compilado do site (conteúdo de dist/) servido pelo backend.
// Não passa pelo servidor de estáticos do frontend, então o rewrite de SPA não
// interfere. O arquivo é gravado pelo gancho de build (scripts/zip-source.cjs).
routerAdd('GET', '/backend/v1/download/dist-export', (e) => {
  const path = __hooks + '/files/dist-export.zip'
  let bytes
  try {
    bytes = $os.readFile(path)
  } catch (_) {
    return e.json(404, {
      error:
        'dist-export.zip não encontrado. Rode o build (npm run build) e publique o ZIP gerado.',
    })
  }
  e.response.header().set('Content-Disposition', 'attachment; filename="dist-export.zip"')
  return e.blob(200, 'application/zip', bytes)
})
