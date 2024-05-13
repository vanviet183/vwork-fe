export class UpdateUserRequest {
  userId: number
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  sector: string
  role: string
  organizationId?: number

  constructor(
    userId: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    sector: string,
    role: string,
    organizationId?: number
  ) {
    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.email = email
    this.password = password
    this.sector = sector
    this.role = role
    this.organizationId = organizationId
  }
}
