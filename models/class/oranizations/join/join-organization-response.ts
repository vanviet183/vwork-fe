export class JoinOrganizationResponse {
  id: number
  author: string
  organizationName: string
  email: string
  phone: string
  role: string

  constructor(
    id: number,
    author: string,
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
