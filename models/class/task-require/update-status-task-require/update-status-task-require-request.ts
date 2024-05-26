export class UpdateStatusTaskRequireRequest {
  taskRequireId: number
  status: string

  constructor(taskRequireId: number, status: string) {
    this.taskRequireId = taskRequireId
    this.status = status
  }
}
