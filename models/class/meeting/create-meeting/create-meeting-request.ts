export class CreateMeetingRequest {
  organizationId: number
  title: string
  startTime: string
  endTime: string
  description: string
  location: string
  listUser: number[]

  constructor(
    organizationId: number,
    title: string,
    startTime: string,
    endTime: string,
    description: string,
    location: string,
    listUser: number[]
  ) {
    this.organizationId = organizationId
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.listUser = listUser
    this.description = description
    this.location = location
  }
}
