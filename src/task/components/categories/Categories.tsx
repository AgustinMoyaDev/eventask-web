import { clsx } from 'clsx'

import { ScrollableContainer } from '@/components/scrollable-container/ScrollableContainer'
import { ButtonLink } from '@/components/button-link/ButtonLink'

import { useSearch } from '@/hooks/useSearch'
import { useCategoryActions } from '@/store/hooks/useCategoryActions'
import { useTaskActions } from '@/store/hooks/useTaskActions'

import { Category, CategorySkeleton } from '../category/Category'

import styles from './Categories.module.css'

export function Categories() {
  const { search } = useSearch()
  const { fetching, categories } = useCategoryActions()
  const { tasks } = useTaskActions()

  const categoryCountMap = new Map<string, number>()
  tasks.forEach(t => {
    const catName = t.category?.name
    categoryCountMap.set(catName, (categoryCountMap.get(catName) ?? 0) + 1)
  })

  const filteredCategories = Object.values(categories).filter(({ name }) =>
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
        isEmpty={!areCategoriesPresent && !fetching}
      >
        {fetching ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CategorySkeleton key={`skeleton-${index}`} />
          ))
        ) : areCategoriesPresent ? (
          filteredCategories.map(({ id, name }) => {
            const quantity = categoryCountMap.get(name) ?? 0
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
