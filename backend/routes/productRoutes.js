import express from 'express'
// import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    fetch all products
// @route   GET /api/products
// @access  public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
  })
)

// @desc    fetch a single product
// @route   GET /api/products/:id
// @access  public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params
    // if (!mongoose.isValidObjectId(id))
    //   return res.status(400).json({ error: 'Not a valid id' })
    const product = await Product.findById({ _id: id })
    if (product) return res.status(200).json(product)
    // else return res.status(404).json({ error: 'product not found' })
    else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
