<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'

defineProps<{
  productId: string
}>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>

<div class="actions">

  <button
    class="edit"
    @click="emit('edit')"
  >
    <Pencil :size="18" />
  </button>

  <button
    class="delete"
    @click="emit('delete')"
  >
    <Trash2 :size="18" />
  </button>

</div>

</template>

<style scoped>

.actions{

display:flex;

gap:10px;

}

button{

width:38px;

height:38px;

border:none;

border-radius:10px;

display:flex;

align-items:center;

justify-content:center;

cursor:pointer;

transition:.25s;

}

.edit{

background:#2563eb;

color:white;

}

.edit:hover{

transform:scale(1.05);

}

.delete{

background:#dc2626;

color:white;

}

.delete:hover{

transform:scale(1.05);

}

</style>