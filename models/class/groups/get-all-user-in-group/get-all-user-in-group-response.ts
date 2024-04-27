import type { User } from '../../common/user'

export class GetAllUserInGroupResponse {
  listUser: User[]

  constructor(listUser: User[]) {
    this.listUser = listUser
  }
}
