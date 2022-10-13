import mongoose, { Document } from 'mongoose'

export type BorrowerDocument = Document & {
  bookId: mongoose.Schema.Types.ObjectId
  userId: mongoose.Schema.Types.ObjectId
  borrowedDate: mongoose.Schema.Types.Date
  dueDate: mongoose.Schema.Types.Date
  returnedDate?: mongoose.Schema.Types.Date
}

const borrowerSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  borrowedDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: mongoose.Schema.Types.Date,
    default: () => Date.now() + 3 * 7 * 24 * 60 * 60 * 1000, // 3 weeks
    required: true,
  },
  returnedDate: mongoose.Schema.Types.Date,
})

export default mongoose.model<BorrowerDocument>('Borrower', borrowerSchema)
