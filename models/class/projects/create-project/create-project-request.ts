export class CreateProjectRequest {
  organizationId: number
  userId: number
  projectName: string
  description: string
  startDate: string
  endDate: string

  constructor(
    organizationId: number,
    userId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    this.organizationId = organizationId
    this.userId = userId
    this.projectName = projectName
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
  }
}
