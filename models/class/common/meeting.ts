import type { User } from './user'

export class Meeting {
  id: number
  title: string
  description: string
  author: string
  location: string
  startTime: string
  endTime: string
  type: string
  users: User[]

  constructor(
    id: number,
    title: string,
    description: string,
    author: string,
    location: string,
    startTime: string,
    endTime: string,
    type: string,
    users: User[]
  ) {
    this.id = id
    this.description = description
    this.location = location
    this.author = author
    this.title = title
    this.startTime = startTime
    this.endTime = endTime
    this.users = users
    this.type = type
  }
}
