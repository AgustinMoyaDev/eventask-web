export interface ITaskCreatePayload {
  title: string
  categoryId: string
}

export interface ITaskUpdatePayload extends ITaskCreatePayload {
  id: string
}
