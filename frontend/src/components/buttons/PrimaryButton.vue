<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <a
    :href="href"
    class="primary-button"
  >
    <slot />
  </a>
</template>

<style scoped>

.primary-button{

display:inline-flex;
align-items:center;
justify-content:center;

padding:16px 34px;

background:var(--primary);

color:#050505;

font-weight:600;

border-radius:16px;

transition:var(--transition);

box-shadow:var(--shadow-sm);

}

.primary-button:hover{

background:var(--primary-hover);

transform:translateY(-3px);

box-shadow:var(--shadow-md);

}

</style>