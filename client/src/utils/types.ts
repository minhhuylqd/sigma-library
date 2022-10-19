export type Book = {
  _id: string
  isbn: string
  title: string
  description?: string
  publisher?: string
  authors: string[]
  copies: number
  availableCopies: number
  authorNames: string[]
}

export type Author = {
  _id: string
  name: string
  dob: string
  dod?: string
}

export type BorrowedHistory = {
  _id: string
  bookId: string
  userId: string
  borrowedDate: string
  dueDate: string
  returnedDate?: string
}
