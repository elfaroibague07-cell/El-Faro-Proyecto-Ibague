<script setup lang="ts">
import { PackageSearch, Plus } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>

<section class="empty">

  <div class="icon">

    <PackageSearch :size="70" />

  </div>

  <h2>

    No hay productos

  </h2>

  <p>

    Aún no has agregado productos al catálogo.
    Comienza creando el primero.

  </p>

  <button
   @click="emit('create')"
  >

  <Plus :size="18"/>

  Nuevo producto

</button>

</section>

</template>

<style scoped>

.empty{

padding:80px 30px;

display:flex;

flex-direction:column;

align-items:center;

text-align:center;

border:1px dashed var(--border);

border-radius:24px;

}

.icon{

margin-bottom:24px;

color:var(--primary);

}

h2{

margin-bottom:14px;

}

p{

max-width:520px;

margin-bottom:30px;

color:var(--text-secondary);

line-height:1.7;

}

button{

display:flex;

align-items:center;

gap:10px;

padding:14px 24px;

border:none;

border-radius:14px;

background:var(--primary);

color:white;

cursor:pointer;

font-weight:600;

transition:.3s;

}

button:hover{

transform:translateY(-2px);

}

</style>