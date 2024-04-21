import type { Organization } from './organization'

export class User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
  organization?: Organization

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string,
    organization?: Organization
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.role = role
    this.organization = organization
  }
}
