import type { Document } from '../../common/document'

export class GetAllDocumentInProjectResponse {
  listDocument: Document[]

  constructor(listDocument: Document[]) {
    this.listDocument = listDocument
  }
}
