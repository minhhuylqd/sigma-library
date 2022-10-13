import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const getBookById = async (bookId: string): Promise<BookDocument> => {
  const book = await Book.findById(bookId)
  if (!book) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  return book
}

const getAllBooks = async (): Promise<BookDocument[]> => {
  return Book.find()
}

const addBook = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const updateBook = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const book = await Book.findByIdAndUpdate(bookId, update, { new: true })

  if (!book) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return book
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const book = await Book.findByIdAndDelete(bookId)

  if (!book) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return book
}

export default {
  getBookById,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
}
