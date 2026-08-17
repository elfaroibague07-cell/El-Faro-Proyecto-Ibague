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

<td
  colspan="6"
  class="empty"
>

No hay productos registrados.

</td>

</tr>

</tbody>

</table>

</div>

</template>

<style scoped>

.table-container{
background:var(--surface);
border:1px solid var(--border);
border-radius:20px;
overflow:hidden;
overflow-x:auto;
}

table{
width:100%;
border-collapse:collapse;
min-width:900px;
}

thead{
background:rgba(255,255,255,.03);
}

th{
padding:18px 24px;
text-align:left;
font-size:.9rem;
font-weight:600;
color:var(--text-secondary);
border-bottom:1px solid var(--border);
white-space:nowrap;
}

.empty{
padding:40px;
text-align:center;
color:var(--text-secondary);
font-style:italic;
}

</style>