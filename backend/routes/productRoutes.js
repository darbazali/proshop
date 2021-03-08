import express from 'express'

import {
  getProductByID,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
