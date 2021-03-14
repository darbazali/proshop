import express from 'express'
import userCtrl from '../controllers/userControllers.js'
import protect from '../lib/authMiddleware.js'
const router = express.Router()

router.route('/login').post(userCtrl.authUser)
router.route('/profile').get(protect, userCtrl.getUserProfile)

export default router
