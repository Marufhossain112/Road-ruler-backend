import { Types } from 'mongoose'
import { IUser } from '../User/user.interface'
import { IPassStatus } from './result.constant'

export type IResult = {
  user_id: Types.ObjectId | IUser
  score: number
  pass_status: IPassStatus
}
