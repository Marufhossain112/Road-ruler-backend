import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IResult } from './result.interface'
import { Answer } from '../Answer/answer.model'
import { Result } from './result.model'
import { Question } from '../Question/question.model'

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
  const allQuestions = await Question.find()
  const passingScore = 0.7
  const totalQuestions = allQuestions.length
//   console.log('🚀 total questions', totalQuestions)
  const percentageScore = score / totalQuestions
//   console.log('🚀 percentage Score', percentageScore)
  const pass_status = percentageScore >= passingScore ? 'Passed' : 'Failed'
  result = await Result.findOneAndUpdate(
    { user_id: payload.user_id },
    { score, pass_status },
    { new: true }
  )
  return result
}



export const ResultService = {
  createResult,
  //   getSingleAnswer,
  //   getAllAnswersByUserId,
}
