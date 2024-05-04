export class CreateTaskRequireRequest {
  taskId: number
  requireContent: string
  important: boolean

  constructor(taskId: number, requireContent: string, important: boolean) {
    this.taskId = taskId
    this.requireContent = requireContent
    this.important = important
  }
}
