export class UpdateDocumentResponse {
  id: number
  fileName: string
  filePath: string

  constructor(id: number, fileName: string, filePath: string) {
    this.id = id
    this.fileName = fileName
    this.filePath = filePath
  }
}
