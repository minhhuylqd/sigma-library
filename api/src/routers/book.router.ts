import { Router } from 'express'

import {
  getBookById,
  getAllBooks,
  getAvailableCopiesByBookId,
  addBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller'
import { credentialAuth, activeAuth, adminAuth } from '../middlewares/auth'

const router = Router()

router.get('/', getAllBooks)
router.get('/:bookId', getBookById)
router.get('/:bookId/availableCopies', getAvailableCopiesByBookId)
router.post('/', credentialAuth, activeAuth, adminAuth, addBook)
router.put('/:bookId', credentialAuth, activeAuth, adminAuth, updateBook)
router.delete('/:bookId', credentialAuth, activeAuth, adminAuth, deleteBook)

export default router
