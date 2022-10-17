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
