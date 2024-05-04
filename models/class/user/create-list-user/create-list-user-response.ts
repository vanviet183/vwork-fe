import type { Group } from '../../common/group'

export class CreateListUserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  phone: string
  role: string
  group?: Group

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    phone: string,
    role: string,
    group?: Group
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.phone = phone
    this.role = role
    this.group = group
  }
}
