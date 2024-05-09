import express from 'express'
import * as controllers from '../controllers/dictrict'
// CRUD
const router = express.Router()

router.get('/all', controllers.getDictricts)

export default router