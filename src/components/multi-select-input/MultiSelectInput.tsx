import { useId, useState } from 'react'

import { CloseIcon } from '../icons/Icons'
import { Button } from '../button/Button'
import { Loader } from '../loaders/loader/Loader'

import { MultiSelectProps } from '@/types/ui/input'

import styles from './MultiSelectInput.module.css'

export function MultiSelectInput<T>({
  label,
  typeOption,
  options = [],
  actionOnEmpty = false,
  actionLabel = '',
  selectedOptions = [],
  loading = false,
  error = undefined,
  actionMethod,
  getOptionLabel,
  getOptionKey,
  onAddItem,
  onRemoveItem,
}: MultiSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputId = useId()
  const labelId = `${inputId}-label`
  const errorId = `${inputId}-error`

  const filteredOptions = options
    .filter(op => !selectedOptions.some(sop => getOptionKey(sop) === getOptionKey(op)))
    .filter(op => getOptionLabel(op).toLowerCase().includes(searchTerm.toLowerCase()))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, item: T) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAddItem?.(item)
    }
  }

  const handleActionMethod = () => {
    if (!searchTerm) return
    if (typeOption === 'email') actionMethod?.(searchTerm)
    setSearchTerm('')
  }

  return (
    <div className={styles.multiSelect} role="group" aria-labelledby={labelId}>
      <label id={labelId} htmlFor={inputId} className={styles.multiSelectLabel}>
        {label}:
      </label>

      {onAddItem && (
        <ul className={styles.multiSelectSelected} aria-live="polite">
          {selectedOptions.length > 0 ? (
            selectedOptions.map(item => (
              <li key={getOptionKey(item)} className={styles.multiSelectChip} tabIndex={0}>
                <span>{getOptionLabel(item)}</span>
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => onRemoveItem?.(item)}
                  aria-label={`Remove ${getOptionLabel(item)}`}
                >
                  <CloseIcon />
                </Button>
              </li>
            ))
          ) : (
            <li className={styles.multiSelectChipNoResults}>
              No {label.toLocaleLowerCase()} selected
            </li>
          )}
        </ul>
      )}

      <div className={styles.multiSelectSearchWrapper}>
        <input
          id={inputId}
          type="text"
          className={styles.multiSelectSearch}
          placeholder={`Search by ${typeOption}...`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label={`Search ${label}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
        />

        {actionOnEmpty && (
          <Button
            variant="text"
            className={styles.multiSelectSearchActionOnEmptyBtn}
            disabled={loading || !searchTerm}
            onClick={handleActionMethod}
          >
            {loading ? <Loader /> : actionLabel}
          </Button>
        )}
      </div>

      <ul className={styles.multiSelectOptions} role="listbox" aria-label={`Available ${label}`}>
        {loading ? (
          <Loader />
        ) : filteredOptions.length > 0 ? (
          filteredOptions.map(item => (
            <li
              key={getOptionKey(item)}
              role="option"
              aria-selected="false"
              className={styles.multiSelectOption}
              tabIndex={0}
              onClick={() => onAddItem?.(item)}
              onKeyDown={e => handleKeyDown(e, item)}
            >
              {getOptionLabel(item)}
            </li>
          ))
        ) : (
          <li className={styles.multiSelectOptionNoResults}>
            <span>No options available</span>
          </li>
        )}
      </ul>

      <div className={styles.multiSelectInputFeedback}>
        <small id={errorId} className={styles.multiSelectInputErrorMessage} role="alert">
          {error}
        </small>
      </div>
    </div>
  )
}
