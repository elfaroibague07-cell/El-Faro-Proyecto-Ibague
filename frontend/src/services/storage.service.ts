class StorageService {
  private cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  private uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET

  /**
   * Sube una imagen genérica a Cloudinary en una carpeta específica
   */
  private async uploadImageToCloudinary(file: File, folder: string): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', this.uploadPreset)
    formData.append('folder', folder)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary')
    }

    const data = await response.json()
    return data.secure_url
  }

  /**
   * Sube una imagen para la sección de productos -> el-faro/products
   */
  async uploadProductImage(file: File): Promise<string> {
    return await this.uploadImageToCloudinary(file, 'el-faro/products')
  }

  /**
   * Sube una imagen para la sección de bases -> el-faro/bases
   */
  async uploadBaseImage(file: File): Promise<string> {
    return await this.uploadImageToCloudinary(file, 'el-faro/bases')
  }

  /**
   * Elimina la imagen del producto (manejado en cliente como vacío si es unsigned)
   */
  async deleteProductImage(_imageUrl: string): Promise<void> {
    await this.deleteImage(_imageUrl)
  }

  /**
   * Elimina la imagen de la base
   */
  async deleteBaseImage(_imageUrl: string): Promise<void> {
    await this.deleteImage(_imageUrl)
  }

  async deleteImage(_imageUrl: string): Promise<void> {
    // Las eliminaciones directas desde el cliente en Cloudinary requieren API Secret,
    // por lo que se omite o se maneja vía backend si es necesario.
  }

  async replaceProductImage(_oldImage: string, newFile: File): Promise<string> {
    return await this.uploadProductImage(newFile)
  }

  async replaceBaseImage(_oldImage: string, newFile: File): Promise<string> {
    return await this.uploadBaseImage(newFile)
  }
}

export default new StorageService()