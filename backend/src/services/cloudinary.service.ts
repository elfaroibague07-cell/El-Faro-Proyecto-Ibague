import { cloudinary } from '../config/cloudinary'

export interface CloudinaryUploadResult {
  url: string
  publicId: string
}

export function uploadImage(
  buffer: Buffer
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
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