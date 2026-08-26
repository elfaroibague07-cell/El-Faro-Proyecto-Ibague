import type { Request, Response } from 'express'

import {
  getBases,
  getBaseById,
  getBaseBySlug,
  createBase,
  updateBase,
  deleteBase
} from '../services/base.service'

/* =========================================
   GET - OBTENER TODAS LAS BASES
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

/* =========================================
   GET - OBTENER BASE POR ID
========================================= */

export async function getBaseByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la base es obligatorio'
      })
    }

    const base = await getBaseById(id)

    if (!base) {
      return res.status(404).json({
        success: false,
        message: 'Base no encontrada'
      })
    }

    return res.status(200).json({
      success: true,
      data: base
    })
  } catch (error) {
    console.error(
      'Get base by id error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al obtener la base'
    })
  }
}

/* =========================================
   POST - CREAR BASE
========================================= */

export async function createBaseController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      slug,
      description,
      image_url,
      image_public_id,
      active,
      sort_order
    } = req.body

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'name y slug son obligatorios'
      })
    }

    const cleanName = String(name).trim()
    const cleanSlug = String(slug).trim()

    if (!cleanName || !cleanSlug) {
      return res.status(400).json({
        success: false,
        message:
          'name y slug no pueden estar vacios'
      })
    }

    const existingBase =
      await getBaseBySlug(cleanSlug)

    if (existingBase) {
      return res.status(409).json({
        success: false,
        message:
          'Ya existe una base con ese slug',
        data: {
          id: existingBase.id,
          slug: existingBase.slug
        }
      })
    }

    const base = await createBase({
      name: cleanName,
      slug: cleanSlug,
      description:
        description
          ? String(description).trim()
          : null,
      image_url:
        image_url || null,
      image_public_id:
        image_public_id || null,
      active:
        active === undefined
          ? true
          : active === 'true' ||
            active === true,
      sort_order:
        sort_order !== undefined
          ? Number(sort_order)
          : 0
    })

    return res.status(201).json({
      success: true,
      message: 'Base creada correctamente',
      data: base
    })
  } catch (error) {
    console.error(
      'Create base error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al crear la base'
    })
  }
}

/* =========================================
   PUT - ACTUALIZAR BASE
========================================= */

export async function updateBaseController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'El ID de la base es obligatorio'
      })
    }

    const currentBase =
      await getBaseById(id)

    if (!currentBase) {
      return res.status(404).json({
        success: false,
        message: 'Base no encontrada'
      })
    }

    const {
      name,
      slug,
      description,
      image_url,
      image_public_id,
      active,
      sort_order
    } = req.body

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'name y slug son obligatorios'
      })
    }

    const cleanName = String(name).trim()
    const cleanSlug = String(slug).trim()

    if (!cleanName || !cleanSlug) {
      return res.status(400).json({
        success: false,
        message:
          'name y slug no pueden estar vacios'
      })
    }

    const existingBase =
      await getBaseBySlug(cleanSlug)

    if (
      existingBase &&
      existingBase.id !== id
    ) {
      return res.status(409).json({
        success: false,
        message:
          'Ya existe otra base con ese slug',
        data: {
          id: existingBase.id,
          slug: existingBase.slug
        }
      })
    }

    const base = await updateBase(id, {
      name: cleanName,
      slug: cleanSlug,
      description:
        description !== undefined
          ? String(description).trim()
          : currentBase.description,
      image_url:
        image_url !== undefined
          ? image_url
          : currentBase.image_url,
      image_public_id:
        image_public_id !== undefined
          ? image_public_id
          : currentBase.image_public_id,
      active:
        active === undefined
          ? currentBase.active
          : active === 'true' ||
            active === true,
      sort_order:
        sort_order !== undefined
          ? Number(sort_order)
          : currentBase.sort_order
    })

    if (!base) {
      return res.status(404).json({
        success: false,
        message: 'Base no encontrada'
      })
    }

    return res.status(200).json({
      success: true,
      message:
        'Base actualizada correctamente',
      data: base
    })
  } catch (error) {
    console.error(
      'Update base error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Error al actualizar la base'
    })
  }
}

/* =========================================
   DELETE - ELIMINAR BASE
========================================= */

export async function deleteBaseController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'El ID de la base es obligatorio'
      })
    }

    const base =
      await getBaseById(id)

    if (!base) {
      return res.status(404).json({
        success: false,
        message: 'Base no encontrada'
      })
    }

    await deleteBase(id)

    return res.status(200).json({
      success: true,
      message:
        'Base eliminada correctamente'
    })
  } catch (error) {
    console.error(
      'Delete base error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Error al eliminar la base'
    })
  }
}