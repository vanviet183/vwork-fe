class User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    role: string
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.avatar = avatar
    this.role = role
  }
}

export class JoinOrganizationResponse {
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
