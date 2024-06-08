import express from 'express'
import { getFood, getAvailableFood, selectFood, deliverFood, inProcessFood, myFood } from '../controllers/NGOControllers.js'
import { protect, isNGO } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/get/:id', protect, isNGO, getFood)
      .get('/available', protect, isNGO, getAvailableFood)
      .get('/inprocess', protect, isNGO, inProcessFood)
      .get('/myfood', protect, isNGO, myFood)
      .put('/select/:id', protect, isNGO, selectFood)
      .put('/deliver/:id', protect, isNGO, deliverFood)

export default router