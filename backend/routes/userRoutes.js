import express from 'express'
import userCtrl from '../controllers/userControllers.js'

const router = express.Router()

router.route('/login').post(userCtrl.authUser)

export default router
