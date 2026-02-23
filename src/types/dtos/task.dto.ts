export interface CreateTaskDto {
  title: string
  categoryId: string
}

export interface UpdateTaskDto extends CreateTaskDto {
  id: string
}
