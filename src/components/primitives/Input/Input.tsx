import type { InputHTMLAttributes } from 'react'

type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  inputSize?: InputSize
  fullWidth?: boolean
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
}

export const Input = ({
  label,
  helperText,
  error,
  inputSize = 'md',
  fullWidth = false,
  disabled,
  className = '',
  id,
  ...rest
}: InputProps) => {

  // falls back to label text if no id provided, for accessibility
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>

      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-content-primary"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        className={`
          rounded-md border bg-surface-base text-content-primary
          placeholder:text-content-disabled
          transition-colors duration-150 outline-none
          focus:ring-2 focus:ring-brand-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? 'border-brand-danger focus:ring-brand-danger'
            : 'border-surface-border'
          }
          ${sizeClasses[inputSize]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...rest}
      />

      {(error || helperText) && (
        <span
          className={`text-xs ${error ? 'text-red-500' : 'text-content-secondary'}`}
        >
          {error ?? helperText}
        </span>
      )}

    </div>
  )
}
