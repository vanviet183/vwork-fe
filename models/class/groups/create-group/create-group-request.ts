export class CreateGroupRequest {
  groupName: string
  authorId: number
  organizationId: number
  listUser: number[]

  constructor(
    groupName: string,
    authorId: number,
    organizationId: number,
    listUser: number[]
  ) {
    this.groupName = groupName
    this.authorId = authorId
    this.organizationId = organizationId
    this.listUser = listUser
  }
}
