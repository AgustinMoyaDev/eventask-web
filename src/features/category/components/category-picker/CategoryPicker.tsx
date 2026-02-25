import { useState, useRef, useEffect, useMemo } from 'react'
import clsx from 'clsx'

import { Chip } from '@/components/chip/Chip'
import { useCategoriesWithTaskCount } from '@/features/category/store/hooks/useCategoriesWithTaskCount'
import { useCategoryMutations } from '@/features/category/store/hooks/useCategoryMutations'
import { Category } from '@/types/entities/category'

import styles from './CategoryPicker.module.css'
import { Loader } from '@/components/loaders/loader/Loader'

interface CategoryPickerProps {
  selectedCategory?: Category
  onSelect: (category: Category) => void
}

export const CategoryPicker = ({ selectedCategory, onSelect }: CategoryPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { categoriesWithTaskCount: categories } = useCategoriesWithTaskCount()
  const { createCategory, isCreating } = useCategoryMutations()

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories
    return categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [categories, searchTerm])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Auto-focus input when opening
      setTimeout(() => inputRef.current?.focus(), 0)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (category: Category) => {
    onSelect(category)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleCreate = async () => {
    if (!searchTerm.trim()) return
    try {
      const { data: newCategory } = await createCategory({ name: searchTerm })
      if (newCategory) {
        handleSelect(newCategory)
      }
    } catch (error) {
      console.error('Failed to create category', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
    if (e.key === 'Enter') {
      const exactMatch = filteredCategories.find(
        c => c.name.toLowerCase() === searchTerm.toLowerCase()
      )
      if (exactMatch) handleSelect(exactMatch)
      else if (searchTerm) handleCreate()
    }
  }

  const isCreation = filteredCategories.length === 0 && searchTerm

  return (
    <div className={styles.container} ref={containerRef}>
      <Chip
        label={selectedCategory?.name ?? 'Uncategorized'}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      />

      {isOpen && (
        <div className={styles.popover}>
          <div className={styles.searchWrapper}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Find or create category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
            />
          </div>

          <ul className={styles.list} role="listbox">
            {filteredCategories.map(category => (
              <li
                key={category.id}
                role="option"
                className={clsx(styles.option, {
                  [styles.selected]: category.id === selectedCategory?.id,
                })}
                onClick={() => handleSelect(category)}
              >
                {category.name}
                <span className={styles.count}>{category.taskCount}</span>
              </li>
            ))}

            {isCreation && (
              <li
                role="option"
                className={clsx(styles.option, styles.createOption)}
                onClick={handleCreate}
              >
                {isCreating ? <Loader text="Creating..." /> : `Create "${searchTerm}"`}
              </li>
            )}

            {filteredCategories.length === 0 && !searchTerm && (
              <li className={styles.empty}>No categories found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
