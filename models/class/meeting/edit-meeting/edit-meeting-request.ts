export class EditMeetingRequest {
  meetingId: number
  userId: number
  title: string
  startTime: string
  endTime: string
  description: string
  location: string
  listUser: number[]

  constructor(
    meetingId: number,
    userId: number,
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string,
    listUser: number[]
  ) {
    this.meetingId = meetingId
    this.userId = userId
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.listUser = listUser
    this.description = description
    this.location = location
  }
}
