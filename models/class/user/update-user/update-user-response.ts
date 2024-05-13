import type { Organization } from '../../common/organization'

export class UpdateUserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  phone: string
  sector: string
  role: string
  organization?: Organization

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    phone: string,
    sector: string,
    role: string,
    organization?: Organization
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.phone = phone
    this.sector = sector
    this.role = role
    this.organization = organization
  }
}