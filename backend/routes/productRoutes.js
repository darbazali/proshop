import express from 'express'

import {
  getProductByID,
  getProducts,
  deleteProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../lib/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductByID).delete(protect, admin, deleteProduct)

export default router
