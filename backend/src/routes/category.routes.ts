import { Router } from 'express'

import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
} from '../controllers/category.controller'

const router = Router()

/* =========================================
   GET - OBTENER TODAS LAS CATEGORÍAS
========================================= */

router.get(
  '/',
  getCategoriesController
)

/* =========================================
   GET - OBTENER CATEGORÍA POR ID
========================================= */

router.get(
  '/:id',
  getCategoryByIdController
)

/* =========================================
   POST - CREAR CATEGORÍA
========================================= */

router.post(
  '/',
  createCategoryController
)

/* =========================================
   PUT - ACTUALIZAR CATEGORÍA
========================================= */

router.put(
  '/:id',
  updateCategoryController
)

/* =========================================
   DELETE - ELIMINAR CATEGORÍA
========================================= */

router.delete(
  '/:id',
  deleteCategoryController
)

export default router
