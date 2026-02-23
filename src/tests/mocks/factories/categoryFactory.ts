/**
 * Category Factory
 * Generates fake  objects using Faker.js
 * @see https://fakerjs.dev/guide/usage.html#create-complex-objects
 */
import { faker } from '@faker-js/faker'
import type { Category } from '@/types/entities/category'

/**
 * Predefined realistic category names for task management.
 * Used when no overwrites are provided for more realistic data.
 */
const CATEGORY_NAMES = [
  'Development',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Research',
  'Planning',
  'Testing',
  'Documentation',
  'Deployment',
  'Meeting',
  'Review',
]

/**
 * Creates a fake Category object with realistic data.
 *
 * @param overwrites - Partial Category to override default generated values
 * @returns A complete Category object with fake data
 *
 * @example
 * ```typescript
 * // Generate random category
 * const category = createFakeCategory()
 *
 * // Generate specific category
 * const devCategory = createFakeCategory({ name: 'Development' })
 * ```
 */
export function createFakeCategory(overwrites: Partial<Category> = {}): Category {
  const {
    id = faker.string.uuid(),
    name = faker.helpers.arrayElement(CATEGORY_NAMES),
    createdAt = faker.date.past(),
    updatedAt = faker.date.recent(),
  } = overwrites

  CATEGORY_NAMES.splice(CATEGORY_NAMES.indexOf(name), 1)

  return {
    id,
    name,
    createdAt,
    updatedAt,
  }
}

/**
 * Creates multiple fake Category objects.
 *
 * @param count - Number of categories to generate
 * @param overwrites - Partial Category applied to all generated categories
 * @returns Array of Category objects
 *
 * @example
 * ```typescript
 * // Generate 5 random categories
 * const categories = createFakeCategories(5)
 * ```
 */
export function createFakeCategories(
  count: number,
  overwrites: Partial<Category> = {}
): Category[] {
  return Array.from({ length: count }, () => createFakeCategory(overwrites))
}
