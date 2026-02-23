import { delay, http, HttpResponse } from 'msw'

import { Category } from '@/types/entities/category'
import { CreateCategoryDto, UpdateCategoryDto } from '@/types/dtos/category.dto'

import { createPaginatedResponse, getPaginationParams } from './shared'

import { MOCK_CATEGORIES, MOCK_CATEGORIES_TASK_COUNT, MOCK_TASKS } from '../data/mockData'
import { DELAYS } from '../utils/delays'

export const categoryHandlers = [
  /**
   * GET /api/categories - Returns paginated categories
   */
  http.get('*/api/categories', ({ request }) => {
    const url = new URL(request.url)
    const { page, perPage, sortBy, sortOrder } = getPaginationParams(url)
    const response = createPaginatedResponse<Category>(
      MOCK_CATEGORIES,
      page,
      perPage,
      sortBy,
      sortOrder
    )
    return HttpResponse.json(response)
  }),
  /**
   * GET /api/categories/task-count - Returns categories with task count
   */
  http.get('*/api/categories/task-count', () => {
    return HttpResponse.json(MOCK_CATEGORIES_TASK_COUNT)
  }),
  /**
   * POST /api/categories - Create new category
   */
  http.post('*/api/categories', async ({ request }) => {
    await delay(DELAYS.NORMAL)
    const body = (await request.json()) as CreateCategoryDto

    // Validate required fields
    if (!body.name || body.name.trim() === '') {
      return HttpResponse.json({ ok: false, message: 'Category name is required' }, { status: 400 })
    }

    // Check if category already exists
    const existingCategory = MOCK_CATEGORIES.find(
      c => c.name.toLowerCase() === body.name.trim().toLowerCase()
    )
    if (existingCategory) {
      return HttpResponse.json({ ok: false, message: 'Category already exists' }, { status: 409 })
    }

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    MOCK_CATEGORIES.push(newCategory)

    // Add to MOCK_CATEGORIES_TASK_COUNT with 0 tasks
    MOCK_CATEGORIES_TASK_COUNT.push({
      ...newCategory,
      taskCount: 0,
    })

    return HttpResponse.json(newCategory, { status: 201 })
  }),
  /**
   * PUT /api/categories/:id - Update existing category
   */
  http.put('*/api/categories/:id', async ({ request, params }) => {
    await delay(DELAYS.NORMAL)
    const { id } = params
    const body = (await request.json()) as UpdateCategoryDto

    // Find category
    const categoryIndex = MOCK_CATEGORIES.findIndex(c => c.id === id)
    if (categoryIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Category not found' }, { status: 404 })
    }

    // Validate name
    if (!body.name || body.name.trim() === '') {
      return HttpResponse.json({ ok: false, message: 'Category name is required' }, { status: 400 })
    }

    // Check if name already exists in another category
    const duplicateCategory = MOCK_CATEGORIES.find(
      c => c.id !== id && c.name.toLowerCase() === body.name.trim().toLowerCase()
    )
    if (duplicateCategory) {
      return HttpResponse.json(
        { ok: false, message: 'Category name already exists' },
        { status: 409 }
      )
    }

    // Update category
    const updatedCategory: Category = {
      ...MOCK_CATEGORIES[categoryIndex],
      name: body.name.trim(),
      updatedAt: new Date().toISOString(),
    }

    MOCK_CATEGORIES[categoryIndex] = updatedCategory

    // Update in MOCK_CATEGORIES_TASK_COUNT
    const taskCountIndex = MOCK_CATEGORIES_TASK_COUNT.findIndex(c => c.id === id)
    if (taskCountIndex !== -1) {
      MOCK_CATEGORIES_TASK_COUNT[taskCountIndex] = {
        ...MOCK_CATEGORIES_TASK_COUNT[taskCountIndex],
        name: body.name.trim(),
        updatedAt: new Date().toISOString(),
      }
    }

    // Update category name in all tasks that use it
    MOCK_TASKS.forEach(task => {
      if (task.categoryId === id) {
        task.category = updatedCategory
      }
    })

    return HttpResponse.json(updatedCategory)
  }),
  /**
   * DELETE /api/categories/:id - Delete category
   */
  http.delete('*/api/categories/:id', async ({ params }) => {
    await delay(DELAYS.FAST)
    const { id } = params

    // Find category
    const categoryIndex = MOCK_CATEGORIES.findIndex(c => c.id === id)
    if (categoryIndex === -1) {
      return HttpResponse.json({ ok: false, message: 'Category not found' }, { status: 404 })
    }

    // Check if category is being used by tasks
    const tasksUsingCategory = MOCK_TASKS.filter(t => t.categoryId === id)
    if (tasksUsingCategory.length > 0) {
      return HttpResponse.json(
        {
          ok: false,
          message: `Cannot delete category. It is being used by ${tasksUsingCategory.length} task(s)`,
        },
        { status: 409 }
      )
    }

    MOCK_CATEGORIES.splice(categoryIndex, 1)

    // Remove from MOCK_CATEGORIES_TASK_COUNT
    const taskCountIndex = MOCK_CATEGORIES_TASK_COUNT.findIndex(c => c.id === id)
    if (taskCountIndex !== -1) {
      MOCK_CATEGORIES_TASK_COUNT.splice(taskCountIndex, 1)
    }

    return new HttpResponse(null, { status: 200 })
  }),
]
