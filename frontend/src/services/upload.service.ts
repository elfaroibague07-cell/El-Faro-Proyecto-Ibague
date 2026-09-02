export const uploadService = {
  async uploadImages(files: File[], folderName = 'el-faro/products'): Promise<string[]> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', folderName)

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen a Cloudinary')
      }

      const data = await response.json()
      return data.secure_url as string
    })

    return Promise.all(uploadPromises)
  },

  async uploadImage(file: File, folderName = 'el-faro/products'): Promise<string> {
    const urls = await this.uploadImages([file], folderName)
    return urls[0]
  }
}