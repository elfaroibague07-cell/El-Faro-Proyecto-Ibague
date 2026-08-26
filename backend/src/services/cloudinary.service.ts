import cloudinary from '../config/cloudinary.js'

export interface CloudinaryUploadResult {
  url: string
  publicId: string
}

export function uploadImage(
  buffer: Buffer
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'el-faro/products'
      },
      (error, result) => {
        if (error || !result) {
          reject(error)
          return
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id
        })
      }
    )

    stream.end(buffer)
  })
}

export function deleteImage(
  publicId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      (error, result: any) => {
        if (error) {
          reject(error)
          return
        }

        if (
          result.result !== 'ok' &&
          result.result !== 'not found'
        ) {
          reject(
            new Error(
              `Cloudinary delete failed: ${result.result}`
            )
          )
          return
        }

        resolve()
      }
    )
  })
}