import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { IQuestion } from './question.interface'

const questionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correct_answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Question  Model.
export const Question = model<IQuestion>('Question', questionSchema)
