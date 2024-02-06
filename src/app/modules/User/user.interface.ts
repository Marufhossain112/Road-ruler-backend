import { Model, Types } from 'mongoose'
import { Role } from './user.constant'

export type IUser = {
  name: string
  email: string
  password: string
  address: string
  contact_details: string
  role: Role
}

export type IUserExist = {
  password: string
  email: string
  name: string
  address: string
  contact_details: string
  role: string
  _id: Types.ObjectId | undefined
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<
    Pick<
      IUserExist,
      | '_id'
      | 'email'
      | 'name'
      | 'password'
      | 'address'
      | 'contact_details'
      | 'role'
    >
  >

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
