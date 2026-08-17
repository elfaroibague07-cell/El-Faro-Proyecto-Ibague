import { Router } from 'express'

import {
  getProductsController,
  createProductController
} from '../controllers/product.controller'

import { upload } from '../middlewares/upload.middleware'

const router = Router()

router.get(
  '/',
  getProductsController
)

router.post(
  '/',
  upload.single('image'),
  createProductController
)

export default router