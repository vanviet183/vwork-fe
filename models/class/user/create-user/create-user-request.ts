export class CreateUserRequest {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  sector: string
  role: string

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    sector: string,
    role: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.email = email
    this.password = password
    this.sector = sector
    this.role = role
  }
}
