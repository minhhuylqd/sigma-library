import Borrower, { BorrowerDocument } from '../models/Borrower'
import Book from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const getAllBorrowers = async (): Promise<BorrowerDocument[]> => {
  return Borrower.find()
}

const getBorrowerById = async (
  borrowerId: string
): Promise<BorrowerDocument> => {
  const borrower = await Borrower.findById(borrowerId)
  if (!borrower) {
    throw new NotFoundError(`Borrower ${borrower} not found`)
  }
  return borrower
}

export default {
  getAllBorrowers,
  getBorrowerById,
}
