import type { Document } from '../../common/document'

export class GetAllDocumentInTaskResponse {
  listDocument: Document[]

  constructor(listDocument: Document[]) {
    this.listDocument = listDocument
  }
}
