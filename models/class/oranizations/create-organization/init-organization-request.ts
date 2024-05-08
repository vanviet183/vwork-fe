export class InitOrganizationRequest {
  organizationName: string
  description: string
  email: string
  phone: string
  userId: number

  constructor(
    organizationName: string,
    description: string,
    email: string,
    phone: string,
    userId: number
  ) {
    this.userId = userId
    this.organizationName = organizationName
    this.description = description
    this.email = email
    this.phone = phone
  }
}
