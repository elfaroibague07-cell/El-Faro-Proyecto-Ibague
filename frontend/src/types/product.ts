/* =========================================
   PRODUCT
========================================= */

export interface Product {

  id: string

  name: string

  slug: string

  description: string

  long_description: string | null

  material: string | null

  size: string | null

  price: number

  image_url: string | null

  featured: boolean

  active: boolean

  category_id: string | null

  created_at: string

  updated_at: string

}


/* =========================================
   PRODUCT FORM
========================================= */

export interface ProductForm {

  name: string

  slug: string

  description: string

  long_description: string

  material: string

  size: string

  price: number

  image_url: string | null

  featured: boolean

  active: boolean

  category_id: string | null

}