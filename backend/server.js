'use strict'
console.clear()

import express from 'express'

import connectDB from './lib/connectDB.js'
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is working')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port 5000`)
})
