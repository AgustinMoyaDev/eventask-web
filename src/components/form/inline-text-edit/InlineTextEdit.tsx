import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import clsx from 'clsx'
import { ZodString } from 'zod'

import styles from './InlineTextEdit.module.css'

interface InlineTextEditProps {
  defaultValue: string
  onSave: (value: string) => Promise<void>
  schema?: ZodString
  label: string
  className?: string
  inputClassName?: string
}

export const InlineTextEdit = ({
  defaultValue,
  onSave,
  schema,
  label,
  className,
  inputClassName,
}: InlineTextEditProps) => {
  // States
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  // Avoid conflicts between Enter and Blur when saving
  const isSubmittingRef = useRef(false)

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  // Sync external changes (if task updates from elsewhere)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const validate = (): boolean => {
    if (!schema) return true
    const result = schema.safeParse(value)
    if (!result.success) {
      setError(result.error.issues[0].message)
      return false
    }
    setError(null)
    return true
  }

  const executeSave = async (shouldRefocusOnError: boolean) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true

    try {
      setIsSaving(true)
      await onSave(value)
      setIsEditing(false)
      setError(null)
    } catch (error) {
      const msg = typeof error === 'string' ? error : 'Failed to save'
      setError(msg)

      // Only trap focus if user explicitly tried to save (Enter)
      if (shouldRefocusOnError) {
        // Execute focus() when browser finished processing the current event loop
        setTimeout(() => inputRef.current?.focus(), 0)
      }
    } finally {
      setIsSaving(false)
      isSubmittingRef.current = false
    }
  }

  const handleSave = async (shouldRefocus: boolean) => {
    // Optimization: If value didn't change, just close
    if (value === defaultValue) {
      setIsEditing(false)
      setError(null)
      isSubmittingRef.current = false
      return
    }

    const isValid = validate()
    if (!isValid) {
      // If validation failed via Enter, keep focus.
      // If via Blur, just show error but let user leave.
      if (shouldRefocus) {
        inputRef.current?.focus()
      }
      return
    }

    await executeSave(shouldRefocus)
  }

  const handleCancel = () => {
    setValue(defaultValue)
    setError(null)
    setIsEditing(false)
    isSubmittingRef.current = false
  }

  // --- DOM Events ---

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Enter = True intent to save (Refocus on error)
      handleSave(true)
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleBlur = () => {
    // Blur = Passive attempt to save (Don't refocus on error)
    if (!isSubmittingRef.current && !isSaving) {
      handleSave(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (error) setError(null)
  }

  // RENDER: Edit Mode
  if (isEditing) {
    return (
      <div className={styles.container}>
        <input
          name={label}
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={isSaving}
          aria-label={`Edit ${label}`}
          className={clsx(styles.input, inputClassName, !!error && styles.inputError)}
        />
        {error && <small className={styles.errorMessage}>{error}</small>}
      </div>
    )
  }

  // RENDER: Read Mode
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsEditing(true)}
      onKeyDown={e => e.key === 'Enter' && setIsEditing(true)}
      className={clsx(styles.readOnly, className)}
      aria-label={`Edit ${label}, current value: ${value}`}
      title="Click to edit"
    >
      {value}
    </div>
  )
}
