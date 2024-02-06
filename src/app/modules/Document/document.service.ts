import { IDocument } from './document.interface'
import { Document } from './document.model';

const createDocument = async (payload: IDocument) => {
  const result = await Document.create(payload)
  return result
}

export const DocumentService = {
  createDocument,
}
