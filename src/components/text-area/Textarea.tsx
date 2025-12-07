import clsx from 'clsx'

import { TextareaProps } from '@/types/ui/text-area'

import styles from './Textarea.module.css'

export const Textarea = ({
  id,
  required = false,
  name,
  label,
  placeholder = '',
  value,
  error,
  touched = false,
  hint,
  disabled = false,
  rows = 4,
  cols,
  onChange,
  onBlur,
  ...rest
}: TextareaProps) => {
  return (
    <div className={styles.textarea}>
      <div className={styles.textareaWrapper}>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          cols={cols}
          className={clsx(
            styles.textareaField,
            error && touched && styles.textareaFieldError,
            disabled && styles.textareaFieldDisabled
          )}
          aria-describedby={error && touched ? `${id}-error` : undefined}
          {...rest}
        />
        <label htmlFor={id} className={styles.textareaLabel}>
          {label}
        </label>
      </div>
      <div className={styles.textareaFeedback}>
        {error && touched && (
          <small id={`${id}-error`} className={styles.textareaErrorMessage}>
            {error}
          </small>
        )}
        {hint && <small className={styles.textareaHint}>Eg: {hint}</small>}
      </div>
    </div>
  )
}
