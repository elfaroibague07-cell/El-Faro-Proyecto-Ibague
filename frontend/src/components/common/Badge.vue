<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: ''
  }
)
</script>

<template>

<div class="badge">

  <span>

    {{ props.text }}

  </span>

</div>

</template>

<style scoped>

.badge{

display:inline-flex;

align-items:center;

justify-content:center;

padding:12px 22px;

min-height:46px;

border-radius:999px;

background:rgba(255,255,255,.04);

border:1px solid rgba(255,255,255,.12);

backdrop-filter:blur(18px);

-webkit-backdrop-filter:blur(18px);

box-shadow:

0 10px 25px rgba(0,0,0,.18),

inset 0 0 0 1px rgba(255,255,255,.03);

transition:.35s ease;

}

.badge:hover{

border-color:rgba(255,255,255,.22);

transform:translateY(-2px);

}

.badge span{

font-size:.82rem;

font-weight:700;

letter-spacing:3px;

text-transform:uppercase;

color:var(--primary);

white-space:nowrap;

line-height:1;

}

@media(max-width:768px){

.badge{

padding:10px 18px;

min-height:40px;

}

.badge span{

font-size:.72rem;

letter-spacing:2px;

}

}

</style>