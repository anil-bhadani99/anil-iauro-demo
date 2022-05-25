import { Schema, model, Model, Document } from 'mongoose'

const { ObjectId } = Schema.Types

export interface UserDoc extends Document {
  id: typeof ObjectId
  fullName: string
  mobileNumber: string
  password: string
  role: string
  token: string
  lastLogin: Date
  isBlocked: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

// Static Methods
interface UserModel extends Model<UserDoc> {
  build(attrs: any): UserDoc
}

const userSchema = new Schema<UserDoc>(
  {
    fullName: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
    role: { type: String },
    token: { type: String },
    lastLogin: { type: Date },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    autoIndex: true,
    versionKey: false,
    timestamps: true,
  }
)

export const Users = model<UserDoc, UserModel>('User', userSchema)

// Static Methods
userSchema.statics.build = async (attrs: any) => {
  const user = new Users(attrs)
  await user.save()
  return user
}
