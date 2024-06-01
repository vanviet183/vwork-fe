export class GetDocumentInfoResponse {
  id: number
  fileName: string
  filePath: string
  type: string
  isSaved: boolean

  constructor(
    id: number,
    fileName: string,
    filePath: string,
    type: string,
    isSaved: boolean
  ) {
    this.id = id
    this.fileName = fileName
    this.filePath = filePath
    this.type = type
    this.isSaved = isSaved
  }
}
