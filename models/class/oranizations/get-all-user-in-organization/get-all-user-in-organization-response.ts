import type { User } from '../../common/user'

export class GetAllUserInOrganizationResponse {
  listUser: User[]

  constructor(listUser: User[]) {
    this.listUser = listUser
  }
}
