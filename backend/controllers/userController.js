import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import generateToken from '../lib/generateToken.js'

// list all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(401).json({ error: error })
  }
}

// @desc    Register new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).send('Invalid user data')
  }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user
    res.json({
      _id: _id,
      name: name,
      email: email,
      isAdmin: isAdmin,
      token: generateToken(_id),
    })
  } else {
    res.status(401).send('Invalid email or password')
    // throw new Error('Invalid email or password')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(mongoose.Types.ObjectId(req.user._id))
  if (user) {
    const { _id, name, email, isAdmin } = user
    res.json({
      _id: _id,
      name: name,
      email: email,
      isAdmin: isAdmin,
    })
  } else {
    return res.status(404).send('User not found')
  }
})
// @desc    Update user profile
// @route   GET /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  // logedin user
  const user = await User.findById(mongoose.Types.ObjectId(req.user._id))

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    return res.status(404).send('User not found')
  }
})

export default {
  getUsers,
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
}
