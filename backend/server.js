'use strict'
console.clear()
global.log = console.log

import express from 'express'
import { config } from 'dotenv'

import products from './data/products.js'
import connectDB from './config/db.js'

connectDB()

const app = express()
config() // dotenv
const { PORT, NODE_ENV } = process.env

app.get('/', (req, res) => {
    res.send('API is working..')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params
    const product = products.find((p) => p._id === id)
    res.json(product)
})

app.listen(PORT, log(`Server running in ${NODE_ENV} mode on port ${PORT}`))
