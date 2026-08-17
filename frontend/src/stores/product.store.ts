import { defineStore } from 'pinia'

import type {
  Product,
  ProductForm
} from '../types/product'

import ProductService from '../services/product.service'
import StorageService from '../services/storage.service'


export const useProductStore = defineStore(
  'products',
  {

    /* =========================================
       STATE
    ========================================= */

    state: () => ({

      products: [] as Product[],

      selectedProduct:
        null as Product | null,

      loading: false

    }),


    /* =========================================
       GETTERS
    ========================================= */

    getters: {

      /* =======================================
         PRODUCTOS DESTACADOS
      ======================================= */

      featuredProducts: state => {

        return state.products.filter(

          product =>

            product.featured &&
            product.active

        )

      },


      /* =======================================
         PRODUCTOS ACTIVOS
      ======================================= */

      activeProducts: state => {

        return state.products.filter(

          product =>
            product.active

        )

      },


      /* =======================================
         BUSCAR POR ID
      ======================================= */

      productById: state => {

        return (
          id: string
        ) => {

          return (

            state.products.find(

              product =>
                product.id === id

            ) ?? null

          )

        }

      },


      /* =======================================
         BUSCAR POR SLUG
      ======================================= */

      productBySlug: state => {

        return (
          slug: string
        ) => {

          return (

            state.products.find(

              product =>
                product.slug === slug

            ) ?? null

          )

        }

      }

    },


    /* =========================================
       ACTIONS
    ========================================= */

    actions: {


      /* =======================================
         CARGAR PRODUCTOS
      ======================================= */

      async loadProducts(): Promise<void> {

        this.loading = true

        try {

          const products =
            await ProductService.getProducts()


          this.products =
            products

        }

        catch (error) {

          console.error(
            'Error cargando productos:',
            error
          )

          this.products = []

          throw error

        }

        finally {

          this.loading = false

        }

      },


      /* =======================================
         OBTENER PRODUCTO POR ID
      ======================================= */

      async getProduct(
        id: string
      ): Promise<Product | null> {

        this.selectedProduct = null

        try {

          const product =
            await ProductService.getProductById(
              id
            )


          this.selectedProduct =
            product


          return product

        }

        catch (error) {

          console.error(
            'Error obteniendo producto:',
            error
          )

          throw error

        }

      },


      /* =======================================
         OBTENER PRODUCTO POR SLUG
      ======================================= */

      async getProductBySlug(
        slug: string
      ): Promise<Product | null> {

        this.selectedProduct = null

        try {

          const product =
            await ProductService.getProductBySlug(
              slug
            )


          this.selectedProduct =
            product


          return product

        }

        catch (error) {

          console.error(
            'Error obteniendo producto por slug:',
            error
          )

          throw error

        }

      },


      /* =======================================
         CREAR PRODUCTO
      ======================================= */

      async createProduct(
        product: ProductForm
      ): Promise<Product> {

        this.loading = true

        try {

          const created =
            await ProductService.createProduct(
              product
            )


          this.products.unshift(
            created
          )


          return created

        }

        catch (error) {

          console.error(
            'Error creando producto:',
            error
          )

          throw error

        }

        finally {

          this.loading = false

        }

      },


      /* =======================================
         ACTUALIZAR PRODUCTO
      ======================================= */

      async updateProduct(
        id: string,
        product: Partial<ProductForm>
      ): Promise<Product> {

        this.loading = true

        try {

          const updated =
            await ProductService.updateProduct(
              id,
              product
            )


          const index =
            this.products.findIndex(

              item =>
                item.id === id

            )


          if (index !== -1) {

            this.products.splice(

              index,

              1,

              updated

            )

          }


          if (
            this.selectedProduct?.id === id
          ) {

            this.selectedProduct =
              updated

          }


          return updated

        }

        catch (error) {

          console.error(
            'Error actualizando producto:',
            error
          )

          throw error

        }

        finally {

          this.loading = false

        }

      },


      /* =======================================
         ELIMINAR PRODUCTO
      ======================================= */

      async deleteProduct(
        id: string,
        imageUrl?: string
      ): Promise<void> {

        this.loading = true

        try {

          /*
           * Primero eliminamos el producto
           * de Supabase.
           */

          await ProductService.deleteProduct(
            id
          )


          /*
           * Actualizamos el estado local.
           */

          this.products =
            this.products.filter(

              product =>
                product.id !== id

            )


          /*
           * Limpiamos el producto seleccionado.
           */

          if (
            this.selectedProduct?.id === id
          ) {

            this.selectedProduct =
              null

          }


          /*
           * La imagen está almacenada
           * como recurso externo.
           *
           * Si falla su eliminación,
           * no revertimos el borrado
           * del producto.
           */

          if (imageUrl) {

            try {

              await StorageService
                .deleteProductImage(
                  imageUrl
                )

            }

            catch (storageError) {

              console.error(

                'Producto eliminado, pero no fue posible eliminar su imagen:',

                storageError

              )

            }

          }

        }

        catch (error) {

          console.error(
            'Error eliminando producto:',
            error
          )

          throw error

        }

        finally {

          this.loading = false

        }

      },


      /* =======================================
         LIMPIAR PRODUCTO SELECCIONADO
      ======================================= */

      clearSelectedProduct(): void {

        this.selectedProduct =
          null

      },


      /* =======================================
         LIMPIAR STORE
      ======================================= */

      clearStore(): void {

        this.products = []

        this.selectedProduct =
          null

      }

    }

  }
)