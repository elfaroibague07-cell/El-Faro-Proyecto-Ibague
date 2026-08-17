import { supabase } from '../lib/supabase'

class StorageService {

  private readonly bucket = 'products'

  async uploadProductImage(file: File): Promise<string> {

    const extension = file.name.split('.').pop()

    const fileName = `${crypto.randomUUID()}.${extension}`

    const filePath = `products/${fileName}`

    const { error } = await supabase.storage

      .from(this.bucket)

      .upload(filePath, file, {

        cacheControl: '3600',

        upsert: false

      })

    if (error) {

      throw error

    }

    const {

      data

    } = supabase.storage

      .from(this.bucket)

      .getPublicUrl(filePath)

    return data.publicUrl

  }

  private extractPathFromUrl(

    url: string

  ): string | null {

    if (!url) return null

    const marker = `/storage/v1/object/public/${this.bucket}/`

    const index = url.indexOf(marker)

    if (index === -1) {

      return null

    }

    return decodeURIComponent(

      url.substring(

        index + marker.length

      )

    )

  }

  async deleteProductImage(

    imageUrl: string

  ): Promise<void> {

    const path = this.extractPathFromUrl(

      imageUrl

    )

    if (!path) return

    const { error } = await supabase.storage

      .from(this.bucket)

      .remove([path])

    if (error) {

      throw error

    }

  }

  async replaceProductImage(

    oldImage: string,

    newFile: File

  ): Promise<string> {

    if (oldImage) {

      try {

        await this.deleteProductImage(

          oldImage

        )

      }

      catch {

        // Si la imagen anterior no existe,
        // continuamos normalmente.

      }

    }

    return await this.uploadProductImage(

      newFile

    )

  }

}

export default new StorageService()