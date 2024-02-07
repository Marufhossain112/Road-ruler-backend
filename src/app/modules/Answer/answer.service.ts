import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IAnswer } from './answer.interface'
import { Answer } from './answer.model'

const createAnswer = async (payload: IAnswer) => {
  const isAnswerExist = await Answer.findOne({
    user_id: payload.user_id,
    question_id: payload.question_id,
  })
  if (isAnswerExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already selected answer for this question'
    )
  }
  const result = await Answer.create(payload)
  return result
}

const getSingleAnswer = async (user_id: string, question_id: string) => {
  const result = await Answer.findOne({ user_id, question_id }).populate([
    {
      path: 'user_id',
    },
    {
      path: 'question_id',
    },
  ])
  return result
}
const getAllAnswersByUserId = async (user_id: string) => {
  const result = await Answer.find({ user_id }).populate([
    {
      path: 'user_id',
    },
    {
      path: 'question_id',
    },
  ])
  return result
}

export const AnswerService = {
  createAnswer,
  getSingleAnswer,
  getAllAnswersByUserId,
}
