<script setup lang="ts">

defineProps<{

title:string

subtitle?:string

}>()

</script>

<template>

<div class="wrapper">

<p
v-if="subtitle"
class="subtitle">

{{ subtitle }}

</p>

<h2>

{{ title }}

</h2>

</div>

</template>

<style scoped>

.wrapper{

display:flex;

flex-direction:column;

gap:.75rem;

margin-bottom:3rem;

}

.subtitle{

color:var(--primary);

font-weight:600;

letter-spacing:.15em;

text-transform:uppercase;

font-size:.85rem;

}

h2{

font-family:var(--font-title);

font-size:clamp(2.3rem,4vw,4rem);

font-weight:700;

line-height:1.1;

}

</style>