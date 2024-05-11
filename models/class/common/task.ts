import type { Document } from './document'
import type { TaskRequire } from './task-require'
import type { User } from './user'

export class Task {
  id: number
  taskName: string
  phase: string
  userResponsible: string
  prioritize: string
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
    phase: string,

    userResponsible: string,
    prioritize: string,
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
    this.phase = phase
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
