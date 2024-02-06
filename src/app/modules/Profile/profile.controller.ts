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

const getSingleProfileByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { user_id } = req.params
    const result = await ProfileService.getSingleProfileByUserId(user_id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single profile fetched by user id successfully',
      data: result,
    })
  }
)

const updateSingleProfileByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { user_id } = req.params
    const { ...userUpdateData } = req.body
    const result = await ProfileService.updateSingleProfileByUserId(
      user_id,
      userUpdateData
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single profile updated by user id successfully',
      data: result,
    })
  }
)

export const ProfileController = {
  createProfile,
  getSingleProfileByUserId,
  updateSingleProfileByUserId,
}
