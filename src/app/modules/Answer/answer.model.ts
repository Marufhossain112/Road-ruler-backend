import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { IAnswer } from './answer.interface'

const answerSchema = new Schema<IAnswer>(
  {
    selected_answer: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question_id: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Answer  Model.
export const Answer = model<IAnswer>('Answer', answerSchema)
