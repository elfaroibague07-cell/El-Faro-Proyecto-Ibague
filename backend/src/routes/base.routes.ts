import { Router } from 'express'

import {
  getBasesController
} from '../controllers/base.controller'

const router = Router()

/* =========================================
   GET - OBTENER TODAS LAS BASES
========================================= */

router.get(
  '/',
  getBasesController
)

export default router