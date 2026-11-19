import React, { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { DRIVE_BONUS_IMAGES, driveImageCandidates } from '@/data/driveImages'

/**
 * <img> tolerante para capas carregadas por hotlink do Google Drive.
 * Tenta os candidatos em ordem (endpoint /thumbnail → usercontent →
 * lh3.googleusercontent.com) e só revela a figura quando uma delas
 * carrega — se todas falharem, deixa um reservado discreto no lugar,
 * sem quebrar o layout do card.
 */
export const DriveImage: React.FC<{
  fileId: string
  alt: string
  width?: number
  className?: string
}> = ({ fileId, alt, width = 1200, className }) => {
  const candidates = driveImageCandidates(fileId, width)
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [dead, setDead] = useState(false)

  useEffect(() => {
    setIdx(0)
    setLoaded(false)
    setDead(false)
  }, [fileId])

  if (dead) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className ?? 'w-full h-full flex items-center justify-center text-stone-300'}
      >
        <FileText className="w-10 h-10" aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={candidates[idx]}
      alt={loaded ? alt : ''}
      className={`${className ?? ''} ${loaded ? '' : 'opacity-0'}`}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (idx < candidates.length - 1) setIdx(idx + 1)
        else setDead(true)
      }}
    />
  )
}
