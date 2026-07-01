import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-[var(--accent)] text-white hover:opacity-90 border-transparent',
  outline:
    'border border-[var(--border)] bg-transparent text-[var(--text-h)] hover:bg-[var(--accent-bg)]',
  ghost:
    'border-transparent bg-transparent text-[var(--text-h)] hover:bg-[var(--accent-bg)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50',
      variantClasses[variant],
      sizeClasses[size],
      className,
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLElement> }>, {
        className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
        ref,
      })
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
