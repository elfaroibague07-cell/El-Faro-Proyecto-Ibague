class StorageService {
  /**
   * Sube una imagen para la sección de productos -> el-faro/products
   */
  async uploadProductImage(file: File): Promise<string> {
    return await uploadService.uploadImage(file, 'el-faro/products')
  }

  /**
   * Sube una imagen para la sección de bases -> el-faro/bases
   */
  async uploadBaseImage(file: File): Promise<string> {
    return await uploadService.uploadImage(file, 'el-faro/bases')
  }

  /**
   * Método que faltaba y causaba el TypeError: ir.deleteProductImage is not a function
   */
  async deleteProductImage(imageUrl: string): Promise<void> {
    await this.deleteImage(imageUrl)
  }

  async deleteBaseImage(imageUrl: string): Promise<void> {
    await this.deleteImage(imageUrl)
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