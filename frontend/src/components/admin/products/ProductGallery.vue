<script setup lang="ts">
import type { Product } from '../../types/product'

defineProps<{

  product: Product

}>()
</script>

<template>

<div class="gallery">

  <img

    :src="product.image_url || '/placeholder.webp'"

    :alt="product.name"

  >

</div>

</template>

<style scoped>

.gallery{

background:var(--surface);

border:1px solid var(--border);

border-radius:24px;

overflow:hidden;

}

.gallery img{

display:block;

width:100%;

aspect-ratio:1/1;

object-fit:cover;

}

</style>