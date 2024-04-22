export class CreateTaskRequest {
  userId: number
  projectId: number
  parentTaskId?: number
  taskName: string
  prioritize: boolean
  startDate: string
  endDate: string

  constructor(
    userId: number,
    projectId: number,
    taskName: string,
    prioritize: boolean,
    startDate: string,
    endDate: string,
    parentTaskId?: number
  ) {
    this.userId = userId
    this.projectId = projectId
    this.taskName = taskName
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
    this.parentTaskId = parentTaskId
  }
}
