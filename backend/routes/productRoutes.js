import express from "express"
const router = express.Router()

import {
  getProductById,
  getProducts,
} from "../controllers/productController.js"

// GET all products
router.route("/").get(getProducts)

// GET product by id
router.route("/:id").get(getProductById)

export default router
