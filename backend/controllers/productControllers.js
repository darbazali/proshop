import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

/*=============================================================
FETCH ALL PRODUCTS
GET /api/products
Public
==============================================================*/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
})
/*=============================================================
FIND PRODUCT BY ID
GET /api/products/:id
Public
==============================================================*/
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) return res.status(200).json(product)
  else {
    return res.status(404).json({ error: 'Product not found' })
  }
})

export default { getProducts, getProductByID }
