export class CreateGroupRequest {
  organizationId: number
  groupName: string
  teamlead: number
  listUser: number[]

  constructor(
    organizationId: number,
    groupName: string,
    teamlead: number,
    listUser: number[]
  ) {
    this.organizationId = organizationId
    this.groupName = groupName
    this.teamlead = teamlead
    this.listUser = listUser
  }
}
