import { Skeleton } from '@/components/skeletons/Skeleton'

export interface CategoryProps {
  name: string
  quantityFormatted: string
}

import styles from './Category.module.css'

export const Category = ({ name, quantityFormatted }: CategoryProps) => {
  return (
    <li className={styles.categoryItem}>
      <header className={styles.categoryItemHeader}>
        <h3 className="text-title-md line-clamp-1">{name}</h3>
        <p className={`text-label-md ${styles.categoryItemSubtitle}`}>{quantityFormatted}</p>
      </header>
    </li>
  )
}

export const CategorySkeleton = () => (
  <div className="category-item" style={{ pointerEvents: 'none' }}>
    <header className="category-item__header">
      <Skeleton width="60%" height="1.2rem" />
      <Skeleton width="40%" height="0.9rem" />
    </header>
  </div>
)
