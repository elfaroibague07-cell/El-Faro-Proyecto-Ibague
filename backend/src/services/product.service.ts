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
  active?: boolean
  image_url?: string | null
  image_public_id?: string | null
}

/* =========================================
   GET ALL PRODUCTS
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
   GET PRODUCT BY ID
========================================= */

export async function getProductById(
  id: string
) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }

    throw error
  }

  return data
}

/* =========================================
   CREATE PRODUCT
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
   UPDATE PRODUCT
========================================= */

export async function updateProduct(
  id: string,
  product: Partial<CreateProductData>
) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   DELETE PRODUCT
========================================= */

export async function deleteProduct(
  id: string
) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}