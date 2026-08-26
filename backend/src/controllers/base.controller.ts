import type { Request, Response } from 'express'

import {
  getBases
} from '../services/base.service'

/* =========================================
   GET - OBTENER BASES
========================================= */

export async function getBasesController(
  req: Request,
  res: Response
) {
  try {
    const bases = await getBases()

    return res.status(200).json({
      success: true,
      data: bases
    })
  } catch (error) {
    console.error(
      'Get bases error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al obtener las bases'
    })
  }
}