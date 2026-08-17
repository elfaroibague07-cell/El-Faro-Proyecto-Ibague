import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Category } from '../types/category'
import CategoryService from '../services/category.service'


export const useCategoryStore = defineStore(
  'category',
  () => {

    /*================================*/
    /* ESTADO */
    /*================================*/

    const categories =
      ref<Category[]>([])

    const loading =
      ref(false)

    const error =
      ref<string | null>(null)

    const selectedCategory =
      ref<Category | null>(null)


    /*================================*/
    /* COMPUTED */
    /*================================*/

    const hasCategories =
      computed(() => {

        return categories.value.length > 0

      })


    const categoryCount =
      computed(() => {

        return categories.value.length

      })


    /*================================*/
    /* CARGAR CATEGORÍAS */
    /*================================*/

    async function loadCategories() {

      loading.value = true

      error.value = null

      try {

        const data =
          await CategoryService.getCategories()

        categories.value = data

        return data

      }

      catch (err) {

        console.error(
          'ERROR CARGANDO CATEGORÍAS:',
          err
        )

        error.value =
          'No se pudieron cargar las categorías.'

        throw err

      }

      finally {

        loading.value = false

      }

    }


    /*================================*/
    /* CREAR CATEGORÍA */
    /*================================*/

    async function createCategory(
      category: Pick<Category, 'name' | 'slug'>
    ) {

      const categoryName =
        category.name.trim()


      if (!categoryName) {

        throw new Error(
          'El nombre de la categoría es obligatorio.'
        )

      }


      /*------------------------------*/
      /* SLUG */
      /*------------------------------*/

      const slug =
        category.slug?.trim() ||
        createSlug(categoryName)


      if (!slug) {

        throw new Error(
          'No se pudo generar un slug válido.'
        )

      }


      /*------------------------------*/
      /* DUPLICADOS */
      /*------------------------------*/

      const exists =
        categories.value.some(

          item =>

            item.name
              .trim()
              .toLowerCase() ===
            categoryName
              .toLowerCase()

        )


      if (exists) {

        throw new Error(
          'Ya existe una categoría con ese nombre.'
        )

      }


      loading.value = true

      error.value = null


      try {

        /*----------------------------*/
        /* SUPABASE */
        /*----------------------------*/

        const created =
          await CategoryService.createCategory({

            name: categoryName,

            slug

          })


        /*----------------------------*/
        /* ACTUALIZAR STORE */
        /*----------------------------*/

        categories.value.unshift(
          created
        )


        return created

      }

      catch (err) {

        console.error(
          'ERROR CREANDO CATEGORÍA:',
          err
        )

        error.value =
          'No se pudo crear la categoría.'

        throw err

      }

      finally {

        loading.value = false

      }

    }


    /*================================*/
    /* ACTUALIZAR CATEGORÍA */
    /*================================*/

    async function updateCategory(

      id: string,

      data: {

        name?: string

        slug?: string

      }

    ) {

      const category =
        categories.value.find(

          item =>
            item.id === id

        )


      if (!category) {

        throw new Error(
          'No se encontró la categoría.'
        )

      }


      /*------------------------------*/
      /* NOMBRE */
      /*------------------------------*/

      const updatedName =
        data.name?.trim()


      if (
        updatedName !== undefined &&
        !updatedName
      ) {

        throw new Error(
          'El nombre de la categoría no puede estar vacío.'
        )

      }


      /*------------------------------*/
      /* SLUG */
      /*------------------------------*/

      const updatedSlug =
        data.slug?.trim() ||
        (
          updatedName
            ? createSlug(updatedName)
            : category.slug
        )


      if (!updatedSlug) {

        throw new Error(
          'El slug de la categoría no es válido.'
        )

      }


      /*------------------------------*/
      /* DUPLICADOS */
      /*------------------------------*/

      if (updatedName) {

        const exists =
          categories.value.some(

            item =>

              item.id !== id &&

              item.name
                .trim()
                .toLowerCase() ===
              updatedName
                .toLowerCase()

          )


        if (exists) {

          throw new Error(
            'Ya existe otra categoría con ese nombre.'
          )

        }

      }


      loading.value = true

      error.value = null


      try {

        const updated =
          await CategoryService.updateCategory(

            id,

            {

              name:
                updatedName ??
                category.name,

              slug:
                updatedSlug

            }

          )


        /*----------------------------*/
        /* ACTUALIZAR ARRAY */
        /*----------------------------*/

        const index =
          categories.value.findIndex(

            item =>
              item.id === id

          )


        if (index !== -1) {

          categories.value[index] =
            updated

        }


        /*----------------------------*/
        /* ACTUALIZAR SELECCIÓN */
        /*----------------------------*/

        if (
          selectedCategory.value?.id === id
        ) {

          selectedCategory.value =
            updated

        }


        return updated

      }

      catch (err) {

        console.error(
          'ERROR ACTUALIZANDO CATEGORÍA:',
          err
        )

        error.value =
          'No se pudo actualizar la categoría.'

        throw err

      }

      finally {

        loading.value = false

      }

    }


    /*================================*/
    /* ELIMINAR CATEGORÍA */
    /*================================*/

    async function deleteCategory(
      id: string
    ) {

      const category =
        categories.value.find(

          item =>
            item.id === id

        )


      if (!category) {

        throw new Error(
          'No se encontró la categoría.'
        )

      }


      loading.value = true

      error.value = null


      try {

        await CategoryService.deleteCategory(
          id
        )


        /*----------------------------*/
        /* ACTUALIZAR ARRAY */
        /*----------------------------*/

        categories.value =
          categories.value.filter(

            item =>
              item.id !== id

          )


        /*----------------------------*/
        /* LIMPIAR SELECCIÓN */
        /*----------------------------*/

        if (
          selectedCategory.value?.id === id
        ) {

          selectedCategory.value =
            null

        }

      }

      catch (err) {

        console.error(
          'ERROR ELIMINANDO CATEGORÍA:',
          err
        )

        error.value =
          'No se pudo eliminar la categoría.'

        throw err

      }

      finally {

        loading.value = false

      }

    }


    /*================================*/
    /* OBTENER POR ID */
    /*================================*/

    function getCategoryById(
      id: string
    ) {

      return categories.value.find(

        category =>
          category.id === id

      ) ?? null

    }


    /*================================*/
    /* SELECCIONAR */
    /*================================*/

    function selectCategory(
      category: Category | null
    ) {

      selectedCategory.value =
        category

    }


    /*================================*/
    /* LIMPIAR ERROR */
    /*================================*/

    function clearError() {

      error.value = null

    }


    /*================================*/
    /* LIMPIAR ESTADO */
    /*================================*/

    function clearCategories() {

      categories.value = []

      selectedCategory.value =
        null

      error.value = null

    }


    /*================================*/
    /* GENERAR SLUG */
    /*================================*/

    function createSlug(
      value: string
    ): string {

      return value

        .toLowerCase()

        .normalize('NFD')

        .replace(
          /[\u0300-\u036f]/g,
          ''
        )

        .replace(
          /[^a-z0-9]+/g,
          '-'
        )

        .replace(
          /^-+|-+$/g,
          ''

        )

    }


    /*================================*/
    /* RETURN */
    /*================================*/

    return {

      /* Estado */

      categories,

      loading,

      error,

      selectedCategory,


      /* Computed */

      hasCategories,

      categoryCount,


      /* CRUD */

      loadCategories,

      createCategory,

      updateCategory,

      deleteCategory,


      /* Utilidades */

      getCategoryById,

      selectCategory,

      clearError,

      clearCategories,

      createSlug

    }

  }
)