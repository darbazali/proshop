import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../lib/generateToken.js'

/*=============================================================
AUTH THE USER & get Token
POST /api/users/login
Public
==============================================================*/
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //   make sure email and passwrod are provided by the user
  if (!email || !password) {
    res.status(401)
    throw new Error('Please provide email and password')
  }

  //   check if user exists
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else if (user && !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Password is incorrect')
  } else {
    res.status(401)
    throw new Error('Invalid email and password')
  }
})

/*=============================================================
Get User Profile
GET /api/users/profile
Private
==============================================================*/
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
/*=============================================================
UPDATE User Profile
PUT /api/users/profile
Private
==============================================================*/
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

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
    res.status(404)
    throw new Error('User not found')
  }
})

/*=============================================================
REGISTER NEW USER
POST /api/users/
Public
==============================================================*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // make suer data is provided
  if (!email || !name || !password) {
    res.status(400)
    throw new Error('name, email and password required')
  }
  const isExist = await User.findOne({ email })
  if (isExist) {
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
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/*=============================================================
Get All users
GET /api/users/
Private/Admin
==============================================================*/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)
})
/*=============================================================
Delete a User
DELETE /api/users/:id
Private/Admin
==============================================================*/
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export default {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
}
