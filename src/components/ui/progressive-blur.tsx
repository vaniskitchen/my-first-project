import { cn } from '@/lib/utils'

interface ProgressiveBlurProps {
  direction?: 'left' | 'right'
  blurIntensity?: number
  className?: string
}

export function ProgressiveBlur({
  direction = 'left',
  blurIntensity = 1,
  className,
}: ProgressiveBlurProps) {
  const gradient =
    direction === 'left'
      ? 'linear-gradient(to right, var(--bg) 0%, transparent 100%)'
      : 'linear-gradient(to left, var(--bg) 0%, transparent 100%)'

  return (
    <div
      className={cn(className)}
      style={{
        background: gradient,
        backdropFilter: `blur(${blurIntensity}px)`,
        maskImage: gradient,
        WebkitMaskImage: gradient,
      }}
    />
  )
}
