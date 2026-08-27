import { Router } from 'express'

import {
  getBasesController,
  getBaseByIdController,
  createBaseController,
  updateBaseController,
  deleteBaseController
} from '../controllers/base.controller'

const router = Router()

/* =========================================
   GET - OBTENER TODAS LAS BASES
========================================= */

router.get(
  '/',
  getBasesController
)

/* =========================================
   GET - OBTENER BASE POR ID
========================================= */

router.get(
  '/:id',
  getBaseByIdController
)

/* =========================================
   POST - CREAR BASE
========================================= */

router.post(
  '/',
  createBaseController
)

/* =========================================
   PUT - ACTUALIZAR BASE
========================================= */

router.put(
  '/:id',
  updateBaseController
)

/* =========================================
   DELETE - ELIMINAR BASE
========================================= */

router.delete(
  '/:id',
  deleteBaseController
)

export default router