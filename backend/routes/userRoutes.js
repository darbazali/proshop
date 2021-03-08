import express from 'express'
import userCtrl from '../controllers/userController.js'
import { protect, admin } from '../lib/authMiddleware.js'

const router = express.Router()
router
  .route('/')
  .get(protect, admin, userCtrl.getUsers)
  .post(userCtrl.registerUser)
router.post('/login', userCtrl.authUser)
router
  .route('/profile')
  .get(protect, userCtrl.getUserProfile)
  .put(protect, userCtrl.updateUserProfile)

router.route('/:id').delete(protect, admin, userCtrl.deleteUser)

export default router
