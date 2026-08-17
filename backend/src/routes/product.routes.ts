import { Router } from 'express'

import {
  getProductsController,
  createProductController,
  deleteProductController
} from '../controllers/product.controller'

import { upload } from '../middlewares/upload.middleware'

const router = Router()

/* GET /api/products */
router.get(
  '/',
  getProductsController
)

/* POST /api/products */
router.post(
  '/',
  upload.single('image'),
  createProductController
)

/* DELETE /api/products/:id */
router.delete(
  '/:id',
  deleteProductController
)

export default router