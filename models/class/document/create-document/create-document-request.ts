export class CreateDocumentRequest {
  file: File
  type: string
  isSaved: boolean
  projectId?: number
  taskId?: number

  constructor(
    file: File,
    type: string,
    isSaved: boolean,
    projectId?: number,
    taskId?: number
  ) {
    this.projectId = projectId
    this.taskId = taskId
    this.file = file
    this.type = type
    this.isSaved = isSaved
  }
}
