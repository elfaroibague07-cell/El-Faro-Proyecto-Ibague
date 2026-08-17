<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import Navbar from '../components/layout/Navbar.vue'
import FadeSection from '../components/ui/FadeSection.vue'

import { useProductStore } from '../stores/product.store'

const route = useRoute()

const store = useProductStore()

onMounted(async () => {

  await store.getProductBySlug(
    route.params.slug as string
  )

})

const product = computed(() => store.selectedProduct)

watch(product,(value)=>{

  if(!value) return

  document.title = `${value.name} | El Faro`

})

const whatsappLink = computed(() => {

  if (!product.value) return '#'

  const message = `Hola.

Estoy interesado en:

${product.value.name}

${window.location.href}`

  return `https://wa.me/573103456789?text=${encodeURIComponent(message)}`

})
</script>

<template>

<Navbar />

<FadeSection>

<section class="product-page">

<div class="container">

<div
v-if="store.loading"
class="loading"
>

<h2>

Cargando producto...

</h2>

</div>

<div
v-else-if="!product"
class="not-found"
>

<h2>

Producto no encontrado

</h2>

<RouterLink
to="/"
class="button"
>

Volver al catálogo

</RouterLink>

</div>

<template v-else>

<div class="back">

<RouterLink to="/">

← Volver al catálogo

</RouterLink>

</div>

<div class="product-layout">

<div class="image-column">

<img
:src="product.image_url"
:alt="product.name"
class="image"
loading="eager"
/>

</div>

<div class="info-column">

<h1>

{{ product.name }}

</h1>

<div class="price">

{{ product.price.toLocaleString('es-CO',{
style:'currency',
currency:'COP',
maximumFractionDigits:0
}) }}

</div>

<div class="specs">

<div class="spec">

<strong>

Material

</strong>

<span>

{{ product.material || 'Cristal óptico premium' }}

</span>

</div>

<div class="spec">

<strong>

Tamaño

</strong>

<span>

{{ product.size || '80 mm' }}

</span>

</div>

</div>

<p class="description">

{{ product.description }}

</p>

<a
:href="whatsappLink"
target="_blank"
class="button"
>

Solicitar por WhatsApp

</a>

</div>

</div>

<div
v-if="product.long_description"
class="details"
>

<h2>

Descripción detallada

</h2>

<p>

{{ product.long_description }}

</p>

</div>

</template>

</div>

</section>

</FadeSection>

</template>

<style scoped>

.product-page{

padding:120px 0 80px;

min-height:100vh;

}

.container{

width:min(1200px,92%);

margin:auto;

}

.loading{

text-align:center;

padding:100px 0;

}

.not-found{

display:flex;

flex-direction:column;

align-items:center;

gap:30px;

padding:120px 0;

}

.back{

margin-bottom:40px;

}

.back a{

text-decoration:none;

font-weight:600;

color:var(--text-secondary);

transition:.3s;

}

.back a:hover{

color:var(--primary);

}

.product-layout{

display:grid;

grid-template-columns:1fr 1fr;

gap:70px;

align-items:center;

margin-bottom:70px;

}

.image{

width:100%;

aspect-ratio:1;

object-fit:cover;

border-radius:22px;

border:1px solid var(--border);

box-shadow:0 25px 60px rgba(0,0,0,.12);

transition:.35s;

}

.image:hover{

transform:scale(1.02);

}


h1{

font-size:3rem;

line-height:1.1;

margin-bottom:18px;

}

.price{

font-size:2.3rem;

font-weight:700;

color:var(--primary);

margin:28px 0;

}

.specs{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:18px;

margin:35px 0;

}

.spec{

padding:20px;

border-radius:16px;

border:1px solid var(--border);

background:rgba(255,255,255,.03);

display:flex;

flex-direction:column;

gap:8px;

}

.description{

line-height:1.9;

margin-bottom:35px;

color:var(--text-secondary);

}

.button{

display:inline-flex;

justify-content:center;

align-items:center;

padding:16px 28px;

border-radius:14px;

background:var(--primary);

color:white;

text-decoration:none;

font-weight:600;

transition:.3s;

}

.button:hover{

transform:translateY(-3px);

}

.details{

margin-top:70px;

padding-top:60px;

border-top:1px solid var(--border);

}

.details h2{

margin-bottom:25px;

}

.details p{

white-space:pre-line;

line-height:2;

color:var(--text-secondary);

}

@media(max-width:900px){

.product-layout{

grid-template-columns:1fr;

gap:45px;

}

.specs{

grid-template-columns:1fr;

}

h1{

font-size:2.2rem;

}

}

</style>