import { supabase } from '../lib/supabase'

export async function getBases() {
  const { data, error } = await supabase
    .from('bases')
    .select('*')
    .eq('active', true)
    .order('sort_order', {
      ascending: true
    })

  if (error) {
    throw error
  }

  return data
}

/* =========================================
   AGREGAR ESTA FUNCIÓN QUE FALTABA
========================================= */
export async function getBaseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('bases')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw error
  }

  return data
}