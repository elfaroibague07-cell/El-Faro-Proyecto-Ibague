<script setup lang="ts">

import {
  ref,
  onMounted
} from 'vue'

import type { Product } from '../../types/product'

import { useProductStore } from '../../stores/product.store'
import { useCategoryStore } from '../../stores/category.store'

import ProductsHeader from '../../components/admin/products/ProductsHeader.vue'
import ProductsTable from '../../components/admin/products/ProductsTable.vue'
import EmptyProducts from '../../components/admin/products/EmptyProducts.vue'
import CreateProductModal from '../../components/admin/products/CreateProductModal.vue'
import CategoryForm from '../../components/admin/products/CategoryForm.vue'
import DeleteConfirmModal from '../../components/admin/common/DeleteConfirmModal.vue'

import type { ProductForm } from '../../composables/useProductModal'


/*================================*/
/* STORES */
/*================================*/

const store =
  useProductStore()

const categoryStore =
  useCategoryStore()


/*================================*/
/* PRODUCTOS */
/*================================*/

const openDeleteModal =
  ref(false)

const productToDelete =
  ref<Product | null>(null)

const openCreateModal =
  ref(false)

const selectedProduct =
  ref<Product | null>(null)


/*================================*/
/* CATEGORÍAS */
/*================================*/

const openCategoryModal =
  ref(false)


/*================================*/
/* CARGAR DATOS */
/*================================*/

onMounted(async () => {

  await Promise.all([

    store.loadProducts(),

    categoryStore.loadCategories()

  ])

})


/*================================*/
/* CREAR PRODUCTO */
/*================================*/

const openProductModal = () => {

  selectedProduct.value =
    null

  openCreateModal.value =
    true

}


/*================================*/
/* EDITAR PRODUCTO */
/*================================*/

const editProduct = (
  product: Product
) => {

  selectedProduct.value =
    product

  openCreateModal.value =
    true

}


/*================================*/
/* CERRAR PRODUCTO */
/*================================*/

const closeProductModal = () => {

  openCreateModal.value =
    false

  selectedProduct.value =
    null

}


/*================================*/
/* GUARDAR PRODUCTO */
/*================================*/

const saveProduct = async (
  product: ProductForm
) => {

  try {

    if (
      selectedProduct.value
    ) {

      await store.updateProduct(

        selectedProduct.value.id,

        product

      )

    }

    else {

      await store.createProduct(

        product

      )

    }

    /*
     * Recargamos categorías
     * por si el producto quedó
     * relacionado con alguna.
     */

    await categoryStore.loadCategories()

    closeProductModal()

  }

  catch (error) {

    console.error(

      'Error guardando producto:',

      error

    )

  }

}


/*================================*/
/* ELIMINAR PRODUCTO */
/*================================*/

const deleteProduct = (
  product: Product
) => {

  productToDelete.value =
    product

  openDeleteModal.value =
    true

}


/*================================*/
/* CONFIRMAR ELIMINACIÓN */
/*================================*/

const deleting =
  ref(false)


const confirmDelete =
  async () => {

    if (
      !productToDelete.value
    ) {

      return

    }


    deleting.value =
      true


    try {

      await store.deleteProduct(

        productToDelete.value.id,

        productToDelete.value.image_url

      )


      openDeleteModal.value =
        false

      productToDelete.value =
        null

    }

    catch (error) {

      console.error(

        'Error eliminando producto:',

        error

      )

    }

    finally {

      deleting.value =
        false

    }

  }


/*================================*/
/* ABRIR CATEGORÍAS */
/*================================*/

const openCategoryForm =
  () => {

    openCategoryModal.value =
      true

  }


/*================================*/
/* CERRAR CATEGORÍAS */
/*================================*/

const closeCategoryForm =
  () => {

    openCategoryModal.value =
      false

    /*
     * Actualizamos el store
     * porque CategoryForm trabaja
     * directamente con CategoryService.
     */

    categoryStore.loadCategories()

  }


/*================================*/
/* CATEGORÍA CREADA */
/*================================*/

const saveCategory =
  async () => {

    /*
     * CategoryForm ya crea
     * directamente mediante
     * CategoryService.
     *
     * Aquí solamente sincronizamos
     * el store del padre.
     */

    await categoryStore.loadCategories()

  }

</script>


<template>

<section class="products-page">


  <!-- ================================= -->
  <!-- HEADER -->
  <!-- ================================= -->

  <ProductsHeader
    @create="openProductModal"
  />


  <!-- ================================= -->
  <!-- ACCIONES -->
  <!-- ================================= -->

  <div class="management-actions">


    <!-- ================================= -->
    <!-- CATEGORÍAS -->
    <!-- ================================= -->

    <div class="management-info">


      <div>

        <span class="management-label">

          CATEGORÍAS

        </span>


        <span class="management-count">

          {{ categoryStore.categories.length }}

          categorías creadas

        </span>

      </div>


      <button

        type="button"

        class="category-button"

        @click="openCategoryForm"

      >

        <span class="category-icon">

          +

        </span>


        Gestionar categorías

      </button>


    </div>


  </div>


  <!-- ================================= -->
  <!-- PRODUCTOS -->
  <!-- ================================= -->

  <ProductsTable

    v-if="store.products.length"

    :products="store.products"

    @edit="editProduct"

    @delete="deleteProduct"

  />


  <!-- ================================= -->
  <!-- SIN PRODUCTOS -->
  <!-- ================================= -->

  <EmptyProducts

    v-else-if="!store.loading"

    @create="openProductModal"

  />


  <!-- ================================= -->
  <!-- MODAL PRODUCTO -->
  <!-- ================================= -->

  <CreateProductModal

    :key="
      selectedProduct?.id ?? 'new'
    "

    :open="openCreateModal"

    :product="selectedProduct"

    :categories="
      categoryStore.categories
    "

    @close="closeProductModal"

    @save="saveProduct"

  />


  <!-- ================================= -->
  <!-- MODAL CATEGORÍAS -->
  <!-- ================================= -->

  <CategoryForm

    :open="openCategoryModal"

    @close="closeCategoryForm"

    @save="saveCategory"

  />


  <!-- ================================= -->
  <!-- MODAL ELIMINAR PRODUCTO -->
  <!-- ================================= -->

  <DeleteConfirmModal

    :open="openDeleteModal"

    :title="
      productToDelete?.name || ''
    "

    :loading="deleting"

    @close="
      openDeleteModal = false
    "

    @confirm="confirmDelete"

  />


</section>

</template>


<style scoped>

/*================================*/
/* PÁGINA */
/*================================*/

.products-page {

  display:flex;

  flex-direction:column;

  gap:24px;

}


/*================================*/
/* ACCIONES */
/*================================*/

.management-actions {

  display:flex;

  flex-direction:column;

  gap:16px;

}


/*================================*/
/* INFORMACIÓN CATEGORÍAS */
/*================================*/

.management-info {

  display:flex;

  align-items:center;

  justify-content:space-between;

  gap:20px;

  padding:
    18px
    20px;

  background:
    var(--surface);

  border:
    1px solid
    var(--border);

}


/*================================*/
/* TEXTO */
/*================================*/

.management-info > div:first-child {

  display:flex;

  flex-direction:column;

  gap:5px;

}


.management-label {

  color:
    var(--primary);

  font-size:10px;

  font-weight:600;

  letter-spacing:.16em;

}


.management-count {

  color:
    var(--text-secondary);

  font-size:13px;

}


/*================================*/
/* BOTÓN CATEGORÍAS */
/*================================*/

.category-button {

  display:inline-flex;

  align-items:center;

  justify-content:center;

  gap:8px;

  padding:
    11px
    18px;

  border:
    1px solid
    var(--primary);

  background:
    transparent;

  color:
    var(--primary);

  font-family:inherit;

  font-size:13px;

  font-weight:600;

  cursor:pointer;

  transition:
    background .2s ease,
    color .2s ease,
    transform .2s ease;

}


.category-button:hover {

  background:
    var(--primary);

  color:
    #070707;

  transform:
    translateY(-1px);

}


/*================================*/
/* ICONO */
/*================================*/

.category-icon {

  display:flex;

  align-items:center;

  justify-content:center;

  width:18px;

  height:18px;

  font-size:18px;

  line-height:1;

}


/*================================*/
/* MÓVIL */
/*================================*/

@media(max-width:600px) {

  .management-info {

    align-items:flex-start;

    flex-direction:column;

  }


  .category-button {

    width:100%;

  }

}

</style>