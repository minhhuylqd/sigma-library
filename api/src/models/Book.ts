import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: mongoose.Schema.Types.ObjectId[]
  copies: number
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  publisher: String,
  authors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
  },
  copies: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
