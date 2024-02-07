import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { QuestionService } from './question.service'

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const { ...QuestionData } = req.body
  const result = await QuestionService.createQuestion(QuestionData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Question created successfully',
    data: result,
  })
})
const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionService.getAllQuestions()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All questions fetched successfully',
    data: result,
  })
})

export const QuestionController = {
  createQuestion,
  getAllQuestions,
}
