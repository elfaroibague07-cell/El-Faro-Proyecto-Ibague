<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '../../types/product'

const props = defineProps<{
  product: Product
}>()

/* =========================================
   CONFIGURACIÓN
========================================= */

const WHATSAPP_PHONE = '573104567890'

const PLACEHOLDER_IMAGE = '/placeholder.webp'


/* =========================================
   PRODUCTO
========================================= */

const product = computed(() => props.product)


/* =========================================
   URL DEL PRODUCTO
========================================= */

const productUrl = computed(() => {
  return `/producto/${product.value.slug}`
})


/* =========================================
   FORMATEAR PRECIO
========================================= */

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price)
}


/* =========================================
   ENLACE WHATSAPP
========================================= */

const whatsappLink = computed(() => {
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : ''

  const absoluteProductUrl =
    `${origin}${productUrl.value}`

  const message = [
    'Hola,',
    '',
    'Estoy interesado en este producto.',
    '',
    `Producto: ${product.value.name}`,
    `Precio: ${formatPrice(Number(product.value.price))}`,
    `Link: ${absoluteProductUrl}`,
    '',
    '¿Podrían brindarme más información?'
  ].join('\n')

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
})


/* =========================================
   PRECIO FORMATEADO
========================================= */

const formattedPrice = computed(() => {
  return formatPrice(
    Number(product.value.price)
  )
})


/* =========================================
   ALT DE IMAGEN
========================================= */

const imageAlt = computed(() => {
  return product.value.name
    ? `Imagen de ${product.value.name}`
    : 'Producto de El Faro'
})
</script>


<template>

  <article class="card">

    <!-- =====================================
         IMAGEN
    ====================================== -->

    <div class="image-container">

      <RouterLink
        :to="productUrl"
        class="image-link"
        :aria-label="`Ver detalles de ${product.name}`"
      >

        <img
          :src="
            product.image_url ||
            PLACEHOLDER_IMAGE
          "
          :alt="imageAlt"
          loading="lazy"
          decoding="async"
        >

      </RouterLink>


      <!-- ===================================
           DESTACADO
      ==================================== -->

      <span
        v-if="product.featured"
        class="badge"
      >
        Destacado
      </span>

    </div>


    <!-- =====================================
         CONTENIDO
    ====================================== -->

    <div class="content">

      <!-- ===================================
           TÍTULO
      ==================================== -->

      <h3>

        <RouterLink
          :to="productUrl"
          class="product-link"
        >

          {{ product.name }}

        </RouterLink>

      </h3>


      <!-- ===================================
           DESCRIPCIÓN
      ==================================== -->

      <p
        v-if="product.description"
        class="description"
      >

        {{ product.description }}

      </p>


      <!-- ===================================
           DETALLES
      ==================================== -->

      <div
        v-if="
          product.material ||
          product.size
        "
        class="details"
      >

        <span
          v-if="product.material"
          class="detail"
        >

          <strong>Material:</strong>

          {{ product.material }}

        </span>


        <span
          v-if="product.size"
          class="detail"
        >

          <strong>Tamaño:</strong>

          {{ product.size }}

        </span>

      </div>


      <!-- ===================================
           PRECIO
      ==================================== -->

      <div class="price">

        {{ formattedPrice }}

      </div>


      <!-- ===================================
           ACCIONES
      ==================================== -->

      <div class="actions">

        <RouterLink
          :to="productUrl"
          class="secondary-button"
        >

          Ver detalles

        </RouterLink>


        <a
          :href="whatsappLink"
          class="primary-button"
          target="_blank"
          rel="noopener noreferrer"
        >

          Solicitar información

        </a>

      </div>

    </div>

  </article>

</template>


<style scoped>

/* =========================================
   CARD
========================================= */

.card {

  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background:
    var(--surface);

  border:
    1px solid
    var(--border);

  border-radius:
    24px;

  transition:
    transform .35s ease,
    box-shadow .35s ease,
    border-color .35s ease;

}


/* =========================================
   HOVER CARD
========================================= */

@media (hover: hover) {

  .card:hover {

    transform:
      translateY(-6px);

    box-shadow:
      0 20px 45px
      rgba(0, 0, 0, .25);

    border-color:
      rgba(255, 255, 255, .14);

  }

}


/* =========================================
   IMAGEN
========================================= */

.image-container {

  position:
    relative;

  width:
    100%;

  aspect-ratio:
    1 / 1;

  overflow:
    hidden;

  background:
    var(--surface-light);

  flex-shrink:
    0;

}


/* =========================================
   LINK IMAGEN
========================================= */

.image-link {

  display:
    block;

  width:
    100%;

  height:
    100%;

}


/* =========================================
   IMAGEN
========================================= */

.image-container img {

  display:
    block;

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;

  transition:
    transform .45s ease;

}


/* =========================================
   HOVER IMAGEN
========================================= */

@media (hover: hover) {

  .card:hover
  .image-container img {

    transform:
      scale(1.045);

  }

}


/* =========================================
   BADGE
========================================= */

.badge {

  position:
    absolute;

  top:
    18px;

  left:
    18px;

  z-index:
    2;

  padding:
    8px 14px;

  border:
    1px solid
    rgba(0, 0, 0, .08);

  border-radius:
    999px;

  background:
    var(--primary);

  color:
    #050505;

  font-family:
    var(--font-body);

  font-size:
    .72rem;

  font-weight:
    700;

  letter-spacing:
    .02em;

}


/* =========================================
   CONTENIDO
========================================= */

.content {

  min-width:
    0;

  flex:
    1;

  display:
    flex;

  flex-direction:
    column;

  gap:
    14px;

  padding:
    24px;

}


/* =========================================
   TÍTULO
========================================= */

h3 {

  margin:
    0;

  font-family:
    var(--font-title);

  font-size:
    1.55rem;

  font-weight:
    600;

  line-height:
    1.2;

}


/* =========================================
   LINK PRODUCTO
========================================= */

.product-link {

  color:
    var(--text);

  text-decoration:
    none;

  transition:
    color .25s ease;

}


.product-link:hover {

  color:
    var(--primary);

}


/* =========================================
   DESCRIPCIÓN
========================================= */

.description {

  margin:
    0;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size:
    .9rem;

  line-height:
    1.65;

  display:
    -webkit-box;

  -webkit-box-orient:
    vertical;

  -webkit-line-clamp:
    3;

  overflow:
    hidden;

}


/* =========================================
   DETALLES
========================================= */

.details {

  display:
    flex;

  flex-direction:
    column;

  gap:
    6px;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size:
    .82rem;

  line-height:
    1.4;

}


.detail {

  display:
    block;

}


.details strong {

  color:
    var(--text);

  font-weight:
    600;

}


/* =========================================
   PRECIO
========================================= */

.price {

  margin-top:
    auto;

  padding-top:
    8px;

  color:
    var(--primary);

  font-family:
    var(--font-body);

  font-size:
    1.4rem;

  font-weight:
    700;

  line-height:
    1.2;

}


/* =========================================
   ACCIONES
========================================= */

.actions {

  display:
    grid;

  grid-template-columns:
    1fr;

  gap:
    10px;

  margin-top:
    6px;

}


/* =========================================
   BOTONES
========================================= */

.primary-button,
.secondary-button {

  width:
    100%;

  min-width:
    0;

  height:
    48px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  box-sizing:
    border-box;

  padding:
    0 16px;

  border-radius:
    14px;

  font-family:
    var(--font-body);

  font-size:
    .84rem;

  font-weight:
    600;

  line-height:
    1;

  text-decoration:
    none;

  transition:
    transform .25s ease,
    background .25s ease,
    border-color .25s ease,
    color .25s ease,
    box-shadow .25s ease;

}


/* =========================================
   PRIMARIO
========================================= */

.primary-button {

  background:
    var(--primary);

  color:
    #050505;

  border:
    1px solid
    var(--primary);

}


.primary-button:hover {

  transform:
    translateY(-2px);

  background:
    var(--primary-hover);

  border-color:
    var(--primary-hover);

  box-shadow:
    0 8px 22px
    rgba(212, 177, 106, .14);

}


/* =========================================
   SECUNDARIO
========================================= */

.secondary-button {

  background:
    transparent;

  color:
    var(--text);

  border:
    1px solid
    var(--border);

}


.secondary-button:hover {

  transform:
    translateY(-2px);

  background:
    rgba(255, 255, 255, .05);

  border-color:
    rgba(255, 255, 255, .18);

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .content {

    padding:
      22px;

  }

}


/* =========================================
   MÓVIL
========================================= */

@media (max-width: 700px) {

  .card {

    border-radius:
      20px;

  }


  .content {

    padding:
      20px;

    gap:
      13px;

  }


  h3 {

    font-size:
      1.4rem;

  }


  .price {

    font-size:
      1.3rem;

  }

}


/* =========================================
   MÓVIL PEQUEÑO
========================================= */

@media (max-width: 420px) {

  .content {

    padding:
      18px;

  }


  .badge {

    top:
      14px;

    left:
      14px;

    padding:
      7px 11px;

  }


  .primary-button,
  .secondary-button {

    height:
      46px;

  }

}

</style>