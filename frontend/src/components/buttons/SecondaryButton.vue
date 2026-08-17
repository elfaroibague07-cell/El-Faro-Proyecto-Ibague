<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>

<a
:href="href"
class="secondary-button"
>

<slot/>

</a>

</template>

<style scoped>

.secondary-button{

display:inline-flex;

align-items:center;

justify-content:center;

padding:16px 34px;

border:1px solid var(--border);

background:transparent;

color:var(--white);

border-radius:16px;

transition:var(--transition);

}

.secondary-button:hover{

background:var(--surface);

border-color:var(--primary);

color:var(--primary);

}

</style>