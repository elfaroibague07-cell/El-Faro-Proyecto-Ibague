import { supabase } from '../lib/supabase'

import type { Category } from '../types/category'


class CategoryService {


  /*================================*/
  /* OBTENER CATEGORÍAS */
  /*================================*/

  async getCategories(): Promise<Category[]> {

    const { data, error } = await supabase

      .from('categories')

      .select('*')

      .order('created_at', {
        ascending: false
      })


    if (error) {

      console.error(
        'ERROR OBTENIENDO CATEGORÍAS:',
        error
      )

      throw error

    }


    return data ?? []

  }


  /*================================*/
  /* OBTENER CATEGORÍA POR ID */
  /*================================*/

  async getCategoryById(
    id: string
  ): Promise<Category | null> {

    const { data, error } = await supabase

      .from('categories')

      .select('*')

      .eq('id', id)

      .maybeSingle()


    if (error) {

      console.error(
        'ERROR OBTENIENDO CATEGORÍA:',
        error
      )

      throw error

    }


    return data

  }


  /*================================*/
  /* CREAR CATEGORÍA */
  /*================================*/

  async createCategory(
    category: Pick<Category, 'name' | 'slug'>
  ): Promise<Category> {

    console.log(
      'CREANDO CATEGORÍA:',
      category
    )


    const { data, error } = await supabase

      .from('categories')

      .insert({

        name: category.name,

        slug: category.slug

      })

      .select()

      .single()


    if (error) {

      console.error(
        'ERROR SUPABASE CREANDO CATEGORÍA:',
        error
      )

      throw error

    }


    console.log(
      'CATEGORÍA CREADA:',
      data
    )


    return data

  }


  /*================================*/
  /* ACTUALIZAR CATEGORÍA */
  /*================================*/

  async updateCategory(
    id: string,
    category: Pick<Category, 'name' | 'slug'>
  ): Promise<Category> {

    const { data, error } = await supabase

      .from('categories')

      .update({

        name: category.name,

        slug: category.slug

      })

      .eq('id', id)

      .select()

      .single()


    if (error) {

      console.error(
        'ERROR ACTUALIZANDO CATEGORÍA:',
        error
      )

      throw error

    }


    return data

  }


  /*================================*/
  /* ELIMINAR CATEGORÍA */
  /*================================*/

  async deleteCategory(
    id: string
  ): Promise<void> {

    const { error } = await supabase

      .from('categories')

      .delete()

      .eq('id', id)


    if (error) {

      console.error(
        'ERROR ELIMINANDO CATEGORÍA:',
        error
      )

      throw error

    }

  }

}


export default new CategoryService()