import { Schema, model } from 'mongoose'
import { IUser, IUserExist, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

export const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  address: {
    type: String,
    required: true,
  },
  contact_details: {
    type: String,
    required: true,
  },
})

userSchema.statics.isUserExist = async function (
  email: string
): Promise<
  Partial<Pick<
    IUserExist,
    '_id' | 'password' | 'name' | 'email' | 'address' | 'contact_details'
  > | null>
> {
  const user = await User.findOne({ email }, { email: 1, name: 1, password: 1 })

  console.log('from login', user)
  return user
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword)
  // console.log('pasword.....', isMatched)

  return isMatched
}

userSchema.pre('save', async function (next) {
  ///hasing User Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
