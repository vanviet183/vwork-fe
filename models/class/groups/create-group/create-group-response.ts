import type { Organization } from '../../common/organization'
import type { User } from '../../common/user'

export class CreateGroupResponse {
  id: number
  teamlead: number
  groupName: string
  organization: Organization
  users: User[]

  constructor(
    id: number,
    teamlead: number,
    groupName: string,
    users: User[],
    organization: Organization
  ) {
    this.id = id
    this.teamlead = teamlead
    this.groupName = groupName
    this.users = users
    this.organization = organization
  }
}
