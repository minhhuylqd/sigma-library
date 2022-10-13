import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  email: string
  password: string
  displayName: string
  status: 'ACTIVE' | 'BANNED'
  role: 'ADMIN' | 'USER'
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'BANNED'],
    default: 'ACTIVE',
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
