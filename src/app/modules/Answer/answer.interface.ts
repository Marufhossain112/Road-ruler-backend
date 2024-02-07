import { Types } from 'mongoose'
import { IUser } from '../User/user.interface'
import { IQuestion } from '../Question/question.interface'

export type IAnswer = {
  selected_answer: string
  user_id: Types.ObjectId | IUser
  question_id: Types.ObjectId | IQuestion
}
