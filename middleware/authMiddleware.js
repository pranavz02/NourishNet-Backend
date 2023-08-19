import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({msg: 'Not authorized, token failed'})
    }
  }

  if (!token) {
    res.status(401).json({msg: 'Not authorized, no token'})
  }
})

const isHoReKa = (req, res, next) => {
    if (req.user && req.user.type === 'HoReKa') {
      next()
    } else {
      res.status(401).json({msg: 'Not authorized as a HoReKa user'})
    }
}

const isNGO = (req, res, next) => {
    if (req.user && req.user.type === 'NGO') {
      next()
    } else {
        res.status(401).json({msg: 'Not authorized as a NGO user'})
    }
}

export { isHoReKa, isNGO, protect }