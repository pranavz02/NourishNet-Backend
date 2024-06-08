import express from 'express'
import { addFood, updateFood, deleteFood, getFood, getAllFood } from '../controllers/HoReKaController.js'
import { protect, isHoReKa } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/add', protect, isHoReKa, addFood)
      .put('/update/:id', protect, isHoReKa, updateFood)
      .delete('/delete/:id', protect, isHoReKa, deleteFood)
      .get('/get/:id', protect, isHoReKa, getFood)
      .get('/all', protect, isHoReKa, getAllFood)

export default router