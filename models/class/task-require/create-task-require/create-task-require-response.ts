export class CreateTaskRequireResponse {
  id: number
  requireContent: string
  startDate: string
  endDate: string
  listUserImplement: string
  status: string
  important: boolean

  constructor(
    id: number,
    requireContent: string,
    startDate: string,
    endDate: string,
    listUserImplement: string,
    status: string,
    important: boolean
  ) {
    this.id = id
    this.requireContent = requireContent
    this.startDate = startDate
    this.endDate = endDate
    this.listUserImplement = listUserImplement
    this.status = status
    this.important = important
  }
}
