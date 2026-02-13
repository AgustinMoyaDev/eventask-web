import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'

import { InputWithSuggestionsProps } from './input-with-suggestions.types'

import styles from './InputWithSuggestions.module.css'
import inputStyles from '../input/Input.module.css'

export const InputWithSuggestions = forwardRef<HTMLInputElement, InputWithSuggestionsProps>(
  (
    {
      id = null,
      name,
      label,
      value,
      type,
      placeholder = '',
      hint,
      error,
      required = false,
      disabled = false,
      allowCreateIfNotExists = false,
      onCreateNew,
      autoComplete = 'off',
      suggestionData,
      loading = false,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const hasError = !!error
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`
    const describedBy =
      [hasError && errorId, hint && !hasError && hintId].filter(Boolean).join(' ') || undefined
    const containerRef = useRef<HTMLDivElement>(null)

    const [showSuggestions, setShowSuggestions] = useState(false)

    const filteredSuggestions = useMemo(() => {
      if (!String(value).trim()) {
        return suggestionData
      }
      return suggestionData.filter(item => item.toLowerCase().includes(String(value).toLowerCase()))
    }, [value, suggestionData])

    // Close suggestions when clicking outside the input or selecting one
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowSuggestions(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSuggestionClick = (value: string) => {
      const syntheticEvent = {
        target: {
          name,
          value,
        },
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(syntheticEvent)
      setShowSuggestions?.(false)
    }

    const handleCreateNew = () => {
      onCreateNew?.(String(value))
      setShowSuggestions(false)
    }

    return (
      <div className={styles.input} ref={containerRef}>
        <div className={inputStyles.inputWrapper}>
          <input
            ref={ref}
            className={clsx(
              inputStyles.inputField,
              hasError && inputStyles.inputFieldError,
              disabled && inputStyles.inputFieldDisabled
            )}
            id={inputId}
            name={name}
            type={type ?? 'text'}
            value={value}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={() => setShowSuggestions(true)}
            role="combobox"
            aria-describedby={describedBy}
            aria-autocomplete="list"
            aria-expanded={showSuggestions}
            aria-controls={`${inputId}-suggestions`}
            aria-invalid={hasError}
            {...rest}
          />
          <label htmlFor={inputId} className={inputStyles.inputLabel}>
            {label}
          </label>
        </div>

        <div className={inputStyles.inputFeedback}>
          {showSuggestions && (
            <ul id={`${inputId}-suggestions`} role="listbox" className={styles.inputSuggestions}>
              {filteredSuggestions.length === 0 && (
                <li className={clsx(styles.inputSuggestion, styles.inputSuggestionNoResults)}>
                  No results found
                </li>
              )}
              {filteredSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  role="option"
                  tabIndex={0}
                  className={styles.inputSuggestion}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </li>
              ))}
              {allowCreateIfNotExists && value && filteredSuggestions.length === 0 && (
                <li
                  className={clsx(styles.inputSuggestion, styles.inputSuggestionCreate)}
                  onClick={handleCreateNew}
                >
                  Create <strong>"{value}"</strong>
                </li>
              )}
            </ul>
          )}

          {loading && <span>Loading...</span>}
          {hasError && !showSuggestions && (
            <small id={errorId} className={inputStyles.inputErrorMessage} role="alert">
              {error}
            </small>
          )}
          {hint && !showSuggestions && !hasError && (
            <small id={hintId} className={inputStyles.inputHint}>
              {hint}
            </small>
          )}
        </div>
      </div>
    )
  }
)
