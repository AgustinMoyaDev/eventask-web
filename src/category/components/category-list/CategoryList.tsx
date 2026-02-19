import { clsx } from 'clsx'

import { ScrollableContainer } from '@/components/scrollable-container/ScrollableContainer'
import { ButtonLink } from '@/components/button-link/ButtonLink'

import { useCategoryQueries } from '@/category/store/hooks/useCategoryQueries'

import { useSearch } from '@/context/search/SearchContext'

import { Category, CategorySkeleton } from '../category/Category'

import styles from './CategoryList.module.css'

export function CategoryList() {
  const { search } = useSearch()
  const { categoriesWithTaskCount, isFetchingWithCount: isFetching } = useCategoryQueries()

  const filteredCategories = Object.values(categoriesWithTaskCount).filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  const areCategoriesPresent = filteredCategories.length > 0

  return (
    <section className={clsx(styles.categories, 'section')}>
      <header className={styles.categoriesHeader}>
        <h2 className="text-title-lg">Categories</h2>
        <ButtonLink variant="text" to="/see-all?type=categories">
          See all
        </ButtonLink>
      </header>
      <ScrollableContainer
        className={styles.categoriesList}
        isEmpty={!areCategoriesPresent && !isFetching}
      >
        {isFetching ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CategorySkeleton key={`skeleton-${index}`} />
          ))
        ) : areCategoriesPresent ? (
          filteredCategories.map(({ id, name, taskCount }) => {
            const quantity = taskCount ?? 0
            const quantityFormatted = `In ${quantity} ${quantity === 1 ? 'task' : 'tasks'}`
            return <Category key={id} name={name} quantityFormatted={quantityFormatted} />
          })
        ) : (
          <span>No categories found...</span>
        )}
      </ScrollableContainer>
    </section>
  )
}
