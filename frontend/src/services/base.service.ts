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