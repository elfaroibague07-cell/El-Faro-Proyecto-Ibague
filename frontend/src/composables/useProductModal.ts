import {
  reactive,
  ref,
  computed,
  onBeforeUnmount
} from 'vue'

import type { Product } from '../types/product'

import ProductService from '../services/product.service'
import StorageService from '../services/storage.service'


/* =========================================
   FORMULARIO
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


/* =========================================
   COMPOSABLE
========================================= */

export function useProductModal() {

  const saving = ref(false)

  const selectedImage = ref<File | null>(null)

  const imageChanged = ref(false)

  const slugEdited = ref(false)


  /* =========================================
     PREVIEW URL
  ========================================= */

  const previewUrl = ref<string | null>(null)


  /* =========================================
     FORMULARIO VACÍO
  ========================================= */

  const emptyForm = (): ProductForm => ({

    name: '',

    slug: '',

    description: '',

    long_description: '',

    material: '',

    size: '',

    price: 0,

    image_url: null,

    featured: false,

    active: true,

    category_id: null

  })


  const form =
    reactive<ProductForm>(
      emptyForm()
    )


  /* =========================================
     GENERAR SLUG
  ========================================= */

  function generateSlug(
    text: string
  ): string {

    return text

      .toLowerCase()

      .trim()

      .normalize('NFD')

      .replace(
        /[\u0300-\u036f]/g,
        ''
      )

      .replace(
        /\s+/g,
        '-'
      )

      .replace(
        /[^a-z0-9-]/g,
        ''
      )

      .replace(
        /-+/g,
        '-'
      )

      .replace(
        /^-+|-+$/g,
        '' 
      )

  }


  /* =========================================
     PREVIEW IMAGEN
  ========================================= */

  const previewImage =
    computed(() => {

      return (
        previewUrl.value ??
        form.image_url
      )

    })


  /* =========================================
     LIBERAR URL DE PREVIEW
  ========================================= */

  function revokePreviewUrl() {

    if (!previewUrl.value) {
      return
    }

    URL.revokeObjectURL(
      previewUrl.value
    )

    previewUrl.value = null

  }


  /* =========================================
     ACTUALIZAR SLUG
  ========================================= */

  function updateSlug(
    name: string
  ) {

    if (slugEdited.value) {
      return
    }

    form.slug =
      generateSlug(name)

  }


  /* =========================================
     SELECCIONAR IMAGEN
  ========================================= */

  function onImageSelected(
    event: Event
  ) {

    const input =
      event.target as HTMLInputElement


    if (!input.files?.length) {
      return
    }


    const file =
      input.files[0]


    /* -----------------------------------------
       VALIDAR TIPO
    ----------------------------------------- */

    if (
      !file.type.startsWith('image/')
    ) {

      throw new Error(
        'El archivo seleccionado debe ser una imagen.'
      )

    }


    /* -----------------------------------------
       VALIDAR TAMAÑO
    ----------------------------------------- */

    const maxSize =
      5 * 1024 * 1024


    if (file.size > maxSize) {

      throw new Error(
        'La imagen no puede superar los 5 MB.'
      )

    }


    revokePreviewUrl()


    selectedImage.value =
      file


    previewUrl.value =
      URL.createObjectURL(file)


    imageChanged.value =
      true

  }


  /* =========================================
     RESET FORM
  ========================================= */

  function resetForm() {

    revokePreviewUrl()


    Object.assign(
      form,
      emptyForm()
    )


    selectedImage.value =
      null


    imageChanged.value =
      false


    slugEdited.value =
      false


    saving.value =
      false

  }


  /* =========================================
     CARGAR PRODUCTO PARA EDITAR
  ========================================= */

  function fillForm(
    product: Product
  ) {

    revokePreviewUrl()


    Object.assign(
      form,
      {

        name:
          product.name,

        slug:
          product.slug,

        description:
          product.description,

        long_description:
          product.long_description ?? '',

        material:
          product.material ?? '',

        size:
          product.size ?? '',

        price:
          Number(product.price),

        image_url:
          product.image_url,

        featured:
          product.featured,

        active:
          product.active,

        category_id:
          product.category_id

      }
    )


    selectedImage.value =
      null


    imageChanged.value =
      false


    /*
     * Al editar no queremos
     * regenerar automáticamente
     * el slug existente.
     */

    slugEdited.value =
      true

  }


  /* =========================================
     VALIDAR FORMULARIO
  ========================================= */

  async function validate() {

    const name =
      form.name.trim()


    const slug =
      form.slug.trim()


    const description =
      form.description.trim()


    /* -----------------------------------------
       NOMBRE
    ----------------------------------------- */

    if (!name) {

      throw new Error(
        'Debe ingresar un nombre.'
      )

    }


    if (name.length < 3) {

      throw new Error(
        'El nombre debe tener al menos 3 caracteres.'
      )

    }


    /* -----------------------------------------
       SLUG
    ----------------------------------------- */

    if (!slug) {

      throw new Error(
        'Debe ingresar un slug.'
      )

    }


    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    ) {

      throw new Error(
        'El slug solo puede contener letras minúsculas, números y guiones.'
      )

    }


    /* -----------------------------------------
       DESCRIPCIÓN
    ----------------------------------------- */

    if (!description) {

      throw new Error(
        'Debe ingresar una descripción.'
      )

    }


    /* -----------------------------------------
       CATEGORÍA
    ----------------------------------------- */

    if (!form.category_id) {

      throw new Error(
        'Debe seleccionar una categoría.'
      )

    }


    /* -----------------------------------------
       PRECIO
    ----------------------------------------- */

    if (
      !Number.isFinite(form.price) ||
      form.price <= 0
    ) {

      throw new Error(
        'El precio debe ser mayor que cero.'
      )

    }

  }


  /* =========================================
     VALIDAR SLUG
  ========================================= */

  async function validateSlug(
    productId?: string
  ) {

    const slug =
      form.slug.trim()


    const exists =
      await ProductService.slugExists(
        slug,
        productId
      )


    if (exists) {

      throw new Error(
        'Ya existe un producto con ese slug.'
      )

    }

  }


  /* =========================================
     SUBIR IMAGEN
  ========================================= */

  async function uploadImage() {

    if (
      !imageChanged.value ||
      !selectedImage.value
    ) {

      return

    }


    const imageUrl =
      await StorageService.uploadProductImage(
        selectedImage.value
      )


    form.image_url =
      imageUrl

  }


  /* =========================================
     DESTRUIR COMPOSABLE
  ========================================= */

  onBeforeUnmount(() => {

    revokePreviewUrl()

  })


  /* =========================================
     RETURN
  ========================================= */

  return {

    form,

    saving,

    selectedImage,

    imageChanged,

    slugEdited,

    previewImage,

    generateSlug,

    onImageSelected,

    resetForm,

    fillForm,

    validate,

    validateSlug,

    uploadImage,

    updateSlug

  }

}