<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '../../types/product'
import { useProductStore } from '../../stores/product.store'
import { useCategoryStore } from '../../stores/category.store'

import ProductsHeader from '../../components/admin/products/ProductsHeader.vue'
import ProductsTable from '../../components/admin/products/ProductsTable.vue'
import EmptyProducts from '../../components/admin/products/EmptyProducts.vue'
import CreateProductModal from '../../components/admin/products/CreateProductModal.vue'
import CategoryForm from '../../components/admin/products/CategoryForm.vue'
import DeleteConfirmModal from '../../components/admin/common/DeleteConfirmModal.vue'
import AdminNav from '../../components/admin/common/AdminNav.vue'

import type { ProductForm } from '../../composables/useProductModal'

const store = useProductStore()
const categoryStore = useCategoryStore()

const openDeleteModal = ref(false)
const productToDelete = ref<Product | null>(null)
const openCreateModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const openCategoryModal = ref(false)
const deleting = ref(false)

onMounted(async () => {
  await Promise.all([
    store.loadProducts(),
    categoryStore.loadCategories()
  ])
})

const openProductModal = () => {
  selectedProduct.value = null
  openCreateModal.value = true
}

const editProduct = (product: Product) => {
  selectedProduct.value = product
  openCreateModal.value = true
}

const closeProductModal = () => {
  openCreateModal.value = false
  selectedProduct.value = null
}

const saveProduct = async (product: ProductForm) => {
  try {
    if (selectedProduct.value) {
      await store.updateProduct(selectedProduct.value.id, product)
    } else {
      await store.createProduct(product)
    }
    await categoryStore.loadCategories()
    closeProductModal()
  } catch (error) {
    console.error('Error guardando producto:', error)
  }
}

const deleteProduct = (product: Product) => {
  productToDelete.value = product
  openDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!productToDelete.value) return
  deleting.value = true
  try {
    await store.deleteProduct(productToDelete.value.id, productToDelete.value.image_url)
    openDeleteModal.value = false
    productToDelete.value = null
  } catch (error) {
    console.error('Error eliminando producto:', error)
  } finally {
    deleting.value = false
  }
}

const openCategoryForm = () => {
  openCategoryModal.value = true
}

const closeCategoryForm = () => {
  openCategoryModal.value = false
  categoryStore.loadCategories()
}

const saveCategory = async () => {
  await categoryStore.loadCategories()
}
</script>

<template>
<div class="admin-wrapper">
  <AdminNav />

  <section class="products-page">
    <div class="content-container">
      <ProductsHeader @create="openProductModal" />

      <div class="management-actions">
        <div class="management-info">
          <div class="info-text">
            <span class="management-label">✦ GESTIÓN DE CATEGORÍAS</span>
            <span class="management-count">
              {{ categoryStore.categories.length }} categorías registradas
            </span>
          </div>

          <button
            type="button"
            class="category-button"
            @click="openCategoryForm"
          >
            <span class="category-icon">+</span>
            <span>Gestionar categorías</span>
          </button>
        </div>
      </div>

      <div class="table-container">
        <ProductsTable
          v-if="store.products.length"
          :products="store.products"
          @edit="editProduct"
          @delete="deleteProduct"
        />

        <EmptyProducts
          v-else-if="!store.loading"
          @create="openProductModal"
        />
      </div>
    </div>

    <CreateProductModal
      :key="selectedProduct?.id ?? 'new'"
      :open="openCreateModal"
      :product="selectedProduct"
      :categories="categoryStore.categories"
      @close="closeProductModal"
      @save="saveProduct"
    />

    <CategoryForm
      :open="openCategoryModal"
      @close="closeCategoryForm"
      @save="saveCategory"
    />

    <DeleteConfirmModal
      :open="openDeleteModal"
      :title="productToDelete?.name || ''"
      :loading="deleting"
      @close="openDeleteModal = false"
      @confirm="confirmDelete"
    />
  </section>
</div>
</template>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  background: #060606;
  color: #ffffff;
}

.products-page {
  display: flex;
  flex-direction: column;
  padding: 40px 0 60px 0;
}

.content-container {
  width: min(1280px, 92%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.management-actions {
  display: flex;
  flex-direction: column;
}

.management-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 28px;
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.management-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.management-count {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

.category-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-button:hover {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.15);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 1.1rem;
  line-height: 1;
}

.table-container {
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
  .management-info {
    align-items: flex-start;
    flex-direction: column;
    padding: 20px;
  }

  .category-button {
    width: 100%;
  }
}
</style>