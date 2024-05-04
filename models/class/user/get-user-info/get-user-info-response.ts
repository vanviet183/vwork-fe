import type { Group } from '../common/group'
import type { Organization } from '../common/organization'

export class GetUserInfoResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
  organization?: Organization
  group?: Group

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string,
    organization?: Organization,
    group?: Group
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.role = role
    this.organization = organization
    this.group = group
  }
}
