<script setup lang="ts">

defineProps<{

title:string

subtitle?:string

}>()

</script>

<template>

<div class="section-title">

<p v-if="subtitle">

{{subtitle}}

</p>

<h2>

{{title}}

</h2>

</div>

</template>

<style scoped>

.section-title{

margin-bottom:70px;

text-align:center;

}

.section-title p{

letter-spacing:4px;

text-transform:uppercase;

color:var(--primary);

margin-bottom:12px;

font-size:.85rem;

}

.section-title h2{

font-size:3.5rem;

line-height:1.1;

}

@media(max-width:768px){

.section-title h2{

font-size:2.5rem;

}

}

</style>