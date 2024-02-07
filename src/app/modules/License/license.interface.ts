import { Date, Types } from 'mongoose'
import { IUser } from '../User/user.interface'

export type ILicense = {
  issue_date: Date
  expiry_date: Date
  license_number: string
  user_id: Types.ObjectId | IUser
}
