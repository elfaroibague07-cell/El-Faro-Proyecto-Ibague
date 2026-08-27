import type { Request, Response } from 'express'

import {
  getProducts,
  createProduct,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from '../services/product.service'

import {
  uploadImage,
  deleteImage
} from '../services/cloudinary.service'

/* =========================================
   GET - OBTENER PRODUCTOS
========================================= */

export async function getProductsController(
  req: Request,
  res: Response
) {
  try {
    const products = await getProducts()

    return res.status(200).json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Get products error:', error)

    return res.status(500).json({
      success: false,
      message: 'Error al obtener los productos'
    })
  }
}

/* =========================================
   POST - CREAR PRODUCTO
========================================= */

export async function createProductController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      slug,
      description,
      price,
      long_description,
      material,
      size,
      category_id,
      featured
    } = req.body

    /* =======================================
       VALIDACIONES BÁSICAS
    ======================================= */

    if (
      !name ||
      !slug ||
      !description ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message:
          'name, slug, description y price son obligatorios'
      })
    }

    const cleanSlug = String(slug).trim()

    /* =======================================
       VALIDAR SLUG DUPLICADO
    ======================================= */

    const existingProduct =
      await getProductBySlug(cleanSlug)

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message:
          'Ya existe un producto con ese slug',
        data: {
          id: existingProduct.id,
          slug: existingProduct.slug
        }
      })
    }

    /* =======================================
       VALIDAR IMAGEN
    ======================================= */

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'La imagen es obligatoria'
      })
    }

    /* =======================================
       VALIDAR PRECIO
    ======================================= */

    const numericPrice = Number(price)

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'El precio debe ser un número mayor que 0'
      })
    }

    /* =======================================
       SUBIR IMAGEN A CLOUDINARY
    ======================================= */

    const uploadedImage = await uploadImage(
      req.file.buffer
    )

    /* =======================================
       CREAR PRODUCTO EN SUPABASE
    ======================================= */

    let product

    try {
      product = await createProduct({
        name: String(name).trim(),

        slug: cleanSlug,

        description:
          String(description).trim(),

        price: numericPrice,

        long_description:
          long_description
            ? String(long_description).trim()
            : null,

        material:
          material
            ? String(material).trim()
            : null,

        size:
          size
            ? String(size).trim()
            : null,

        category_id:
          category_id
            ? String(category_id)
            : null,

        featured:
          featured === 'true' ||
          featured === true,

        image_url:
          uploadedImage.url,

        image_public_id:
          uploadedImage.publicId
      })
    } catch (error) {
      /* =====================================
         ROLLBACK CLOUDINARY

         Si Supabase falla después de subir
         la imagen, eliminamos la imagen.
      ===================================== */

      try {
        await deleteImage(
          uploadedImage.publicId
        )
      } catch (rollbackError) {
        console.error(
          'Error eliminando imagen de rollback:',
          rollbackError
        )
      }

      throw error
    }

    /* =======================================
       RESPUESTA
    ======================================= */

    return res.status(201).json({
      success: true,
      message:
        'Producto creado correctamente',
      data: product
    })
  } catch (error) {
    console.error(
      'Create product error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Error al crear el producto'
    })
  }
}

/* =========================================
   PUT - ACTUALIZAR PRODUCTO
========================================= */

export async function updateProductController(
  req: Request,
  res: Response
) {
  let uploadedNewImageId: string | null = null

  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'El ID del producto es obligatorio'
      })
    }

    /* =======================================
       BUSCAR PRODUCTO ACTUAL
    ======================================= */

    const currentProduct =
      await getProductById(id)

    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    const {
      name,
      slug,
      description,
      price,
      long_description,
      material,
      size,
      category_id,
      featured,
      active
    } = req.body

    /* =======================================
       VALIDACIONES
    ======================================= */

    if (
      !name ||
      !slug ||
      !description ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message:
          'name, slug, description y price son obligatorios'
      })
    }

    const numericPrice = Number(price)

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'El precio debe ser un número mayor que 0'
      })
    }
    /* =======================================
   VALIDAR SLUG DUPLICADO
======================================= */

      const cleanSlug = String(slug).trim()

      const existingProduct =
        await getProductBySlug(cleanSlug)

      if (
        existingProduct &&
        existingProduct.id !== id
      ) {
        return res.status(409).json({
          success: false,
          message:
            'Ya existe otro producto con ese slug',
          data: {
            id: existingProduct.id,
            slug: existingProduct.slug
          }
        })
      }

    /* =======================================
       MANTENER IMAGEN ACTUAL
    ======================================= */

    let imageUrl =
      currentProduct.image_url

    let imagePublicId =
      currentProduct.image_public_id

    /* =======================================
       SI VIENE NUEVA IMAGEN
    ======================================= */

    if (req.file) {
      const uploadedImage =
        await uploadImage(
          req.file.buffer
        )

      imageUrl = uploadedImage.url

      imagePublicId =
        uploadedImage.publicId

      uploadedNewImageId =
        uploadedImage.publicId
    }

    /* =======================================
       ACTUALIZAR SUPABASE
    ======================================= */

    let product

    try {
      product = await updateProduct(id, {
        name: String(name).trim(),

        slug: cleanSlug,

        description:
          String(description).trim(),

        price: numericPrice,

        long_description:
          long_description
            ? String(long_description).trim()
            : null,

        material:
          material
            ? String(material).trim()
            : null,

        size:
          size
            ? String(size).trim()
            : null,

        category_id:
          category_id
            ? String(category_id)
            : null,

        featured:
          featured === 'true' ||
          featured === true,

        active:
          active === undefined
            ? currentProduct.active
            : active === 'true' ||
              active === true,

        image_url: imageUrl,

        image_public_id:
          imagePublicId
      })
    } catch (error) {
      /* =====================================
         ROLLBACK CLOUDINARY
         Si Supabase falla después de subir
         la nueva imagen, la eliminamos.
      ===================================== */

      if (uploadedNewImageId) {
        try {
          await deleteImage(
            uploadedNewImageId
          )
        } catch (rollbackError) {
          console.error(
            'Error eliminando imagen de rollback:',
            rollbackError
          )
        }
      }

      throw error
    }

    /* =======================================
       ELIMINAR IMAGEN ANTERIOR
       SOLO SI HABÍA UNA NUEVA
    ======================================= */

    if (
      req.file &&
      currentProduct.image_public_id
    ) {
      try {
        await deleteImage(
          currentProduct.image_public_id
        )
      } catch (imageError) {
        /*
         * El producto ya fue actualizado.
         * No devolvemos 500 porque la operación
         * principal sí terminó correctamente.
         */
        console.error(
          'Error eliminando imagen anterior:',
          imageError
        )
      }
    }

    return res.status(200).json({
      success: true,
      message:
        'Producto actualizado correctamente',
      data: product
    })
  } catch (error) {
    console.error(
      'Update product error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Error al actualizar el producto'
    })
  }
}

/* =========================================
   DELETE - ELIMINAR PRODUCTO
========================================= */

export async function deleteProductController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'El ID del producto es obligatorio'
      })
    }

    const product =
      await getProductById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Producto no encontrado'
      })
    }

    /* =======================================
       ELIMINAR IMAGEN CLOUDINARY
    ======================================= */

    if (product.image_public_id) {
      await deleteImage(
        product.image_public_id
      )
    }

    /* =======================================
       ELIMINAR PRODUCTO SUPABASE
    ======================================= */

    await deleteProduct(id)

    return res.status(200).json({
      success: true,
      message:
        'Producto eliminado correctamente'
    })
  } catch (error) {
    console.error(
      'Delete product error:',
      error
    )

    return res.status(500).json({
      success: false,
      message:
        'Error al eliminar el producto'
    })
  }
}