import type { User } from '../../common/user'

export class GetAllUserInProjectResponse {
  listUser: User[]

  constructor(listUser: User[]) {
    this.listUser = listUser
  }
}
