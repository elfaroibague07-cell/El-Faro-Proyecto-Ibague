import { supabase } from '../lib/supabase'
import type { Base, BaseForm } from '../types/base'
import { uploadService } from './upload.service'

export const baseService = {
  async getAll(): Promise<Base[]> {
    const { data, error } = await supabase
      .from('bases')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getBaseBySlug(slug: string): Promise<Base> {
    const { data, error } = await supabase
      .from('bases')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async create(form: BaseForm): Promise<Base> {
    let imageUrl = form.image_url || null

    if (form.image) {
      imageUrl = await uploadService.uploadImage(form.image, 'el-faro/bases')
    }

    const { data, error } = await supabase
      .from('bases')
      .insert([{
        name: form.name,
        slug: form.slug,
        price: form.price,
        status: form.status,
        featured: form.featured,
        description: form.description,
        image_url: imageUrl,
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: number | string, form: Partial<BaseForm>): Promise<Base> {
    let imageUrl = form.image_url

    if (form.image) {
      imageUrl = await uploadService.uploadImage(form.image, 'el-faro/bases')
    }

    const { data, error } = await supabase
      .from('bases')
      .update({
        name: form.name,
        slug: form.slug,
        price: form.price,
        status: form.status,
        featured: form.featured,
        description: form.description,
        ...(imageUrl !== undefined && { image_url: imageUrl }),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: number | string): Promise<void> {
    const { error } = await supabase
      .from('bases')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export async function getBaseBySlug(slug: string): Promise<Base> {
  return baseService.getBaseBySlug(slug)
}