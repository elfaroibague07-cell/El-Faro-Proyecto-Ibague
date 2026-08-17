<script setup lang="ts">
import type { Product } from '../../types/product'

const props = defineProps<{
  product: Product
}>()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price)

const phone = '573104567890'

const whatsappLink = () => {

  const url =
    `${window.location.origin}/producto/${props.product.slug}`

  const message = encodeURIComponent(

`Hola.

Estoy interesado en este producto.

Producto: ${props.product.name}

Precio: ${formatPrice(props.product.price)}

${url}`

  )

  return `https://wa.me/${phone}?text=${message}`

}
</script>

<template>

<div class="info">

  <span
    v-if="product.featured"
    class="badge"
  >

    ⭐ Producto destacado

  </span>

  <h1>

    {{ product.name }}

  </h1>

  <div class="price">

    {{ formatPrice(product.price) }}

  </div>

  <p class="description">

    {{ product.description }}

  </p>

  <div
    class="details"
  >

    <div>

      <strong>Material</strong>

      <span>

        {{ product.material }}

      </span>

    </div>

    <div>

      <strong>Tamaño</strong>

      <span>

        {{ product.size }}

      </span>

    </div>

  </div>

  <div
    v-if="product.long_description"
    class="long-description"
  >

    <h3>

      Descripción

    </h3>

    <p>

      {{ product.long_description }}

    </p>

  </div>

  <div class="actions">

    <a

      :href="whatsappLink()"

      target="_blank"

      rel="noopener"

      class="button"

    >

      Solicitar información

    </a>

  </div>

</div>

</template>

<style scoped>

.info{

display:flex;

flex-direction:column;

gap:24px;

}

.badge{

display:inline-flex;

width:max-content;

padding:8px 16px;

border-radius:999px;

background:var(--primary);

color:#000;

font-weight:700;

font-size:.8rem;

}

h1{

font-size:2.4rem;

line-height:1.1;

}

.price{

font-size:2rem;

font-weight:700;

color:var(--primary);

}

.description{

color:var(--text-secondary);

line-height:1.8;

}

.details{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:20px;

padding:24px;

border-radius:18px;

background:rgba(255,255,255,.03);

border:1px solid var(--border);

}

.details div{

display:flex;

flex-direction:column;

gap:8px;

}

.details strong{

font-size:.9rem;

}

.details span{

color:var(--text-secondary);

}

.long-description{

display:flex;

flex-direction:column;

gap:14px;

}

.long-description p{

line-height:1.9;

color:var(--text-secondary);

white-space:pre-line;

}

.actions{

margin-top:12px;

}

.button{

display:flex;

justify-content:center;

align-items:center;

height:56px;

border-radius:16px;

background:var(--primary);

color:#000;

font-weight:700;

text-decoration:none;

transition:.3s;

}

.button:hover{

transform:translateY(-2px);

}

@media(max-width:900px){

.details{

grid-template-columns:1fr;

}

h1{

font-size:2rem;

}

}

</style>