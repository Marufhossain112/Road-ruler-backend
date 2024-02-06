import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { ILoginUser, IMyProfile, IRefreshTokenResponse } from './user.constant'
import { IUser } from './user.interface'
import { User } from './user.modal'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'

const createUserService = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email })
  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist. Please login')
  }

  const createdUser = await User.create(payload)
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }
  const result = await User.findById(createdUser._id)
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR, Please try again later!!!'
    )
  }
  const tokenInfo = {
    id: createdUser.id,
    email: payload.email,
    role: 'user',
  }

  const accessToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return { user: result, accessToken, refreshToken }
}

const loginService = async (payload: ILoginUser) => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)
  const isUser = await User.findOne({ email })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  //create access token & refresh token
  // const { _id, email: userEmail, role } = isUserExist
  console.log('isUserExist 🚀', isUserExist)
  const { role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return { user: isUser, accessToken, refreshToken }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userEmail } = verifiedToken

  // console.log(verifiedToken);

  const isUserExist = await User.isUserExist(userEmail)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      name: isUserExist.name,
      role: isUserExist.role,
      _id: isUserExist._id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const myProfileService = async (
  userData: JwtPayload
): Promise<IMyProfile | null> => {
  const result = await User.findOne(
    { _id: userData._id },
    {
      name: 1,
      email: 1,
    }
  )

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found !!')
  }

  return result
}

export const UserService = {
  createUserService,
  loginService,
  refreshToken,
  myProfileService,
}
