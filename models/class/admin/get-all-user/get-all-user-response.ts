import type { User } from '../../common/user'

export class GetAllUserResponse {
  listUser: User[]

  constructor(listUser: User[]) {
    this.listUser = listUser
  }
}
