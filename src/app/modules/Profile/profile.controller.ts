import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProfileService } from './profile.service'
import { Request, Response } from 'express'

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const { ...ProfileData } = req.body
  const result = await ProfileService.createProfile(ProfileData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile created successfully',
    data: result,
  })
})

export const ProfileController = {
  createProfile,
}
