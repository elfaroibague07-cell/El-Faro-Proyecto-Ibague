import { supabase } from '../lib/supabase'

import type {
  Product,
  ProductForm
} from '../types/product'


class ProductService {


  /* =========================================
     OBTENER PRODUCTOS
  ========================================= */

  async getProducts(): Promise<Product[]> {

    const { data, error } =
      await supabase

        .from('products')

        .select('*')

        .order('created_at', {
          ascending: false
        })


    if (error) {

      console.error(
        'Error obteniendo productos:',
        error
      )

      throw error

    }


    return data ?? []

  }


  /* =========================================
     OBTENER PRODUCTO POR ID
  ========================================= */

  async getProductById(
    id: string
  ): Promise<Product | null> {

    const { data, error } =
      await supabase

        .from('products')

        .select('*')

        .eq('id', id)

        .maybeSingle()


    if (error) {

      console.error(
        'Error obteniendo producto por ID:',
        error
      )

      throw error

    }


    return data

  }


  /* =========================================
     OBTENER PRODUCTO POR SLUG
  ========================================= */

  async getProductBySlug(
    slug: string
  ): Promise<Product | null> {

    const { data, error } =
      await supabase

        .from('products')

        .select('*')

        .eq('slug', slug)

        .maybeSingle()


    if (error) {

      console.error(
        'Error obteniendo producto por slug:',
        error
      )

      throw error

    }


    return data

  }


  /* =========================================
     VALIDAR SLUG
  ========================================= */

  async slugExists(
    slug: string,
    ignoreId?: string
  ): Promise<boolean> {

    let query =
      supabase

        .from('products')

        .select('id')

        .eq('slug', slug)


    if (ignoreId) {

      query =
        query.neq(
          'id',
          ignoreId
        )

    }


    const {
      data,
      error
    } = await query


    if (error) {

      console.error(
        'Error validando slug:',
        error
      )

      throw error

    }


    return (
      (data?.length ?? 0) > 0
    )

  }


  /* =========================================
     CREAR PRODUCTO
  ========================================= */

  async createProduct(
    product: ProductForm
  ): Promise<Product> {

    /*
     * ProductForm utiliza strings vacíos
     * para campos opcionales.
     *
     * La base de datos utiliza null.
     */

    const payload:
      Omit<
        Product,
        'id' |
        'created_at' |
        'updated_at'
      > = {

      ...product,

      long_description:
        product.long_description.trim() ||
        null,

      material:
        product.material.trim() ||
        null,

      size:
        product.size.trim() ||
        null,

      image_url:
        product.image_url ||
        null

    }


    const {
      data,
      error
    } =
      await supabase

        .from('products')

        .insert(payload)

        .select('*')

        .single()


    if (error) {

      console.error(
        'Error creando producto:',
        error
      )

      throw error

    }


    return data

  }


  /* =========================================
     ACTUALIZAR PRODUCTO
  ========================================= */

  async updateProduct(
    id: string,
    product: Partial<ProductForm>
  ): Promise<Product> {

    /*
     * Utilizamos Product como referencia
     * porque algunos campos pueden convertirse
     * de string a null antes de enviarlos.
     */

    const payload:
      Partial<Product> = {

      ...product

    }


    /* =======================================
       NORMALIZAR DESCRIPCIÓN LARGA
    ======================================= */

    if (
      product.long_description !==
      undefined
    ) {

      payload.long_description =
        product.long_description.trim() ||
        null

    }


    /* =======================================
       NORMALIZAR MATERIAL
    ======================================= */

    if (
      product.material !==
      undefined
    ) {

      payload.material =
        product.material.trim() ||
        null

    }


    /* =======================================
       NORMALIZAR TAMAÑO
    ======================================= */

    if (
      product.size !==
      undefined
    ) {

      payload.size =
        product.size.trim() ||
        null

    }


    /* =======================================
       NORMALIZAR IMAGEN
    ======================================= */

    if (
      product.image_url !==
      undefined
    ) {

      payload.image_url =
        product.image_url ||
        null

    }


    const {
      data,
      error
    } =
      await supabase

        .from('products')

        .update(payload)

        .eq('id', id)

        .select('*')

        .single()


    if (error) {

      console.error(
        'Error actualizando producto:',
        error
      )

      throw error

    }


    return data

  }


  /* =========================================
     OBTENER IMAGEN
  ========================================= */

  async getProductImage(
    id: string
  ): Promise<string | null> {

    const {
      data,
      error
    } =
      await supabase

        .from('products')

        .select('image_url')

        .eq('id', id)

        .maybeSingle()


    if (error) {

      console.error(
        'Error obteniendo imagen del producto:',
        error
      )

      throw error

    }


    return data?.image_url ?? null

  }


  /* =========================================
     ELIMINAR PRODUCTO
  ========================================= */

  async deleteProduct(
    id: string
  ): Promise<void> {

    const {
      error
    } =
      await supabase

        .from('products')

        .delete()

        .eq('id', id)


    if (error) {

      console.error(
        'Error eliminando producto:',
        error
      )

      throw error

    }

  }

}


export default new ProductService()