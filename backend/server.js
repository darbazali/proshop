'use strict'
console.clear()

import colors from 'colors'

import config from '../config/config.js'
import app from './express.js'
import connectDB from './helpers/connectDB.js'

// connect to db
connectDB()

app.listen(
  config.port,
  console.log(
    `Server running in ${config.env} mode on port ${config.port}`.yellow.bold
  )
)
