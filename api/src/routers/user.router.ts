import { Router } from 'express'

import { credentialAuth, adminAuth, activeAuth } from '../middlewares/auth'
import {
  getMyAccount,
  updateMyAccount,
  deleteMyAccount,
  getAllUsers,
  updateUser,
  deleteUser,
} from './../controllers/user.controller'

const router = Router()

// Personal User Routes
router.get('/me', credentialAuth, getMyAccount)
//Only ACTIVE User are allowed to update account
router.put('/me', credentialAuth, activeAuth, updateMyAccount)
router.delete('/me', credentialAuth, deleteMyAccount)

// Admin Routes
router.get('/', credentialAuth, activeAuth, adminAuth, getAllUsers)
router.put('/:userId', credentialAuth, activeAuth, adminAuth, updateUser)
router.delete('/:userId', credentialAuth, activeAuth, adminAuth, deleteUser)

export default router
