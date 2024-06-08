import express from 'express'
import { login, register, getUserProfile, updateUserProfile, getHoReKaUsers, getNGOUsers } from '../controllers/authController.js'
import { protect, isHoReKa, isNGO } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
      .post('/register', register)
      .get('/profile', protect, getUserProfile)
      .put('/profile', protect, updateUserProfile)
      .get('/horeka', protect, isHoReKa, getHoReKaUsers)
      .get('/ngo', protect, isNGO, getNGOUsers)

export default router