import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IResult } from './result.interface'
import { Answer } from '../Answer/answer.model'
import { Result } from './result.model'
import { Question } from '../Question/question.model'
import { generateLicenseNumber } from '../../../utils'
import { License } from '../License/license.model'

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
  //   console.log('🚀 isUserResultExist', isUserResultExist)
  let result
  if (!isUserResultExist) {
    result = await Result.create(payload)
  }

  let score = 0
  const results = isUserAnswerExist.map(answer => ({
    selected_answer: answer.selected_answer,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  const generateLicense = generateLicenseNumber()
  // console.log('License number', generateLicense)
  const isUserLicenseExist = await License.findOne({ user_id: payload.user_id })
  if (isUserLicenseExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User already has a license.')
  }
  let license
  if (pass_status === 'Passed') {
    license = await License.create({
      user_id: payload.user_id,
      license_number: generateLicense,
    })
  }
  result = await Result.findOneAndUpdate(
    { user_id: payload.user_id },
    { score, pass_status, license },
    { new: true }
  )
  return result?.populate([
    {
      path: 'user_id',
    },
    {
      path: 'license',
    },
  ])
}

export const ResultService = {
  createResult,
  //   getSingleAnswer,
  //   getAllAnswersByUserId,
}
