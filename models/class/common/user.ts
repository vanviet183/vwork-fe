import type { Group } from './group'

export class User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
  group?: Group

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string,
    group?: Group
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.role = role
    this.group = group
  }
}
