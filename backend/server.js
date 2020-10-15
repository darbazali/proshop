'use strict'
console.clear()
global.log = console.log

import express from 'express'

import products from './data/products.js'

const app = express()

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

app.listen(5000, log('Server running on port 5000'))
