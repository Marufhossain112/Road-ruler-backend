import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { IProfile } from './profile.interface'
import { DocumentTypes } from './profile.constant'

const profileSchema = new Schema<IProfile>(
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
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Profile  Model.
export const Profile = model<IProfile>('Profile', profileSchema)
