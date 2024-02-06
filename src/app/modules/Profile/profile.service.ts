import { IProfile } from './profile.interface'
import { Profile } from './profile.model'

const createProfile = async (payload: IProfile) => {
  const result = await Profile.create(payload)
  return result
}

export const ProfileService = {
  createProfile,
}
