export interface UserGroup {
  id: number
  fullName: string
  email: string
  phone: string
  role: string
  group: string
  groupId: number
}

export class GetAllUserInOrganizationResponse {
  listUser: UserGroup[]

  constructor(listUser: UserGroup[]) {
    this.listUser = listUser
  }
}
