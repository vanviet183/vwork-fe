export class CreateDocumentRequest {
  taskId: number
  file: File

  constructor(taskId: number, file: File) {
    this.taskId = taskId
    this.file = file
  }
}
