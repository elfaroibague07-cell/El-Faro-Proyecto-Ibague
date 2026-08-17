<script setup lang="ts">
import type { Product } from '../../types/product'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div
    v-if="products.length"
    class="product-grid"
  >
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style scoped>
.product-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  align-items: stretch;
}

@media (max-width: 1100px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
}

@media (max-width: 700px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 420px) {
  .product-grid {
    gap: 20px;
  }
}
</style>