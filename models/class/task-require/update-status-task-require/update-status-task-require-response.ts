export class UpdateStatusTaskRequireResponse {
  id: number
  requireContent: string
  important: boolean

  constructor(id: number, requireContent: string, important: boolean) {
    this.id = id
    this.requireContent = requireContent
    this.important = important
  }
}
