export class InitOrganizationRequest {
  userId: number
  organizationName: string
  email: string
  phone: string
  role: string

  constructor(
    userId: number,
    organizationName: string,
    email: string,
    phone: string,
    role: string
  ) {
    this.userId = userId
    this.organizationName = organizationName
    this.email = email
    this.phone = phone
    this.role = role
  }
}
