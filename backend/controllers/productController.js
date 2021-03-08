import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})

// @desc    fetch a single product
// @route   GET /api/products/:id
// @access  public
const getProductByID = asyncHandler(async (req, res) => {
  const { id } = req.params

  const product = await Product.findById({ _id: id })
  if (product) return res.status(200).json(product)
  else {
    res.status(404)
    throw new Error('Product not found')
  }
})
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductByID, deleteProduct }
