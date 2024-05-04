export class CreateTaskRequest {
  projectId: number
  taskName: string
  userResponsible: number | undefined
  listUserImplement: number[]
  prioritize: boolean
  startDate: string
  endDate: string

  constructor(
    projectId: number,
    taskName: string,
    userResponsible: number | undefined,
    listUserImplement: number[],
    prioritize: boolean,
    startDate: string,
    endDate: string
  ) {
    this.projectId = projectId
    this.taskName = taskName
    this.userResponsible = userResponsible
    this.listUserImplement = listUserImplement
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
  }
}
