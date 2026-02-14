import { forwardRef, useId, useState } from 'react'

import clsx from 'clsx'

import { InputProps } from './input.types'

import styles from './Input.module.css'

/**
 * Accessible input component with support for error state and screen readers
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      id = null,
      name,
      type,
      label,
      value,
      placeholder = '',
      autoComplete = 'off',
      hint,
      error,
      required,
      disabled,
      step,
      min,
      max,
      initialStateIcon: InitialStateIcon,
      finalStateIcon: FinalStateIcon,
      withFeedback = true,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`
    const hasError = !!error
    const describedBy =
      [hasError && errorId, hint && !hasError && hintId].filter(Boolean).join(' ') || undefined
    const [stateInput, setStateInput] = useState(false)

    const handleClick = () => {
      setStateInput(prevState => !prevState)
    }

    return (
      <div className={styles.input}>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={clsx(
              className,
              styles.inputField,
              hasError && styles.inputFieldError,
              disabled && styles.inputFieldDisabled
            )}
            id={inputId}
            name={name}
            type={type === 'password' && stateInput ? 'text' : type}
            value={value}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            {...rest}
          />
          <label
            htmlFor={inputId}
            className={clsx(styles.inputLabel, disabled && styles.inputLabelDisabled)}
          >
            {label}
          </label>
          {
            /* For common input */
            !InitialStateIcon && FinalStateIcon && (
              <FinalStateIcon className={styles.inputIcon} tabIndex={-1} />
            )
          }
          {
            /* For password type input */
            type === 'password' && InitialStateIcon && FinalStateIcon && (
              <button
                type="button"
                className={styles.inputButton}
                onClick={handleClick}
                tabIndex={-1}
              >
                {stateInput ? <InitialStateIcon /> : <FinalStateIcon />}
              </button>
            )
          }
        </div>
        {withFeedback && (
          <div className={styles.inputFeedback}>
            {hasError && (
              <small id={errorId} className={styles.inputErrorMessage} role="alert">
                {error}
              </small>
            )}
            {hint && (
              <small id={hintId} className={styles.inputHint}>
                {hint}
              </small>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
