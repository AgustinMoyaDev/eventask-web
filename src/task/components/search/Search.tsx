import { clsx } from 'clsx'

import { SearchIcon } from '@/components/icons/Icons'

import { useSearch } from '@/hooks/useSearch'

import styles from './Search.module.css'

export const Search: React.FC = () => {
  const { search, updateSearch } = useSearch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  const startWithBlanks = (text: string) => text.startsWith(' ')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    if (startWithBlanks(newQuery)) return
    updateSearch(newQuery)
  }

  return (
    <section className={clsx(styles.search, 'section')}>
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <SearchIcon className={styles.searchIconSearch} />
          <input
            type="search"
            autoComplete="off"
            className={styles.searchInput}
            name="query"
            value={search}
            onChange={handleChange}
            placeholder="Search categories or tasks..."
          />
        </form>
      </div>
    </section>
  )
}
