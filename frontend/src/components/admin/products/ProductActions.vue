```vue
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
      title="Editar producto"
    >
      <Pencil :size="18" />
    </button>

    <button
      class="delete"
      @click="emit('delete')"
      title="Eliminar producto"
    >
      <Trash2 :size="18" />
    </button>

  </div>
</template>

<style scoped>

.actions {
  display: flex;
  gap: 10px;
}

button {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* EDITAR */
.edit {
  background: #2563eb;
  color: white;
}

.edit:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

/* ELIMINAR */
.delete {
  background: #dc2626;
  color: white;
}

.delete:hover {
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
}

</style>
```
