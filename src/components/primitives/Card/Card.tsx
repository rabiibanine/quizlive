import type { HTMLAttributes } from 'react'

type CardVariant = 'base' | 'raised' | 'outline'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  fullWidth?: boolean
}

const variantClasses: Record<CardVariant, string> = {
  base: 'bg-surface-raised shadow-card',
  raised: 'bg-surface-raised shadow-raised',
  outline: 'bg-surface-base border border-surface-border',
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export const Card = ({
  variant = 'base',
  padding = 'md',
  fullWidth = false,
  children,
  className = '',
  ...rest
}: CardProps) => {
  return (
    <div
      className={`
        rounded-lg
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  )
}
