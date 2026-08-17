<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{

  title: string

}>()
</script>

<template>

<nav class="breadcrumb">

  <RouterLink to="/">

    Inicio

  </RouterLink>

  <span>/</span>

  <RouterLink to="/#catalog">

    Catálogo

  </RouterLink>

  <span>/</span>

  <strong>

    {{ title }}

  </strong>

</nav>

</template>

<style scoped>

.breadcrumb{

display:flex;

align-items:center;

gap:10px;

margin-bottom:32px;

font-size:.95rem;

color:var(--text-secondary);

flex-wrap:wrap;

}

a{

color:inherit;

text-decoration:none;

transition:.25s;

}

a:hover{

color:var(--primary);

}

strong{

color:var(--text);

font-weight:600;

}

</style>