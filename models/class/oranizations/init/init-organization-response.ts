import type { User } from '../../common/user'

export class InitOrganizationResponse {
  id: number
  author: User
  organizationName: string
  email: string
  phone: string
  role: string

  constructor(
    id: number,
    author: User,
    organizationName: string,
    email: string,
    phone: string,
    role: string
  ) {
    this.id = id
    this.author = author
    this.organizationName = organizationName
    this.email = email
    this.phone = phone
    this.role = role
  }
}
