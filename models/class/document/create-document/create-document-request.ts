export class CreateDocumentRequest {
  taskId: number
  file: File
  type: string
  isSaved: boolean

  constructor(taskId: number, file: File, type: string, isSaved: boolean) {
    this.taskId = taskId
    this.file = file
    this.type = type
    this.isSaved = isSaved
  }
}
