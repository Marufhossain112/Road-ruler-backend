import { Schema } from 'mongoose'
import { model } from 'mongoose'
import { ILicense } from './license.interface'

const licenseSchema = new Schema<ILicense>(
  {
    issue_date: {
      type: Date,
      default: Date.now,
    },
    expiry_date: {
      type: Date,
      default: () => {
        const oneYearLater = new Date()
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
        return oneYearLater
      },
    },
    license_number: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// 3. Create a License  Model.
export const License = model<ILicense>('License', licenseSchema)
