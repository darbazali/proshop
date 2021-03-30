import express from 'express'
import userCtrl from '../controllers/userControllers.js'
import { protect, admin } from '../lib/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(userCtrl.registerUser)
  .get(protect, admin, userCtrl.getUsers)

router
  .route('/profile')
  .get(protect, userCtrl.getUserProfile)
  .put(protect, userCtrl.updateUserProfile)

router.route('/login').post(userCtrl.authUser)

router
  .route('/:id')
  .delete(protect, admin, userCtrl.deleteUser)
  .get(protect, admin, userCtrl.getUserById)
  .put(protect, admin, userCtrl.updateUser)

export default router
