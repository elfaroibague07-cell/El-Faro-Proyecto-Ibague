<script setup lang="ts">
import type { Product } from '../../../types/product'

import ProductStatus from './ProductStatus.vue'
import ProductActions from './ProductActions.vue'

const { product } = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
}>()

const formatPrice = (price: number) =>

  new Intl.NumberFormat('es-CO', {

    style: 'currency',

    currency: 'COP',

    maximumFractionDigits: 0

  }).format(price)
</script>

<template>

<tr>

  <td>

    <img

      :src="product.image_url || '/placeholder.webp'"

      :alt="product.name"

      class="image"

    >

  </td>

  <td>

    <div class="info">

      <strong>

        {{ product.name }}

      </strong>

      <small>

        {{ product.slug }}

      </small>

    </div>

  </td>

  <td>

    {{ formatPrice(product.price) }}

  </td>

  <td>

    <ProductStatus

      :active="product.active"

    />

  </td>

  <td>

    <span
      v-if="product.featured"
      class="featured"
    >

      ⭐

    </span>

    <span
      v-else
      class="inactive"
    >

      —

    </span>

  </td>

  <td>

    <ProductActions

      :product-id="product.id"

      @edit="emit('edit', product)"

      @delete="emit('delete', product)"

    />

  </td>

</tr>

</template>

<style scoped>

td{

padding:18px 24px;

border-bottom:1px solid var(--border);

vertical-align:middle;

}

.image{

width:72px;

height:72px;

border-radius:14px;

object-fit:cover;

border:1px solid var(--border);

background:var(--surface-light);

}

.info{

display:flex;

flex-direction:column;

gap:4px;

}

.info strong{

font-weight:600;

font-size:.98rem;

}

.info small{

font-size:.8rem;

color:var(--text-secondary);

}

.featured{

font-size:1.1rem;

}

.inactive{

color:var(--text-secondary);

}

</style>