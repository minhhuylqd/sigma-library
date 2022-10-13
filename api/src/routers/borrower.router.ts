import { Router } from 'express'

import {
  getAllBorrowers,
  getBorrowerById,
  getMyBorrower,
  addBorrower,
  updateBorrower,
  deleteBorrower,
} from '../controllers/borrower.controller'
import { credentialAuth, activeAuth, adminAuth } from '../middlewares/auth'

const router = Router()

router.get('/', credentialAuth, activeAuth, adminAuth, getAllBorrowers)
router.get('/me', credentialAuth, getMyBorrower)
router.get(
  '/:borrowerId',
  credentialAuth,
  activeAuth,
  adminAuth,
  getBorrowerById
)
router.post('/', credentialAuth, activeAuth, addBorrower)
router.put('/:borrowerId', credentialAuth, activeAuth, updateBorrower)
router.delete(
  '/:borrowerId',
  credentialAuth,
  activeAuth,
  adminAuth,
  deleteBorrower
)

export default router
