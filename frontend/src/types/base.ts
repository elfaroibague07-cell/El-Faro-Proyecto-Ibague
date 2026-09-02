export interface Base {
  id: number | string
  name: string
  slug: string
  price: number
  status: 'Activo' | 'Inactivo'
  featured: boolean
  image_url: string | null
  description?: string
  created_at?: string
}

export interface BaseForm {
  name: string
  slug: string
  price: number
  status: 'Activo' | 'Inactivo'
  featured: boolean
  image: File | null
  image_url?: string // Añadido para preservar la URL actual al editar si no se selecciona un archivo nuevo
  description?: string
}