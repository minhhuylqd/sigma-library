import mongoose, { Date, Document } from 'mongoose'

export type AuthorDocument = Document & {
  name: string
  dob: Date
  dod: Date
}

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: Date,
  dod: Date,
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
