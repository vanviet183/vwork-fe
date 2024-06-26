import type { Project } from './project'

export class Organization {
  id: number
  author: string
  organizationName: string
  description: string
  email: string
  phone: string
  projects?: Project[]

  constructor(
    id: number,
    author: string,
    organizationName: string,
    description: string,
    email: string,
    phone: string,
    projects?: Project[]
  ) {
    this.id = id
    this.author = author
    this.email = email
    this.phone = phone
    this.organizationName = organizationName
    this.description = description
    this.projects = projects
  }
}
