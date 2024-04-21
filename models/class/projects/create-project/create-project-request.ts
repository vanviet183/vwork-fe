export class CreateProjectRequest {
  organizationId: number
  projectName: string
  description: string
  startDate: string
  endDate: string

  constructor(
    organizationId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    this.organizationId = organizationId
    this.projectName = projectName
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
  }
}
