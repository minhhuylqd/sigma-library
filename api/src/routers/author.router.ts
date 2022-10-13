import { Router } from 'express'

import {
  getAuthorById,
  getAllAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author.controller'
import { credentialAuth, activeAuth, adminAuth } from '../middlewares/auth'

const router = Router()

router.get('/', getAllAuthors)
router.get('/:authorId', getAuthorById)
router.post('/', credentialAuth, activeAuth, adminAuth, addAuthor)
router.put('/:authorId', credentialAuth, activeAuth, adminAuth, updateAuthor)
router.delete('/:authorId', credentialAuth, activeAuth, adminAuth, deleteAuthor)

export default router
