import { supabase } from '../lib/supabase'
import type { Product, ProductForm } from '../types/product'
import { uploadService } from './upload.service'

class ProductService {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error obteniendo productos:', error)
      throw error
    }

    return data ?? []
  }

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('Error obteniendo producto por ID:', error)
      throw error
    }

    return data
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Error obteniendo producto por slug:', error)
      throw error
    }

    return data
  }

  async slugExists(slug: string, ignoreId?: string): Promise<boolean> {
    let query = supabase.from('products').select('id').eq('slug', slug)

    if (ignoreId) {
      query = query.neq('id', ignoreId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error validando slug:', error)
      throw error
    }

    return (data?.length ?? 0) > 0
  }

  async createProduct(product: ProductForm): Promise<Product> {
    let imageUrl = product.image_url || null

    if (product.image) {
      imageUrl = await uploadService.uploadImage(product.image, 'el-faro/products')
    }

    const payload = {
      name: product.name,
      slug: product.slug,
      price: product.price,
      status: product.status,
      featured: product.featured,
      description: product.description,
      long_description: product.long_description?.trim() || null,
      material: product.material?.trim() || null,
      size: product.size?.trim() || null,
      image_url: imageUrl
    }

    const { data, error } = await supabase
      .from('products')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('Error creando producto:', error)
      throw error
    }

    return data
  }

  async updateProduct(id: string, product: Partial<ProductForm>): Promise<Product> {
    let imageUrl = product.image_url

    if (product.image) {
      imageUrl = await uploadService.uploadImage(product.image, 'el-faro/products')
    }

    const payload: Partial<Product> = {
      ...product
    }

    delete (payload as any).image

    if (product.long_description !== undefined) {
      payload.long_description = product.long_description.trim() || null
    }

    if (product.material !== undefined) {
      payload.material = product.material.trim() || null
    }

    if (product.size !== undefined) {
      payload.size = product.size.trim() || null
    }

    if (imageUrl !== undefined) {
      payload.image_url = imageUrl || null
    }

    const { data, error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('Error actualizando producto:', error)
      throw error
    }

    return data
  }

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error eliminando producto:', error)
      throw error
    }
  }
}

export default new ProductService()