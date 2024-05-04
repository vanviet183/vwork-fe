import type { TaskRequire } from '../../common/task-require'

export class GetAllTaskRequireInTaskResponse {
  listTaskRequire: TaskRequire[]

  constructor(listTaskRequire: TaskRequire[]) {
    this.listTaskRequire = listTaskRequire
  }
}
