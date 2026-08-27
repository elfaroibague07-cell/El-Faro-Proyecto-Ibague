import type { Request, Response } from 'express'

import {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/category.service'

/* =========================================
   GET - OBTENER CATEGORIAS
========================================= */

export async function getCategoriesController(
  req: Request,
  res: Response
) {
  try {
    const categories = await getCategories()

    return res.status(200).json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error(
      'Get categories error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al obtener las categorias'
    })
  }
}

/* =========================================
   GET - OBTENER CATEGORIA POR ID
========================================= */

export async function getCategoryByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la categoria es obligatorio'
      })
    }

    const category = await getCategoryById(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria no encontrada'
      })
    }

    return res.status(200).json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error(
      'Get category by id error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al obtener la categoria'
    })
  }
}

/* =========================================
   POST - CREAR CATEGORIA
========================================= */

export async function createCategoryController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      slug
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
        message: 'name y slug no pueden estar vacios'
      })
    }

    const existingCategory =
      await getCategoryBySlug(cleanSlug)

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe una categoria con ese slug',
        data: {
          id: existingCategory.id,
          slug: existingCategory.slug
        }
      })
    }

    const category = await createCategory({
      name: cleanName,
      slug: cleanSlug
    })

    return res.status(201).json({
      success: true,
      message: 'Categoria creada correctamente',
      data: category
    })
  } catch (error) {
    console.error(
      'Create category error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al crear la categoria'
    })
  }
}

/* =========================================
   PUT - ACTUALIZAR CATEGORIA
========================================= */

export async function updateCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la categoria es obligatorio'
      })
    }

    const currentCategory =
      await getCategoryById(id)

    if (!currentCategory) {
      return res.status(404).json({
        success: false,
        message: 'Categoria no encontrada'
      })
    }

    const {
      name,
      slug
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
        message: 'name y slug no pueden estar vacios'
      })
    }

    const existingCategory =
      await getCategoryBySlug(cleanSlug)

    if (
      existingCategory &&
      existingCategory.id !== id
    ) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe otra categoria con ese slug',
        data: {
          id: existingCategory.id,
          slug: existingCategory.slug
        }
      })
    }

    const category = await updateCategory(id, {
      name: cleanName,
      slug: cleanSlug
    })

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria no encontrada'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Categoria actualizada correctamente',
      data: category
    })
  } catch (error) {
    console.error(
      'Update category error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la categoria'
    })
  }
}

/* =========================================
   DELETE - ELIMINAR CATEGORIA
========================================= */

export async function deleteCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la categoria es obligatorio'
      })
    }

    const category =
      await getCategoryById(id)

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoria no encontrada'
      })
    }

    await deleteCategory(id)

    return res.status(200).json({
      success: true,
      message: 'Categoria eliminada correctamente'
    })
  } catch (error) {
    console.error(
      'Delete category error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la categoria'
    })
  }
}