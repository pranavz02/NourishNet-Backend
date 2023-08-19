import User from '../models/userModel.js'
import Food from '../models/foodModel.js'
import asyncHandler from 'express-async-handler'

const addFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'HoReKa')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const { name, quantity, expiryDate, description, fromLocation } = req.body
    const food = await Food.create({ name, quantity, expiryDate, description, fromLocation, user, })
    if (!food)
        return res.status(400).json({ message: 'Invalid food data' })
    res.status(201).json({ food })
})

const updateFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'HoReKa')
        return res.status(400).json({ message: 'You are not authorized to update food' })

    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.user.toString() !== req.user._id.toString())
        return res.status(400).json({ message: 'You are not authorized to update this food' })

    const { name, quantity, expiryDate, description, fromLocation } = req.body
    food.name = name
    food.quantity = quantity
    food.expiryDate = expiryDate
    food.description = description
    food.fromLocation = fromLocation
    const updatedFood = await food.save()
    res.status(201).json({ updatedFood })
})

const deleteFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'HoReKa')
        return res.status(400).json({ message: 'You are not authorized to delete food' })

    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.user.toString() !== req.user._id.toString())
        return res.status(400).json({ message: 'You are not authorized to delete this food' })

    await food.remove()
    res.status(201).json({ message: 'Food deleted' })
})

const getFood = asyncHandler(async (req, res) => {
    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.user.toString() !== req.user._id.toString())
        return res.status(400).json({ message: 'You are not authorized to view this food' })
    res.status(201).json({ food })
})

const getAllFood = asyncHandler(async (req, res) => {
    const food = await Food.find({ user: req.user._id })
    res.status(201).json({ food })
})

export { addFood, updateFood, deleteFood, getFood, getAllFood }