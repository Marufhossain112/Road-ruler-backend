import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { IResult } from './result.interface'
import { passStatus } from './result.constant'

const resultSchema = new Schema<IResult>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    pass_status: {
      type: String,
      enum: passStatus,
      required: true,
      default: 'Failed',
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Result  Model.
export const Result = model<IResult>('Result', resultSchema)
