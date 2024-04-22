import type { User } from '../../common/user'

class TaskParent {
  id: number
  taskName: string
  prioritize: number
  status: number
  startDate: string
  finishDay: string
  endDate: string
  users: User[]

  constructor(
    id: number,
    taskName: string,
    prioritize: number,
    status: number,
    startDate: string,
    finishDay: string,
    endDate: string,
    users: User[]
  ) {
    this.id = id
    this.taskName = taskName
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
    this.finishDay = finishDay
    this.status = status
    this.users = users
  }
}

export class GetTaskInfoResponse {
  id: number
  parentTask?: TaskParent
  taskName: string
  prioritize: number
  status: number
  startDate: string
  finishDay: string
  endDate: string
  users: User[]

  constructor(
    id: number,
    taskName: string,
    prioritize: number,
    status: number,
    startDate: string,
    finishDay: string,
    endDate: string,
    users: User[],
    parentTask?: TaskParent
  ) {
    this.id = id
    this.parentTask = parentTask
    this.taskName = taskName
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
    this.finishDay = finishDay
    this.status = status
    this.users = users
  }
}
