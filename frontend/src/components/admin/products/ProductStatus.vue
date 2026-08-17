<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<template>

<span
  class="status"
  :class="active ? 'active' : 'inactive'"
>

  {{ active ? 'Activo' : 'Inactivo' }}

</span>

</template>

<style scoped>

.status{

display:inline-flex;

align-items:center;

justify-content:center;

padding:6px 14px;

border-radius:999px;

font-size:.8rem;

font-weight:600;

}

.active{

background:rgba(34,197,94,.15);

color:#22c55e;

}

.inactive{

background:rgba(239,68,68,.15);

color:#ef4444;

}

</style>
