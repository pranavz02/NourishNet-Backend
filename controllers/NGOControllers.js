import User from '../models/userModel.js'
import Food from '../models/foodModel.js'
import asyncHandler from 'express-async-handler'

const getFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.user.toString() !== req.user._id.toString())
        return res.status(400).json({ message: 'You are not authorized to view this food' })
    res.status(201).json({ food })
})

const getAvailableFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const food = await Food.find({ pickedUpBy: null })
    if (!food)
        return res.status(400).json({ message: 'Food currently not available' })
    res.status(201).json({ food })
})

const inProcessFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const food = await Food.find({ pickedUpBy: {$ne:null} })
    if (!food)
        return res.status(400).json({ message: 'Food currently not available' })
    res.status(201).json({ food })
})

const myFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })
    const food = await Food.find({ user: req.user._id })
    if (!food)
        return res.status(400).json({ message: 'Food currently not available' })
    res.status(201).json({ food })
})

 

const selectFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.pickedUpBy.toString() === req.user._id.toString())
        return res.status(400).json({ message: 'You have already selected this food' })
    if (food.pickedUpBy !== null)
        return res.status(400).json({ message: 'Food already selected' })
    food.pickedUpBy = req.user._id
    await food.save()
    res.status(201).json({ food })
})

const deliverFood = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user.type !== 'NGO')
        return res.status(400).json({ message: 'You are not authorized to add food' })

    const food = await Food.findById(req.params.id)
    if (!food)
        return res.status(400).json({ message: 'Food not found' })
    if (food.pickedUpBy.toString() !== req.user._id.toString())
        return res.status(400).json({ message: 'You are not authorized to deliver this food' })
    if (food.isDelivered)
        return res.status(400).json({ message: 'Food already delivered' })
    food.isDelivered = true
    food.toLocation = req.body.toLocation
    await food.save()
    res.status(201).json({ food })
})

export { getFood, getAvailableFood, selectFood, deliverFood, inProcessFood, myFood }