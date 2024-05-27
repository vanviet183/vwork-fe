import type { Project } from '../../common/project'

export class UpdateOrganizationResponse {
  id: number
  author: string
  organizationName: string
  email: string
  phone: string
  projects?: Project[]

  constructor(
    id: number,
    author: string,
    organizationName: string,
    email: string,
    phone: string,
    projects?: Project[]
  ) {
    this.id = id
    this.author = author
    this.email = email
    this.phone = phone
    this.organizationName = organizationName
    this.projects = projects
  }
}
