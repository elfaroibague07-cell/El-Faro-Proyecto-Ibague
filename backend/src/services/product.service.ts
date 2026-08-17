import { supabase } from '../config/supabase'

export interface CreateProductData {
  name: string
  slug: string
  description: string
  price: number
  long_description?: string | null
  material?: string | null
  size?: string | null
  category_id?: string | null
  featured?: boolean
  image_url?: string | null
  image_public_id?: string | null
}

/* =========================================
   GET - OBTENER PRODUCTOS
========================================= */

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', {
      ascending: false
    })

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   POST - CREAR PRODUCTO
========================================= */

export async function createProduct(
  product: CreateProductData
) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   GET - OBTENER PRODUCTO POR ID
========================================= */

export async function getProductById(
  id: string
) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   DELETE - ELIMINAR PRODUCTO
========================================= */

export async function deleteProduct(
  id: string
) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}