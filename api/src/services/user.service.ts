import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const getUserById = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return user
}

const getAllUser = async (): Promise<UserDocument[]> => {
  return User.find()
}

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const user = await User.findByIdAndUpdate(userId, update)
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return user
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const user = await User.findByIdAndDelete(userId)
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return user
}

export default {
  getUserById,
  getAllUser,
  updateUser,
  deleteUser,
}
