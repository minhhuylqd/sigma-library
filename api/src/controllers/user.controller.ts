import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
import userService from '../services/user.service'
import { BadRequestError, UnauthorizedError } from '../helpers/apiError'

// GET /users/me
export const getMyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    const user = await User.findById(id.toString()).select('-password')
    res.json(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/me
export const updateMyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    const update = req.body
    // For USER - Only update to password, displayName are allowed
    if (update.email || update.role || update.status) {
      throw new BadRequestError(
        'Only Update password and displayName are Allowed',
        400
      )
    }
    const updatedUser = await userService.updateUser(id, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// DELETE /users/me
export const deleteMyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id }: any = req.user
    if (!id) {
      throw new UnauthorizedError('Missing Credential', 401)
    }
    await userService.deleteUser(id.toString())
    res.status(204).json({
      message: 'Account Deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await User.find())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const update = req.body
    const updatedUser = await userService.updateUser(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    await userService.deleteUser(userId)
    res.status(204).json({
      message: 'User Deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
