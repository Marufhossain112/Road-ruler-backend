import { IQuestion } from './question.interface'
import { Question } from './question.model'

const createQuestion = async (payload: IQuestion) => {
  const result = await Question.create(payload)
  return result
}
const getAllQuestions = async () => {
  const result = await Question.find()
  return result
}

export const QuestionService = {
  createQuestion,
  getAllQuestions,
}
