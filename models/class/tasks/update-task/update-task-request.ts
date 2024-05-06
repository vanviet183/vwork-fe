export class UpdateTaskRequest {
  taskId: number
  status: string

  constructor(taskId: number, status: string) {
    this.taskId = taskId
    this.status = status
  }
}
