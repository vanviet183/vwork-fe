import type { Task } from '../../common/task'

export class GetAllTaskInProjectResponse {
  listTask: Task[]

  constructor(listTask: Task[]) {
    this.listTask = listTask
  }
}
