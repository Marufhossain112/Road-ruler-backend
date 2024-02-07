import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { AnswerService } from './answer.service'

const createAnswer = catchAsync(async (req: Request, res: Response) => {
  const { ...AnswerData } = req.body
  const result = await AnswerService.createAnswer(AnswerData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Answer created successfully',
    data: result,
  })
})

const getSingleAnswer = catchAsync(async (req: Request, res: Response) => {
  const { user_id, question_id } = req.body
  const result = await AnswerService.getSingleAnswer(user_id, question_id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Answer fetched by user id successfully',
    data: result,
  })
})
const getAllAnswersByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { user_id } = req.params
    const result = await AnswerService.getAllAnswersByUserId(user_id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Answers fetched by user id successfully',
      data: result,
    })
  }
)

export const AnswerController = {
  createAnswer,
  getSingleAnswer,
  getAllAnswersByUserId,
}
