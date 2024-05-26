export class CreateTaskRequireRequest {
  taskId: number
  requireContent: string
  startDate: string
  endDate: string
  listUserImplement: string
  important: boolean

  constructor(
    taskId: number,
    requireContent: string,
    startDate: string,
    endDate: string,
    listUserImplement: string,
    important: boolean
  ) {
    this.taskId = taskId
    this.requireContent = requireContent
    this.startDate = startDate
    this.endDate = endDate
    this.listUserImplement = listUserImplement
    this.important = important
  }
}
