import type { Task } from './task'

export class Project {
  id: number
  projectName: string
  status: string
  startDate: string
  endDate: string
  prioritize: boolean
  percent: number
  tasks: Task[]

  constructor(
    id: number,
    projectName: string,
    status: string,
    startDate: string,
    endDate: string,
    percent: number,
    prioritize: boolean,
    tasks: Task[]
  ) {
    this.id = id
    this.projectName = projectName
    this.status = status
    this.startDate = startDate
    this.endDate = endDate
    this.percent = percent
    this.prioritize = prioritize
    this.tasks = tasks
  }
}
