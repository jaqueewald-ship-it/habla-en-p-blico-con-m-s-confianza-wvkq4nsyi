routerAdd('POST', '/backend/v1/pdf-probe', (e) => {
  const files = e.findUploadedFiles('file')
  if (!files || files.length === 0) throw new BadRequestError('envie o arquivo')

  const { markdown, truncated } = $documents.toMarkdown({ file: files[0] })

  return e.json(200, {
    truncated,
    totalLength: markdown.length,
    text: markdown.slice(0, 80000),
  })
})
