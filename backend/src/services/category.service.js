import { supabase } from '../config/supabase'

export interface CreateCategoryData {
  name: string
  slug: string
}

/* =========================================
   GET ALL CATEGORIES
========================================= */

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', {
      ascending: false
    })

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   GET CATEGORY BY ID
========================================= */

export async function getCategoryById(
  id: string
) {
  const { data, error } = await supabase
    .from('categories')
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
   GET CATEGORY BY SLUG
========================================= */

export async function getCategoryBySlug(
  slug: string
) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   CREATE CATEGORY
========================================= */

export async function createCategory(
  category: CreateCategoryData
) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   UPDATE CATEGORY
========================================= */

export async function updateCategory(
  id: string,
  category: Partial<CreateCategoryData>
) {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
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
   DELETE CATEGORY
========================================= */

export async function deleteCategory(
  id: string
) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}