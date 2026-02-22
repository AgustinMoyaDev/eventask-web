import { Controller } from 'react-hook-form'
import clsx from 'clsx'

import { Input } from '@/components/input/Input'
import { InputWithSuggestions } from '@/components/input-with-suggestions/InputWithSuggestions'
import { Button } from '@/components/button/Button'
import { Loader } from '@/components/loaders/loader/Loader'

import { useTaskCreateForm } from './useTaskCreateForm'

import styles from './TaskCreatePage.module.css'

/**
 * Task creation page with minimal required fields (title + category)
 * After successful creation, user is redirected to TaskEditPage for additional details
 */
const TaskCreatePage = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    categorySuggestions,
    isCreating,
    taskValidationError,
    categoryValidationError,
    backendError,
    isValid,
    handleCreateCategory,
  } = useTaskCreateForm()

  return (
    <section className={clsx(styles.taskCreatePage, 'section')}>
      <form className={styles.taskCreateForm} onSubmit={handleSubmit} noValidate>
        <p className={styles.taskCreateFormError} role="alert" aria-live="polite">
          {backendError}
        </p>

        <header className={styles.taskCreateHeader}>
          <h1 className={clsx(styles.taskCreateTitle)}>Create New Task</h1>
        </header>

        <Input
          type="text"
          label="Title"
          required
          {...register('title')}
          error={errors.title?.message ?? taskValidationError?.title}
        />

        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <InputWithSuggestions
              {...field}
              label="Category"
              error={fieldState.error?.message ?? categoryValidationError?.name}
              suggestionData={categorySuggestions}
              allowCreateIfNotExists
              onCreateNew={() => handleCreateCategory(field.value)}
            />
          )}
        />

        <footer className={styles.taskCreateFooter}>
          <Button type="submit" variant="filled" disabled={isCreating || !isValid}>
            {isCreating ? <Loader text="Creating..." /> : 'Create Task'}
          </Button>
        </footer>
      </form>
    </section>
  )
}

export default TaskCreatePage
