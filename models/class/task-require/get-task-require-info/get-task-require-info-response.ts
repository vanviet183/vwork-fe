export class GetTaskRequireInfoResponse {
  id: number
  requireContent: string
  important: boolean

  constructor(id: number, requireContent: string, important: boolean) {
    this.id = id
    this.requireContent = requireContent
    this.important = important
  }
}
