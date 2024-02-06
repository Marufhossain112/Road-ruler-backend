import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { DocumentService } from './document.service'
import { Request, Response } from 'express'

const createDocument = catchAsync(async (req: Request, res: Response) => {
  const { ...documentData } = req.body
  const result = await DocumentService.createDocument(documentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Document created successfully',
    data: result,
  })
})

export const DocumentController = {
  createDocument,
}
