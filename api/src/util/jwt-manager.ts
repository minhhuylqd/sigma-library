import jwt from 'jsonwebtoken'

import { JWT_SECRET } from './secrets'

export const generateJWT = (id: string, role: string, status: string) => {
  const payload = {
    id: id,
    role: role,
    status: status,
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}
