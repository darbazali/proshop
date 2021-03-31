import express from 'express'
import productCtrl from '../controllers/productControllers.js'
import { protect, admin } from '../lib/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .get(productCtrl.getProducts)
  .post(protect, admin, productCtrl.createProduct)

router
  .route('/:id')
  .get(productCtrl.getProductByID)
  .delete(protect, admin, productCtrl.deleteProduct)
  .put(protect, admin, productCtrl.updateProduct)

export default router
