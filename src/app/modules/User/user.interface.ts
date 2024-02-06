import { Model, Types } from 'mongoose'

export type IUser = {
  name: string
  email: string
  password: string
  address: string
  contact_details: string
}

export type IUserExist = {
  password: string
  email: string
  name: string
  address: string
  contact_details: string
  _id: Types.ObjectId | undefined
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<
    Pick<
      IUserExist,
      '_id' | 'email' | 'name' | 'password' | 'address' | 'contact_details'
    >
  >

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
