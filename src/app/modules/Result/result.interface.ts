import { Types } from 'mongoose'
import { IUser } from '../User/user.interface'
import { IPassStatus } from './result.constant'
import { ILicense } from '../License/license.interface'

export type IResult = {
  user_id: Types.ObjectId | IUser
  license: Types.ObjectId | ILicense
  score: number
  pass_status: IPassStatus
}
