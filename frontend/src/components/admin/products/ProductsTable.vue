<script setup lang="ts">
import ProductRow from './ProductRow.vue'
import type { Product } from '../../../types/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
}>()
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Destacado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <ProductRow
          v-for="product in products"
          :key="product.id"
          :product="product"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />

        <tr v-if="!products.length">
          <td colspan="6" class="empty">
            <div class="empty-state">
              <p>No hay productos registrados en este momento.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  overflow: hidden;
  overflow-x: auto;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

thead {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

th {
  padding: 18px 24px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

.empty {
  padding: 60px 24px;
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  margin: 0;
}
</style>