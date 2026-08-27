import { supabase } from '../config/supabase'

export interface CreateBaseData {
  name: string
  slug: string
  description?: string | null
  image_url?: string | null
  image_public_id?: string | null
  active?: boolean
  sort_order?: number
}

/* =========================================
   GET ALL BASES
========================================= */

export async function getBases() {
  const { data, error } = await supabase
    .from('bases')
    .select('*')
    .order('sort_order', {
      ascending: true
    })

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   GET BASE BY ID
========================================= */

export async function getBaseById(
  id: string
) {
  const { data, error } = await supabase
    .from('bases')
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
   GET BASE BY SLUG
========================================= */

export async function getBaseBySlug(
  slug: string
) {
  const { data, error } = await supabase
    .from('bases')
    .select('id, slug')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   CREATE BASE
========================================= */

export async function createBase(
  base: CreateBaseData
) {
  const { data, error } = await supabase
    .from('bases')
    .insert(base)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   UPDATE BASE
========================================= */

export async function updateBase(
  id: string,
  base: Partial<CreateBaseData>
) {
  const { data, error } = await supabase
    .from('bases')
    .update(base)
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
   DELETE BASE
========================================= */

export async function deleteBase(
  id: string
) {
  const { error } = await supabase
    .from('bases')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}