import { Router } from 'express'
import multer from 'multer'

import {
  uploadImageController
} from '../controllers/upload.controller'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage()
})

router.post(
  '/image',
  upload.single('image'),
  uploadImageController
)

export default router