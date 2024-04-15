export class JoinOrganizationResponse {
  id: number
  organizationName: string
  email: string
  phone: string
  amountEmployee: number
  role: string

  constructor(
    id: number,
    organizationName: string,
    email: string,
    phone: string,
    amountEmployee: number,
    role: string
  ) {
    this.id = id
    this.organizationName = organizationName
    this.email = email
    this.phone = phone
    this.amountEmployee = amountEmployee
    this.role = role
  }
}
