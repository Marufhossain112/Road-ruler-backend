import { Types } from 'mongoose'
import { IDocumentTypes } from './profile.constant'
import { IUser } from '../User/user.interface'

export type IProfile = {
  document_type: IDocumentTypes
  document_img: string
  user_id: Types.ObjectId | IUser
}
