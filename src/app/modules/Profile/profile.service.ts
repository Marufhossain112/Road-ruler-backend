import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { IProfile } from './profile.interface'
import { Profile } from './profile.model'
import { IUser } from '../User/user.interface'
import { User } from '../User/user.modal'

const createProfile = async (payload: IProfile) => {
  const result = await Profile.create(payload)
  return result
}

const getSingleProfileByUserId = async (user_id: string) => {
  const result = await Profile.findOne({ user_id }).populate('user_id')
  return result
}
const updateSingleProfileByUserId = async (
  user_id: string,
  payload: Partial<IUser>
) => {
  const userProfile = await Profile.findOne({ user_id })
  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found')
  }
  // const user = await User.findById( user_id )
  const updatedUser = await User.findOneAndUpdate(
    { _id: user_id },
    {
      $set: {
        name: payload.name,
        email: payload.email,
        address: payload.address,
        contact_details: payload.contact_details,
      },
    },
    {
      new: true,
    }
  )
  return updatedUser
}

export const ProfileService = {
  createProfile,
  getSingleProfileByUserId,
  updateSingleProfileByUserId,
}
