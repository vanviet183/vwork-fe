export class EditTaskRequest {
  taskId: number
  taskName: string
  phase: string
  userResponsible: string
  listUserImplement: number[]
  prioritize: string
  startDate: string
  endDate: string

  constructor(
    taskId: number,
    taskName: string,
    phase: string,
    userResponsible: string,
    listUserImplement: number[],
    prioritize: string,
    startDate: string,
    endDate: string
  ) {
    this.taskId = taskId
    this.taskName = taskName
    this.phase = phase
    this.userResponsible = userResponsible
    this.listUserImplement = listUserImplement
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
  }
}
