import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import Borrower from '../models/Borrower'
import borrowerService from '../services/borrower.service'
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from '../helpers/apiError'

// GET /borrowers - Admin only - Get all borrowers
export const getAllBorrowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await borrowerService.getAllBorrowers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /borrowers/:borrowerId - Admin only - Get a specific borrower
export const getBorrowerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { borrowerId } = req.params
    const borrower = await borrowerService.getBorrowerById(borrowerId)
    res.json(borrower)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /borrowers/me - For user - Get their own borrower requests
export const getMyBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    const myBorrower = await Borrower.find({ userId: id.toString() })
    res.json(myBorrower)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /borrowers - For user to create borrower request
export const addBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    const userId = id.toString()

    const { bookId } = req.body

    const requestedBook = await Book.findById(bookId)
    if (!requestedBook) {
      throw new NotFoundError(`Book ${bookId} not found`)
    }
    const requestedBookCopies = requestedBook.copies

    const requestedBookBorrowedCopies = await Borrower.find({ bookId: bookId })
      .exists('returnedDate', false)
      .count()

    if (requestedBookCopies - requestedBookBorrowedCopies <= 0) {
      throw new NotFoundError('Out of Copies')
    }

    const borrower = new Borrower({
      userId: userId,
      bookId: bookId,
    })

    await borrower.save()

    res.json(borrower)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /borrowers/:borrowerId - For user to return book
export const updateBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    const userId = id.toString()

    const { borrowerId } = req.params
    const borrower = await Borrower.findById(borrowerId)
    if (!borrower) {
      throw new NotFoundError(`Borrower ${borrowerId} not found`)
    }
    if (borrower.userId.toString() != userId) {
      throw new UnauthorizedError(
        'Mismatch Credential between User and Borrower',
        401
      )
    }

    const { returnedDate } = req.body
    if (!returnedDate) {
      throw new BadRequestError('Borrower Request required returnedDate', 400)
    }

    await borrower.update({ returnedDate: returnedDate }, { new: true })

    res.status(200).json({
      message: 'Updated Borrower Successfully',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /borrowers/:borrowerId - Admin only - Rarely use
export const deleteBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { borrowerId } = req.params
    await Borrower.findByIdAndDelete(borrowerId)
    res.status(204).json({
      message: 'Borrower Deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
