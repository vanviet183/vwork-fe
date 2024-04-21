import type { Project } from './project'
import type { User } from './user'

export class Organization {
  id: number
  author: User
  organizationName: string
  email: string
  phone: string
  users: User[]
  projects?: Project[]

  constructor(
    id: number,
    author: User,
    organizationName: string,
    email: string,
    phone: string,
    users: User[],
    projects?: Project[]
  ) {
    this.id = id
    this.author = author
    this.email = email
    this.phone = phone
    this.organizationName = organizationName
    this.users = users
    this.projects = projects
  }
}
