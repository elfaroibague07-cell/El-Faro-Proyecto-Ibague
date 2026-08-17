import type { Request, Response } from 'express'

import {
  getProducts,
  createProduct,
  getProductById,
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'La imagen es obligatoria'
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
       CLOUDINARY
    ======================================= */

    const uploadedImage = await uploadImage(
      req.file.buffer
    )

    /* =======================================
       SUPABASE
    ======================================= */

    const product = await createProduct({
      name: String(name).trim(),

      slug: String(slug).trim(),

      description: String(description).trim(),

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

      image_url: uploadedImage.url,

      image_public_id:
        uploadedImage.publicId
    })

    return res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: product
    })
  } catch (error) {
    console.error(
      'Create product error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al crear el producto'
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
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'El ID del producto es obligatorio'
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

    if (!name || !slug || !description || !price) {
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
       DATOS A ACTUALIZAR
    ======================================= */

    let imageUrl = currentProduct.image_url
    let imagePublicId =
      currentProduct.image_public_id

    let newImageUploaded = false

    /* =======================================
       NUEVA IMAGEN
    ======================================= */

    if (req.file) {
      const uploadedImage =
        await uploadImage(req.file.buffer)

      imageUrl = uploadedImage.url
      imagePublicId =
        uploadedImage.publicId

      newImageUploaded = true
    }

    /* =======================================
       ACTUALIZAR SUPABASE
    ======================================= */

    const product =
      await updateProduct(id, {
        name: String(name).trim(),

        slug: String(slug).trim(),

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

    /* =======================================
       ELIMINAR IMAGEN ANTERIOR
       SOLO DESPUÉS DE ACTUALIZAR
    ======================================= */

    if (
      newImageUploaded &&
      currentProduct.image_public_id
    ) {
      await deleteImage(
        currentProduct.image_public_id
      )
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

    /* =======================================
       VALIDAR ID
    ======================================= */

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'El ID del producto es obligatorio'
      })
    }

    /* =======================================
       BUSCAR PRODUCTO
    ======================================= */

    const product = await getProductById(id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    /* =======================================
       ELIMINAR IMAGEN DE CLOUDINARY
    ======================================= */

    if (product.image_public_id) {
      await deleteImage(
        product.image_public_id
      )
    }

    /* =======================================
       ELIMINAR PRODUCTO DE SUPABASE
    ======================================= */

    await deleteProduct(id)

    /* =======================================
       RESPUESTA
    ======================================= */

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