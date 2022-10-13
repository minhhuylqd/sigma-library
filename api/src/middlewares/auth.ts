import { Request, Response, NextFunction } from 'express'

import { verifyJWT } from '../util/jwt-manager'
import { UnauthorizedError, ForbiddenError } from '../helpers/apiError'
import User from '../models/User'

export const credentialAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedError('Unauthorized Request', 401)
    }

    const payload = verifyJWT(token)

    req.user = payload

    next()
  } catch (error) {
    next(error)
  }
}

export const activeAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    const user = await User.findById(id.toString())
    if (!user) {
      throw new UnauthorizedError('User is not exist', 401)
    } else if (user.status != 'ACTIVE') {
      throw new UnauthorizedError('Credential is not ACTIVE', 401)
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    const user = await User.findById(id.toString())
    if (!user) {
      throw new UnauthorizedError('User is not exist', 401)
    } else if (user.role != 'ADMIN') {
      throw new ForbiddenError('Admin Authorization Required', 403)
    }
    next()
  } catch (error) {
    next(error)
  }
}
