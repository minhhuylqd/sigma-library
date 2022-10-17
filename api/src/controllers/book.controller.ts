import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import Borrower from '../models/Borrower'
import bookService from '../services/book.service'
import authorService from '../services/author.service'
import { BadRequestError } from '../helpers/apiError'

// GET /books/:bookId
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    const book = await bookService.getBookById(bookId)
    const availableCopies = await bookService.getBookAvailableCopies(book._id)
    let authorNames
    if (book.authors) {
      authorNames = await Promise.all(
        book.authors.map(async (authorId) => {
          const name = await authorService.getAuthorNameById(
            authorId.toString()
          )
          return name
        })
      )
    }
    res.json({
      ...book.toObject(),
      availableCopies: availableCopies,
      authorNames: authorNames ? authorNames : [],
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId/availableCopies
export const getAvailableCopiesByBookId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    const book = await bookService.getBookById(bookId)
    const bookCopies = book.copies
    const borrowedCopies = await Borrower.find({ bookId: bookId })
      .exists('returnedDate', false)
      .count()
    res.json({
      _id: book._id,
      availableCopies: bookCopies - borrowedCopies,
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allBooks = await bookService.getAllBooks()
    const returnedAllBooks = await Promise.all(
      allBooks.map(async (book) => {
        const availableCopies = await bookService.getBookAvailableCopies(
          book._id as string
        )
        let authorNames
        if (book.authors) {
          authorNames = await Promise.all(
            book.authors.map(async (authorId) => {
              const name = await authorService.getAuthorNameById(
                authorId.toString()
              )
              return name
            })
          )
        }
        return {
          ...book.toObject(),
          availableCopies: availableCopies,
          authorNames: authorNames ? authorNames : [],
        }
      })
    )
    res.json(returnedAllBooks)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /books
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isbn, title, description, publisher, authors, copies } = req.body

    const book = new Book({
      isbn: isbn,
      title: title,
      description: description,
      publisher: publisher,
      authors: authors,
      copies: copies,
    })

    await bookService.addBook(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    const update = req.body
    const updatedBook = await bookService.updateBook(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params
    await bookService.deleteBook(bookId)
    res.status(204).json({
      message: 'Book Deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
