export class CreateDocumentRequest {
  taskId: number
  file: File
  type: string

  constructor(taskId: number, file: File, type: string) {
    this.taskId = taskId
    this.file = file
    this.type = type
  }
}
