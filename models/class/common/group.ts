import type { Organization } from './organization'
import type { User } from './user'

export class Group {
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
