import React, { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

interface InfiniteSliderProps {
  children: React.ReactNode
  speed?: number
  speedOnHover?: number
  gap?: number
  className?: string
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
  className,
}: InfiniteSliderProps) {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)

  useAnimationFrame((_, delta) => {
    const inner = innerRef.current
    if (!inner) return
    const contentWidth = inner.scrollWidth / 2
    const px = (isHovered.current ? speedOnHover : speed) * (delta / 1000)
    const next = x.get() - px
    x.set(next <= -contentWidth ? 0 : next)
  })

  const items = React.Children.toArray(children)

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
    >
      <motion.div
        ref={innerRef}
        style={{ x, display: 'flex', gap }}
      >
        {[...items, ...items].map((child, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
