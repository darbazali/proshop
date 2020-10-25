import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (product) {
    res.json(product)
  } else {
    // throw an error if product not found
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProducts, getProductById }
