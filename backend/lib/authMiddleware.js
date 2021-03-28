import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import config from '../../config/config.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const { id } = jwt.verify(token, config.jwtSecret)
      req.user = await User.findById(id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized, token faild')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }
})
