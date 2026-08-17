<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useProductStore } from '../stores/product.store'

import ProductGallery from '../components/admin/products/ProductGallery.vue'
import ProductInfo from '../components/admin/products/ProductInfo.vue'
import ProductBreadcrumb from '../components/admin/products/ProductBreadcrumb.vue'

const route = useRoute()
const store = useProductStore()

/*
|--------------------------------------------------------------------------
| ESTADO LOCAL
|--------------------------------------------------------------------------
*/

const loadingProduct = ref(true)
const requestId = ref(0)

/*
|--------------------------------------------------------------------------
| CARGAR PRODUCTO
|--------------------------------------------------------------------------
*/

async function loadProduct() {

  const currentRequest = ++requestId.value

  loadingProduct.value = true

  const slug = route.params.slug as string

  if (!slug) {

    loadingProduct.value = false

    return

  }

  try {

    await store.getProductBySlug(slug)

  } catch (error) {

    console.error(
      'Error cargando producto:',
      error
    )

  } finally {

    /*
    |--------------------------------------------------------------------------
    | Evitamos que una petición anterior pueda modificar
    | el estado de una petición más reciente.
    |--------------------------------------------------------------------------
    */

    if (currentRequest === requestId.value) {

      loadingProduct.value = false

    }

  }

}

/*
|--------------------------------------------------------------------------
| INICIALIZACIÓN
|--------------------------------------------------------------------------
*/

onMounted(() => {

  loadProduct()

})

/*
|--------------------------------------------------------------------------
| CAMBIO DE PRODUCTO
|--------------------------------------------------------------------------
*/

watch(

  () => route.params.slug,

  () => {

    loadProduct()

  }

)

/*
|--------------------------------------------------------------------------
| LIMPIEZA
|--------------------------------------------------------------------------
*/

onUnmounted(() => {

  requestId.value++

})

</script>


<template>

<section class="product-page">

  <div class="container">

    <!-- ================================================= -->
    <!-- CARGANDO -->
    <!-- ================================================= -->

    <div
      v-if="loadingProduct || store.loading"
      class="loading"
    >

      <div class="loading-content">

        <div class="loading-spinner"></div>

        <span>
          Cargando producto...
        </span>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- PRODUCTO NO ENCONTRADO -->
    <!-- ================================================= -->

    <div
      v-else-if="!store.selectedProduct"
      class="empty"
    >

      <div class="empty-content">

        <span class="empty-icon">
          ✦
        </span>

        <h1>
          Producto no encontrado
        </h1>

        <p>
          El producto que buscas no está disponible
          o ya no existe en nuestro catálogo.
        </p>

        <a
          href="/#catalog"
          class="back-button"
        >
          Volver al catálogo
        </a>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- PRODUCTO -->
    <!-- ================================================= -->

    <div
      v-else
      class="product-content"
    >

      <!-- Breadcrumb -->

      <ProductBreadcrumb
        :title="store.selectedProduct.name"
      />


      <!-- Contenido -->

      <div class="layout">

        <!-- Galería -->

        <ProductGallery
          :product="store.selectedProduct"
        />


        <!-- Información -->

        <ProductInfo
          :product="store.selectedProduct"
        />

      </div>

    </div>

  </div>

</section>

</template>


<style scoped>

/* ======================================================
   PÁGINA
====================================================== */

.product-page{

position:relative;

min-height:100vh;

padding:

140px
0
100px;

overflow:hidden;

background:

linear-gradient(

180deg,

#050505 0%,

#0b0b0b 50%,

#101010 100%

);

}


/* ======================================================
   LUZ DE FONDO
====================================================== */

.product-page::before{

content:"";

position:absolute;

top:0;

left:50%;

width:900px;

height:700px;

transform:translateX(-50%);

background:

radial-gradient(

circle,

rgba(255,255,255,.045),

transparent 70%

);

filter:blur(100px);

pointer-events:none;

}


/* ======================================================
   CONTENEDOR
====================================================== */

.container{

position:relative;

z-index:2;

width:min(

1280px,

92%

);

margin:auto;

}


/* ======================================================
   CONTENIDO
====================================================== */

.product-content{

animation:

productReveal
.6s
ease
both;

}


/* ======================================================
   LAYOUT
====================================================== */

.layout{

display:grid;

grid-template-columns:

minmax(0,1fr)
minmax(0,1fr);

gap:64px;

align-items:start;

margin-top:32px;

}


/* ======================================================
   LOADING
====================================================== */

.loading{

min-height:500px;

display:flex;

align-items:center;

justify-content:center;

}

.loading-content{

display:flex;

flex-direction:column;

align-items:center;

justify-content:center;

gap:20px;

color:var(--gray);

font-size:1rem;

}


/* ======================================================
   SPINNER
====================================================== */

.loading-spinner{

width:42px;

height:42px;

border-radius:50%;

border:

2px solid
rgba(255,255,255,.08);

border-top-color:

rgba(255,255,255,.8);

animation:

spinner
.8s
linear
infinite;

}


/* ======================================================
   EMPTY
====================================================== */

.empty{

min-height:500px;

display:flex;

align-items:center;

justify-content:center;

text-align:center;

}

.empty-content{

width:min(

520px,

100%

);

padding:50px 40px;

border:

1px solid
rgba(255,255,255,.08);

border-radius:

var(--radius-lg);

background:

rgba(255,255,255,.025);

backdrop-filter:

blur(20px);

box-shadow:

0 30px 80px
rgba(0,0,0,.35);

}


/* ======================================================
   EMPTY ICON
====================================================== */

.empty-icon{

display:flex;

align-items:center;

justify-content:center;

width:60px;

height:60px;

margin:

0
auto
24px;

border-radius:50%;

border:

1px solid
rgba(255,255,255,.12);

background:

rgba(255,255,255,.04);

color:white;

font-size:1.4rem;

}


/* ======================================================
   EMPTY TITLE
====================================================== */

.empty h1{

margin:0 0 16px;

font-family:

var(--font-title);

font-size:

clamp(
2rem,
4vw,
3rem
);

font-weight:600;

color:white;

}


/* ======================================================
   EMPTY TEXT
====================================================== */

.empty p{

margin:

0
auto
28px;

max-width:420px;

font-size:.98rem;

line-height:1.7;

color:var(--gray);

}


/* ======================================================
   BACK BUTTON
====================================================== */

.back-button{

display:inline-flex;

align-items:center;

justify-content:center;

min-height:48px;

padding:

0
24px;

border-radius:

14px;

background:white;

color:#050505;

font-weight:600;

transition:

transform
.3s
ease,

box-shadow
.3s
ease,

background
.3s
ease;

}

.back-button:hover{

transform:

translateY(-2px);

background:#f0f0f0;

box-shadow:

0
15px
35px
rgba(255,255,255,.12);

}


/* ======================================================
   ANIMACIONES
====================================================== */

@keyframes spinner{

to{

transform:rotate(360deg);

}

}


@keyframes productReveal{

from{

opacity:0;

transform:

translateY(14px);

}

to{

opacity:1;

transform:

translateY(0);

}

}


/* ======================================================
   RESPONSIVE
====================================================== */

@media(max-width:900px){

.product-page{

padding:

120px
0
70px;

}

.layout{

grid-template-columns:1fr;

gap:40px;

}

.loading,
.empty{

min-height:400px;

}

.empty-content{

padding:

40px
24px;

}

}


@media(max-width:600px){

.container{

width:90%;

}

.product-page{

padding-top:110px;

}

.layout{

gap:30px;

}

}

</style>