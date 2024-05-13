export class EditProjectRequest {
  projectId: number
  projectName: string
  description: string
  startDate: string
  endDate: string

  constructor(
    projectId: number,
    projectName: string,
    description: string,
    startDate: string,
    endDate: string
  ) {
    this.projectId = projectId
    this.projectName = projectName
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
  }
}
