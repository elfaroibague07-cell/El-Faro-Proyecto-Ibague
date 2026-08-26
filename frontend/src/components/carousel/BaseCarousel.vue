<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import BaseCarouselCard from './BaseCarouselCard.vue'
import BaseCarouselControls from './BaseCarouselControls.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
const trackIndex = ref(0)
const isAnimating = ref(false)

const visibleCount = ref(5)

const centerOffset = computed(() => {
  return Math.floor(visibleCount.value / 2)
})

/*
|--------------------------------------------------------------------------
| ITEMS PARA EL CARRUSEL INFINITO
|--------------------------------------------------------------------------
|
| Repetimos las imágenes 3 veces:
|
| [1 2 3 4 5 6] [1 2 3 4 5 6] [1 2 3 4 5 6]
|
| Esto permite desplazarnos hacia adelante y hacia atrás
| sin llegar visualmente a un final.
|
*/

const carouselItems = computed(() => {
  if (!props.items.length) return []

  return [
    ...props.items,
    ...props.items,
    ...props.items
  ]
})

/*
|--------------------------------------------------------------------------
| INICIALIZAR POSICIÓN
|--------------------------------------------------------------------------
*/

function initializeCarousel() {
  if (!props.items.length) return

  trackIndex.value =
    props.items.length + centerOffset.value

  currentIndex.value = 0
}

/*
|--------------------------------------------------------------------------
| RESPONSIVE
|--------------------------------------------------------------------------
*/

function updateVisibleCount() {
  if (window.innerWidth <= 640) {
    visibleCount.value = 1
  } else if (window.innerWidth <= 1024) {
    visibleCount.value = 3
  } else {
    visibleCount.value = 5
  }

  initializeCarousel()
}

/*
|--------------------------------------------------------------------------
| SIGUIENTE
|--------------------------------------------------------------------------
*/

function next() {
  if (
    !props.items.length ||
    isAnimating.value
  ) {
    return
  }

  isAnimating.value = true

  trackIndex.value++

  currentIndex.value =
    (currentIndex.value + 1) %
    props.items.length
}

/*
|--------------------------------------------------------------------------
| ANTERIOR
|--------------------------------------------------------------------------
*/

function previous() {
  if (
    !props.items.length ||
    isAnimating.value
  ) {
    return
  }

  isAnimating.value = true

  trackIndex.value--

  currentIndex.value =
    (currentIndex.value - 1 + props.items.length) %
    props.items.length
}

/*
|--------------------------------------------------------------------------
| INDICADOR
|--------------------------------------------------------------------------
*/

function goTo(index) {
  if (
    index === currentIndex.value ||
    isAnimating.value ||
    !props.items.length
  ) {
    return
  }

  const difference =
    index - currentIndex.value

  trackIndex.value += difference

  currentIndex.value = index

  isAnimating.value = true
}

/*
|--------------------------------------------------------------------------
| FIN DE LA TRANSICIÓN
|--------------------------------------------------------------------------
|
| Cuando llegamos a uno de los extremos de las copias,
| reposicionamos silenciosamente el carrusel en la copia central.
|
*/

function handleTransitionEnd() {
  if (!props.items.length) return

  const total = props.items.length

  /*
   * Nos pasamos hacia adelante.
   */
  if (
    trackIndex.value >=
    total * 2 + centerOffset.value
  ) {
    trackIndex.value =
      total + centerOffset.value

    disableTransitionTemporarily()
  }

  /*
   * Nos pasamos hacia atrás.
   */
  else if (
    trackIndex.value <
    total + centerOffset.value
  ) {
    trackIndex.value =
      total * 2 - 1 + centerOffset.value

    disableTransitionTemporarily()
  } else {
    isAnimating.value = false
  }
}

/*
|--------------------------------------------------------------------------
| REPOSICIONAR SIN ANIMACIÓN
|--------------------------------------------------------------------------
*/

function disableTransitionTemporarily() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isAnimating.value = false
    })
  })
}

/*
|--------------------------------------------------------------------------
| WATCH
|--------------------------------------------------------------------------
*/

watch(
  () => props.items,
  () => {
    initializeCarousel()
  },
  {
    deep: true
  }
)

/*
|--------------------------------------------------------------------------
| LIFECYCLE
|--------------------------------------------------------------------------
*/

onMounted(() => {
  updateVisibleCount()

  window.addEventListener(
    'resize',
    updateVisibleCount
  )
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'resize',
    updateVisibleCount
  )
})
</script>

<template>
  <section
    v-if="items.length"
    class="base-carousel"
  >

    <!-- =====================================================
         ÁREA DEL CARRUSEL
    ====================================================== -->

    <div class="carousel-viewport">

      <div
        class="carousel-track"
        :class="{
          'is-animating': isAnimating
        }"
        :style="{
          '--track-index': trackIndex,
          '--center-offset': centerOffset
        }"
        @transitionend="handleTransitionEnd"
      >

        <BaseCarouselCard
          v-for="(item, index) in carouselItems"
          :key="`${item.id}-${index}`"
          :image="item.image_url"
          :title="item.name"
          :description="item.description"
          :active="
            index === trackIndex
          "
        />

      </div>

    </div>

    <!-- =====================================================
         FOOTER DEL CARRUSEL
    ====================================================== -->

    <div class="carousel-footer">

      <!-- INDICADORES -->

      <div class="carousel-indicators">

        <button
          v-for="(_, index) in items"
          :key="index"
          type="button"
          class="carousel-indicator"
          :class="{
            active:
              index === currentIndex
          }"
          :aria-label="`Ir a la base ${index + 1}`"
          @click="goTo(index)"
        />

      </div>

      <!-- CONTROLES -->

      <BaseCarouselControls
        @previous="previous"
        @next="next"
      />

    </div>

  </section>
</template>

<style scoped>
/* =========================================================
   CARRUSEL
========================================================= */

.base-carousel {
  width: 100%;
}

/* =========================================================
   VIEWPORT
========================================================= */

.carousel-viewport {
  width: 100%;
  height: 460px;

  position: relative;

  overflow: hidden;
}

/* =========================================================
   TRACK
========================================================= */

.carousel-track {
  --card-width: clamp(
    180px,
    17vw,
    250px
  );

  --gap: 28px;

  position: absolute;

  top: 0;
  left: 50%;

  display: flex;
  align-items: center;

  gap: var(--gap);

  width: max-content;

  transform:
    translateX(
      calc(
        -1 *
        (
          (
            var(--track-index)
            *
            (
              var(--card-width)
              +
              var(--gap)
            )
          )
          +
          (
            var(--card-width)
            / 2
          )
        )
      )
    );

  will-change: transform;
}

/*
|--------------------------------------------------------------------------
| TRANSICIÓN
|--------------------------------------------------------------------------
*/

.carousel-track.is-animating {
  transition:
    transform
    0.65s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}

/* =========================================================
   FOOTER
========================================================= */

.carousel-footer {
  display: flex;

  flex-direction: column;
  align-items: center;

  gap: 22px;

  margin-top: 34px;
}

/* =========================================================
   INDICADORES
========================================================= */

.carousel-indicators {
  display: flex;
  align-items: center;

  justify-content: center;

  gap: 8px;
}

.carousel-indicator {
  width: 7px;
  height: 7px;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background:
    rgba(
      255,
      255,
      255,
      0.25
    );

  cursor: pointer;

  transition:
    width 0.25s ease,
    background 0.25s ease;
}

.carousel-indicator.active {
  width: 24px;

  border-radius: 10px;

  background: #ffffff;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1024px) {

  .carousel-viewport {
    height: 420px;
  }

  .carousel-track {
    --card-width: 220px;

    --gap: 24px;
  }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {

  .carousel-viewport {
    height: 390px;
  }

  .carousel-track {
    --card-width: 280px;

    --gap: 20px;
  }

  .carousel-footer {
    margin-top: 26px;
  }
}
</style>