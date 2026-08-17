import type { Request, Response } from 'express'

import {
  uploadImage
} from '../services/cloudinary.service'

export async function uploadImageController(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se recibió ninguna imagen'
      })
    }

    const result = await uploadImage(
      req.file.buffer
    )

    return res.status(201).json({
      success: true,
      message: 'Imagen subida correctamente',
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    })
  } catch (error) {
    console.error(
      'Cloudinary upload error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Error al subir la imagen'
    })
  }
}