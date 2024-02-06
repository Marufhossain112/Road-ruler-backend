import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { IDocument } from './document.interface'
import { DocumentTypes } from './document.constant';

const documentSchema = new Schema<IDocument>(
  {
    document_type: {
      type: String,
      required: true,
      enum: DocumentTypes,
    },
    document_img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Document  Model.
export const Document = model<IDocument>('Document', documentSchema)
