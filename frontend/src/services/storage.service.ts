import { uploadService } from './upload.service'

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

  async deleteImage(_imageUrl: string): Promise<void> {
    // Las eliminaciones en Cloudinary requieren credenciales backend privadas (Signatures).
    // Se deja vacío para evitar errores en cliente con subidas unsigned.
  }

  async replaceProductImage(_oldImage: string, newFile: File): Promise<string> {
    return await this.uploadProductImage(newFile)
  }

  async replaceBaseImage(_oldImage: string, newFile: File): Promise<string> {
    return await this.uploadBaseImage(newFile)
  }
}

export default new StorageService()