import { UnauthorizedError } from './../helpers/apiError'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/User'
import { generateJWT } from '../util/jwt-manager'
import { BadRequestError } from '../helpers/apiError'

// POST /auth/register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, displayName } = req.body

    const userExisted = await User.findOne({ email: email })

    if (userExisted) {
      throw new BadRequestError('Email already Registered', 400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      email: email,
      password: hashedPassword,
      displayName: displayName,
    })

    user.save()

    res.status(201).json({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      token: generateJWT(user._id, user.role, user.status),
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// POST /auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid Login Credential', 401)
    }

    res.status(201).json({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      token: generateJWT(user._id, user.role, user.status),
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
