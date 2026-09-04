<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

const emit = defineEmits<{
  (e:'create'):void
}>()

</script>


<template>


<header class="header">

  <div>

    <h1>

      Productos

    </h1>

    <p>

      Administra el catálogo de productos de El Faro.

    </p>

  </div>

  <button
  class="new-button"
  @click="emit('create')"
>

  <Plus :size="18" />

  Nuevo producto

</button>

</header>

</template>

<style scoped>

.header{

display:flex;

justify-content:space-between;

align-items:center;

gap:24px;

flex-wrap:wrap;

}

.header h1{

font-size:2rem;

font-weight:700;

margin-bottom:8px;

color:var(--text-primary);

}

.header p{

color:var(--text-secondary);

font-size:.95rem;

}

.new-button{

display:flex;

align-items:center;

gap:10px;

padding:14px 22px;

border:none;

border-radius:14px;

background:var(--primary);

color:black;

font-weight:600;

cursor:pointer;

transition:.3s;

}

.new-button:hover{

transform:translateY(-2px);

opacity:.95;

}

@media(max-width:768px){

.header{

flex-direction:column;

align-items:flex-start;

}

.new-button{

width:100%;

justify-content:center;

}

}

</style>