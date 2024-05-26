export class EditTaskRequireRequest {
  taskRequireId: number
  requireContent: string
  important: boolean

  constructor(
    taskRequireId: number,
    requireContent: string,
    important: boolean
  ) {
    this.taskRequireId = taskRequireId
    this.requireContent = requireContent
    this.important = important
  }
}
