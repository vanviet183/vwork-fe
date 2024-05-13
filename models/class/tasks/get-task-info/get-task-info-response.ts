import type { Document } from '../../common/document'
import type { TaskRequire } from '../../common/task-require'
import type { User } from '../../common/user'

export class GetTaskInfoResponse {
  id: number
  taskName: string
  phase: string
  userResponsible: string
  prioritize: string
  status: string
  startDate: string
  endDate: string
  finishDay: string
  progress: number
  users?: User[]
  documents?: Document[]
  taskRequires?: TaskRequire[]

  constructor(
    id: number,
    taskName: string,
    phase: string,
    userResponsible: string,
    prioritize: string,
    status: string,
    startDate: string,
    endDate: string,
    finishDay: string,
    progress: number,
    users?: User[],
    documents?: Document[],
    taskRequires?: TaskRequire[]
  ) {
    this.id = id
    this.userResponsible = userResponsible
    this.taskName = taskName
    this.phase = phase
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
    this.finishDay = finishDay
    this.status = status
    this.progress = progress
    this.users = users
    this.documents = documents
    this.taskRequires = taskRequires
  }
}
