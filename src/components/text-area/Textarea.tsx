import { forwardRef } from 'react'

import clsx from 'clsx'

import { TextareaProps } from '@/types/ui/text-area'

import styles from './Textarea.module.css'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      required = false,
      name,
      label,
      placeholder = '',
      error,
      hint,
      disabled = false,
      rows = 4,
      cols,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={styles.textarea}>
        <div className={styles.textareaWrapper}>
          <textarea
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            rows={rows}
            cols={cols}
            className={clsx(
              styles.textareaField,
              error && styles.textareaFieldError,
              disabled && styles.textareaFieldDisabled
            )}
            aria-describedby={error ? `${id}-error` : undefined}
            {...rest}
          />
          <label htmlFor={id} className={styles.textareaLabel}>
            {label}
          </label>
        </div>
        <div className={styles.textareaFeedback}>
          {error && (
            <small id={`${id}-error`} className={styles.textareaErrorMessage}>
              {error}
            </small>
          )}
          {hint && <small className={styles.textareaHint}>Eg: {hint}</small>}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
