import { Router } from 'express'

import {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController
} from '../controllers/product.controller'

import upload from '../middlewares/upload.middleware'

const router = Router()

/* =========================================
   GET - OBTENER PRODUCTOS
========================================= */

router.get(
  '/',
  getProductsController
)

/* =========================================
   POST - CREAR PRODUCTO
========================================= */

router.post(
  '/',
  upload.single('image'),
  createProductController
)

/* =========================================
   PUT - ACTUALIZAR PRODUCTO
========================================= */

router.put(
  '/:id',
  upload.single('image'),
  updateProductController
)

/* =========================================
   DELETE - ELIMINAR PRODUCTO
========================================= */

router.delete(
  '/:id',
  deleteProductController
)

export default router