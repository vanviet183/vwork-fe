import type { Task } from '../../common/task'

export class UpdateStatusProjectResponse {
  id: number
  projectName: string
  description: string
  status: string
  startDate: string
  endDate: string
  prioritize: string
  tasks: Task[]

  constructor(
    id: number,
    projectName: string,
    description: string,
    status: string,
    startDate: string,
    endDate: string,
    prioritize: string,
    tasks: Task[]
  ) {
    this.id = id
    this.projectName = projectName
    this.description = description
    this.status = status
    this.startDate = startDate
    this.endDate = endDate
    this.prioritize = prioritize
    this.tasks = tasks
  }
}
