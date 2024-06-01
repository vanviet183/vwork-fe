export class UpdateDocumentRequest {
  documentId: number
  type: string
  isSaved: boolean

  constructor(documentId: number, type: string, isSaved: boolean) {
    this.documentId = documentId
    this.type = type
    this.isSaved = isSaved
  }
}
