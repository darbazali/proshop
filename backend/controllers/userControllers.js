import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
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

export default { authUser }
