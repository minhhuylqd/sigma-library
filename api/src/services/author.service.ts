import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const getAuthorById = async (authorId: string): Promise<AuthorDocument> => {
  const author = await Author.findById(authorId)
  if (!author) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }
  return author
}

const getAllAuthors = async (): Promise<AuthorDocument[]> => {
  return Author.find()
}

const addAuthor = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const updateAuthor = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const author = await Author.findByIdAndUpdate(authorId, update, { new: true })

  if (!author) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return author
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const author = await Author.findByIdAndDelete(authorId)

  if (!author) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return author
}

export default {
  getAuthorById,
  getAllAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
}
