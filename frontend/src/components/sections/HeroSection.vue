<script setup lang="ts">

import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

import PrimaryButton from '../buttons/PrimaryButton.vue'

import { useProductStore } from '@/stores/product.store'


const store = useProductStore()


/*======================================
PRODUCTOS
======================================*/

/*======================================
PRODUCTOS
======================================*/

const heroProducts = computed(() => {
  // Primero intentamos usar los destacados, si no hay, usamos la lista general de productos
  const sourceList = store.featuredProducts.length > 0 
    ? store.featuredProducts 
    : store.products

  return sourceList
    .filter(product => product.image_url)
    .slice(0, 4)
})


/*======================================
PARTÍCULAS
======================================*/

const particles = ref(

  Array.from(
    { length: 10 },
    () => ({

      left: `${Math.random() * 100}%`,

      top: `${Math.random() * 100}%`,

      delay: `${Math.random() * 6}s`,

      duration:
        `${6 + Math.random() * 5}s`

    })
  )

)


/*======================================
DOBLE BUFFER
======================================*/

const imageA = ref('')

const imageB = ref('')

const activeLayer =
  ref<'A' | 'B'>('A')

const currentIndex = ref(0)

let interval: number | undefined


/*======================================
PRECARGAR IMAGEN
======================================*/

function preload(
  src: string
) {

  return new Promise<void>(
    (resolve) => {

      const img = new Image()

      img.onload = () => resolve()

      img.src = src

    }
  )

}


/*======================================
CAMBIO DE IMAGEN
======================================*/

async function nextImage() {

  if (
    heroProducts.value.length <= 1
  ) {

    return

  }


  const next =

    (
      currentIndex.value + 1
    ) %
    heroProducts.value.length


  const nextSrc =

    heroProducts.value[next]
      .image_url


  await preload(nextSrc)


  if (
    activeLayer.value === 'A'
  ) {

    imageB.value = nextSrc


    requestAnimationFrame(() => {

      activeLayer.value = 'B'

    })

  }

  else {

    imageA.value = nextSrc


    requestAnimationFrame(() => {

      activeLayer.value = 'A'

    })

  }


  currentIndex.value = next

}


/*======================================
SLIDER
======================================*/

function startSlider() {

  if (interval) {

    clearInterval(interval)

  }


  if (
    heroProducts.value.length <= 1
  ) {

    return

  }


  interval = window.setInterval(
    () => {

      nextImage()

    },
    6000
  )

}


/*======================================
INICIALIZAR HERO
======================================*/

async function initializeHero() {

  if (!store.products.length) {

    await store.loadProducts()

  }


  if (
    !heroProducts.value.length
  ) {

    return

  }


  imageA.value =
    heroProducts.value[0]
      .image_url


  if (
    heroProducts.value.length > 1
  ) {

    imageB.value =
      heroProducts.value[1]
        .image_url

  }


  currentIndex.value = 0

  activeLayer.value = 'A'

  startSlider()

}


/*======================================
MOUNT
======================================*/

onMounted(() => {

  initializeHero()

})


/*======================================
ACTUALIZAR SI CAMBIAN PRODUCTOS
======================================*/

watch(
  heroProducts,
  () => {

    initializeHero()

  }
)


/*======================================
UNMOUNT
======================================*/

onUnmounted(() => {

  if (interval) {

    clearInterval(interval)

  }

})

</script>


<template>

<section
  id="hero"
  class="hero"
>


  <!--==================================
  FONDO
  ==================================-->

  <div class="hero-background">

    <div class="gradient"></div>

    <div class="glow"></div>

    <div class="grid"></div>

  </div>


  <!--==================================
  CONTENEDOR
  ==================================-->

  <div class="hero-container">

    <div class="hero-content">


      <!--================================
      TEXTO
      =================================-->

      <div class="hero-text">


        <span class="hero-badge">

          ✦ Cristal grabado con precisión

        </span>


        <h1>

          Convierte tus recuerdos

          <span>

            en obras eternas.

          </span>

        </h1>


        <p>

          En <strong>El Faro</strong>

          transformamos tus fotografías
          en piezas únicas de cristal
          grabado con láser.

          Un regalo elegante que conserva
          los momentos más importantes
          para siempre.

        </p>


        <div class="buttons">

          <a href="/#catalog">

            <PrimaryButton>

              Explorar catálogo

            </PrimaryButton>

          </a>

        </div>


      </div>


      <!--================================
      IMAGEN DESTACADA
      =================================-->

      <div class="hero-image">


        <!-- HALO -->

        <div class="image-halo"></div>


        <!-- MARCO EXTERIOR -->

        <div class="image-border"></div>


        <!-- FRAME -->

        <div class="image-frame">


          <!-- CAPA A -->

          <img
            v-if="imageA"
            :src="imageA"
            alt="Producto destacado"
            class="hero-product-image"
            :class="{
              active:
                activeLayer === 'A',

              inactive:
                activeLayer !== 'A'
            }"
          />


          <!-- CAPA B -->

          <img
            v-if="imageB"
            :src="imageB"
            alt="Producto destacado"
            class="hero-product-image"
            :class="{
              active:
                activeLayer === 'B',

              inactive:
                activeLayer !== 'B'
            }"
          />


          <!-- CRISTAL -->

          <div class="image-highlight"></div>

          <div class="image-reflection"></div>


        </div>


        <!--================================
        PARTÍCULAS
        =================================-->

        <div class="hero-particles">

          <span
            v-for="
              (particle, index)
              in particles
            "
            :key="index"
            class="dot"
            :style="{

              left:
                particle.left,

              top:
                particle.top,

              animationDelay:
                particle.delay,

              animationDuration:
                particle.duration

            }"
          />

        </div>


      </div>


    </div>

  </div>

</section>

</template>


<style scoped>


/*======================================
BASE
======================================*/

.hero {

  position: relative;

  min-height: 100vh;

  display: flex;

  align-items: center;

  overflow: hidden;

}


/*======================================
CONTENEDOR
======================================*/

.hero-container {

  position: relative;

  z-index: 5;

  width:
    min(1280px, 92%);

  margin:
    auto;

  padding:
    110px 0 90px;

}


/*======================================
FONDO
======================================*/

.hero-background {

  position: absolute;

  inset: 0;

  overflow: hidden;

}


.gradient {

  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      ellipse at 70% 45%,
      rgba(255,255,255,.045),
      transparent 55%
    );

}


.glow {

  position: absolute;

  left: 70%;

  top: 45%;

  transform:
    translate(-50%, -50%);

  width:
    650px;

  height:
    500px;

  border-radius:
    40%;

  background:
    radial-gradient(
      ellipse,
      rgba(255,255,255,.055),
      transparent 70%
    );

  filter:
    blur(90px);

  animation:
    backgroundGlow
    12s
    ease-in-out
    infinite;

}


.grid {

  position: absolute;

  inset: 0;

  opacity: .025;

  background-image:

    linear-gradient(
      rgba(255,255,255,.08)
      1px,
      transparent 1px
    ),

    linear-gradient(
      90deg,
      rgba(255,255,255,.08)
      1px,
      transparent 1px
    );

  background-size:
    70px 70px;

}


/*======================================
LAYOUT
======================================*/

.hero-content {

  display: grid;

  grid-template-columns:
    1.1fr .9fr;

  align-items: center;

  gap:
    5rem;

}


/*======================================
TEXTO
======================================*/

.hero-text {

  display: flex;

  flex-direction: column;

  gap:
    1.6rem;

}


.hero-badge {

  display:
    inline-flex;

  padding:
    .6rem 1rem;

  border-radius:
    999px;

  border:
    1px solid
    rgba(255,255,255,.08);

  background:
    rgba(255,255,255,.03);

  backdrop-filter:
    blur(10px);

  width:
    max-content;

}


h1 {

  margin: 0;

  font-family:
    var(--font-title);

  font-size:
    clamp(
      3rem,
      6vw,
      5.5rem
    );

  line-height:
    1;

}


h1 span {

  display:
    block;

  margin-top:
    .3rem;

  color:
    white;

}


p {

  margin: 0;

  max-width:
    620px;

  font-size:
    1.08rem;

  line-height:
    1.8;

  color:
    var(--text-secondary);

}


p strong {

  color:
    var(--text);

}


/*======================================
IMAGEN
======================================*/

.hero-image {

  position: relative;

  display: flex;

  justify-content: center;

  align-items: center;

  min-height:
    640px;

}


/*======================================
HALO RECTANGULAR
======================================*/

.image-halo {

  position: absolute;

  width:
    470px;

  height:
    500px;

  border-radius:
    32px;

  background:
    radial-gradient(
      ellipse,
      rgba(255,255,255,.09),
      transparent 72%
    );

  filter:
    blur(55px);

  animation:
    haloPulse
    10s
    ease-in-out
    infinite;

}


/*======================================
MARCO EXTERIOR
======================================*/

.image-border {

  position: absolute;

  width:
    430px;

  height:
    520px;

  border-radius:
    26px;

  border:
    1px solid
    rgba(255,255,255,.14);

  box-shadow:

    0 0 30px
    rgba(255,255,255,.04),

    inset 0 0 25px
    rgba(255,255,255,.03);

}


/*======================================
FRAME PRINCIPAL
======================================*/

.image-frame {

  position: relative;

  width:
    390px;

  height:
    480px;

  overflow: hidden;

  border-radius:
    22px;

  background:
    #090909;

  border:
    1px solid
    rgba(255,255,255,.10);

  box-shadow:

    0 25px 60px
    rgba(0,0,0,.50),

    0 0 0 1px
    rgba(255,255,255,.025);

  animation:
    imageFloat
    8s
    ease-in-out
    infinite;

}


/*======================================
IMÁGENES
======================================*/

.hero-product-image {

  position: absolute;

  inset: 0;

  width:
    100%;

  height:
    100%;

  object-fit:
    cover;

  object-position:
    center;

  opacity:
    0;

  transform:
    scale(1);

  transition:
    opacity
    1.4s
    ease-in-out;

  will-change:
    opacity,
    transform;

}


.hero-product-image.active {

  opacity:
    1;

  z-index:
    2;

  animation:
    kenBurns
    6s
    linear
    forwards;

}


.hero-product-image.inactive {

  opacity:
    0;

  z-index:
    1;

}


/*======================================
CRISTAL / HIGHLIGHT
======================================*/

.image-highlight {

  position: absolute;

  top:
    -10%;

  left:
    -15%;

  width:
    70%;

  height:
    42%;

  border-radius:
    50%;

  background:
    radial-gradient(
      ellipse,
      rgba(255,255,255,.20),
      transparent 70%
    );

  filter:
    blur(20px);

  pointer-events:
    none;

  z-index:
    3;

}


/*======================================
REFLEJO
======================================*/

.image-reflection {

  position: absolute;

  bottom:
    -15%;

  left:
    50%;

  transform:
    translateX(-50%);

  width:
    85%;

  height:
    32%;

  background:
    radial-gradient(
      ellipse,
      rgba(255,255,255,.07),
      transparent 75%
    );

  filter:
    blur(15px);

  pointer-events:
    none;

  z-index:
    3;

}


/*======================================
OVERLAY DE CRISTAL
======================================*/

.image-frame::after {

  content:
    "";

  position:
    absolute;

  inset:
    0;

  border-radius:
    22px;

  background:

    linear-gradient(
      135deg,
      rgba(255,255,255,.08),
      transparent 25%,
      transparent 65%,
      rgba(255,255,255,.035)
    );

  pointer-events:
    none;

  z-index:
    4;

}


/*======================================
PARTÍCULAS
======================================*/

.hero-particles {

  position:
    absolute;

  inset:
    0;

  pointer-events:
    none;

}


.dot {

  position:
    absolute;

  width:
    3px;

  height:
    3px;

  border-radius:
    50%;

  background:
    rgba(255,255,255,.35);

  animation:
    particleFloat
    linear
    infinite;

}


/*======================================
ANIMACIÓN FONDO
======================================*/

@keyframes backgroundGlow {

  0%,
  100% {

    transform:
      translate(-50%, -50%)
      scale(1);

  }

  50% {

    transform:
      translate(-50%, -50%)
      scale(1.05);

  }

}


/*======================================
ANIMACIÓN HALO
======================================*/

@keyframes haloPulse {

  0%,
  100% {

    transform:
      scale(1);

    opacity:
      .7;

  }

  50% {

    transform:
      scale(1.06);

    opacity:
      1;

  }

}


/*======================================
ANIMACIÓN FRAME
======================================*/

@keyframes imageFloat {

  0%,
  100% {

    transform:
      translateY(0);

  }

  50% {

    transform:
      translateY(-10px);

  }

}


/*======================================
KEN BURNS
======================================*/

@keyframes kenBurns {

  from {

    transform:
      scale(1);

  }

  to {

    transform:
      scale(1.08);

  }

}


/*======================================
PARTÍCULAS
======================================*/

@keyframes particleFloat {

  0% {

    opacity:
      0;

    transform:
      translateY(20px);

  }

  15% {

    opacity:
      .7;

  }

  85% {

    opacity:
      .5;

  }

  100% {

    opacity:
      0;

    transform:
      translateY(-40px);

  }

}


/*======================================
TABLET
======================================*/

@media (max-width: 980px) {

  .hero-content {

    grid-template-columns:
      1fr;

    text-align:
      center;

    gap:
      3rem;

  }


  .hero-text {

    align-items:
      center;

  }


  .hero-image {

    min-height:
      560px;

  }


  .image-border {

    width:
      350px;

    height:
      430px;

  }


  .image-frame {

    width:
      320px;

    height:
      400px;

  }


  .image-halo {

    width:
      390px;

    height:
      450px;

  }

}


/*======================================
MÓVIL
======================================*/

@media (max-width: 600px) {

  .hero {

    min-height:
      auto;

  }


  .hero-container {

    width:
      min(92%, 500px);

    padding:
      130px 0 70px;

  }


  .hero-content {

    gap:
      1.5rem;

  }


  .hero-text {

    gap:
      1.3rem;

  }


  h1 {

    font-size:
      clamp(
        2.8rem,
        13vw,
        4rem
      );

  }


  p {

    font-size:
      .98rem;

    line-height:
      1.7;

  }


  .hero-image {

    min-height:
      460px;

  }


  .image-border {

    width:
      min(82vw, 340px);

    height:
      min(105vw, 420px);

    border-radius:
      22px;

  }


  .image-frame {

    width:
      min(76vw, 310px);

    height:
      min(96vw, 390px);

    border-radius:
      18px;

  }


  .image-frame::after {

    border-radius:
      18px;

  }


  .image-halo {

    width:
      min(88vw, 370px);

    height:
      min(110vw, 440px);

  }

}


/*======================================
MÓVIL PEQUEÑO
======================================*/

@media (max-width: 420px) {

  .hero-container {

    padding-top:
      115px;

  }


  .hero-badge {

    font-size:
      .78rem;

  }


  .hero-image {

    min-height:
      410px;

  }


  .image-border {

    width:
      84vw;

    height:
      100vw;

  }


  .image-frame {

    width:
      78vw;

    height:
      92vw;

  }

}

</style>