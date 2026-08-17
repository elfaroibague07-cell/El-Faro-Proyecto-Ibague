<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e:'close'): void
  (e:'confirm'): void
}>()
</script>

<template>

<Teleport to="body">

<div
  v-if="open"
  class="overlay"
>

<div class="modal">

<h3>Eliminar</h3>

<p>

¿Deseas eliminar
<strong>{{ title }}</strong>?

</p>

<div class="actions">

<button
  class="secondary"
  @click="emit('close')"
>

Cancelar

</button>

<button
  class="danger"
  :disabled="loading"
  @click="emit('confirm')"
>

{{ loading ? 'Eliminando...' : 'Eliminar' }}

</button>

</div>

</div>

</div>

</Teleport>

</template>

<style scoped>

.overlay{
position:fixed;
inset:0;
display:flex;
justify-content:center;
align-items:center;
background:rgba(0,0,0,.65);
z-index:9999;
}

.modal{
width:420px;
max-width:95%;
padding:28px;
border-radius:20px;
background:var(--surface);
}

.actions{
display:flex;
justify-content:flex-end;
gap:12px;
margin-top:24px;
}

.secondary,
.danger{
padding:12px 18px;
border:none;
border-radius:12px;
cursor:pointer;
}

.danger{
background:#dc2626;
color:#fff;
}

.secondary{
background:transparent;
border:1px solid var(--border);
}

</style>