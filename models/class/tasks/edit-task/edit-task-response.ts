import type { Document } from '../../common/document'
import type { TaskRequire } from '../../common/task-require'
import type { User } from '../../common/user'

export class EditTaskResponse {
  id: number
  taskName: string
  userResponsible: number
  prioritize: number
  status: string
  startDate: string
  endDate: string
  finishDay: string
  users: User[]
  documents: Document[]
  taskRequires: TaskRequire[]

  constructor(
    id: number,
    taskName: string,
    userResponsible: number,
    prioritize: number,
    status: string,
    startDate: string,
    endDate: string,
    finishDay: string,
    users: User[],
    documents: Document[],
    taskRequires: TaskRequire[]
  ) {
    this.id = id
    this.userResponsible = userResponsible
    this.taskName = taskName
    this.prioritize = prioritize
    this.startDate = startDate
    this.endDate = endDate
    this.finishDay = finishDay
    this.status = status
    this.users = users
    this.documents = documents
    this.taskRequires = taskRequires
  }
}
