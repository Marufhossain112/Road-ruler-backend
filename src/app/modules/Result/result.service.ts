import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IResult } from './result.interface'
import { Answer } from '../Answer/answer.model'
import { Result } from './result.model'

const createResult = async (payload: IResult) => {
  const isUserAnswerExist = await Answer.find({
    user_id: payload.user_id,
  }).populate([
    {
      path: 'user_id',
    },
    {
      path: 'question_id',
    },
  ])
  console.log('🚀 isUserAnswerExist', isUserAnswerExist)
  if (isUserAnswerExist.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No answer found for this user')
  }
  const isUserResultExist = await Result.findOne({ user_id: payload.user_id })
  console.log('🚀 isUserResultExist', isUserResultExist)
  let result
  if (!isUserResultExist) {
    result = await Result.create(payload)
  }

  let score = 0
  const results = isUserAnswerExist.map(answer => ({
    selected_answer: answer.selected_answer,
    correct_answer: answer.question_id.correct_answer,
  }))
//   console.log('🚀 results', results)
  // return
  for (const { selected_answer, correct_answer } of results) {
    if (selected_answer === correct_answer) {
      score++
    }
  }
  result = await Result.findOneAndUpdate(
    { user_id: payload.user_id },
    { score },
    { new: true }
  )
  return result
}

// const getSingleAnswer = async (user_id: string, question_id: string) => {
//   const result = await Answer.findOne({ user_id, question_id }).populate([
//     {
//       path: 'user_id',
//     },
//     {
//       path: 'question_id',
//     },
//   ])
//   return result
// }
// const getAllAnswersByUserId = async (user_id: string) => {
//   const result = await Answer.find({ user_id }).populate([
//     {
//       path: 'user_id',
//     },
//     {
//       path: 'question_id',
//     },
//   ])
//   return result
// }

export const ResultService = {
  createResult,
  //   getSingleAnswer,
  //   getAllAnswersByUserId,
}
