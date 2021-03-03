import express from 'express'

import {
  getProductByID,
  getProducts,
} from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductByID)

export default router
