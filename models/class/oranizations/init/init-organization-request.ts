export class InitOrganizationRequest {
  organizationName: string
  email: string
  phone: string
  amountEmployee: number
  role: string

  constructor(
    organizationName: string,
    email: string,
    phone: string,
    amountEmployee: number,
    role: string
  ) {
    this.organizationName = organizationName
    this.email = email
    this.phone = phone
    this.amountEmployee = amountEmployee
    this.role = role
  }
}
