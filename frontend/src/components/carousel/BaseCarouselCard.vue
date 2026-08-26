<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>

  <article
    class="carousel-card"
    :class="{
      active
    }"
  >

    <!-- IMAGEN -->

    <div class="carousel-card-image-wrapper">

      <img
        :src="image"
        :alt="title"
        class="carousel-card-image"
      />

    </div>

    <!-- INFORMACIÓN -->

    <div class="carousel-card-content">

      <h3 v-if="title">
        {{ title }}
      </h3>

      <p v-if="description">
        {{ description }}
      </p>

    </div>

  </article>

</template>

<style scoped>

/* =========================================================
   CARD
========================================================= */

.carousel-card {

  flex: 0 0 var(--card-width);

  width: var(--card-width);

  opacity: 0.55;

  transform:
    translateY(12px)
    scale(0.94);

  transition:
    opacity 0.5s ease,
    transform 0.65s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}

/* =========================================================
   CARD ACTIVA
========================================================= */

.carousel-card.active {

  opacity: 1;

  transform:
    translateY(0)
    scale(1);
}

/* =========================================================
   IMAGEN
========================================================= */

.carousel-card-image-wrapper {

  width: 100%;

  aspect-ratio: 0.78;

  overflow: hidden;

  border-radius: 18px;

  background: #111214;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );
}

/* =========================================================
   IMAGEN
========================================================= */

.carousel-card-image {

  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition:
    transform 0.7s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
}

/*
|--------------------------------------------------------------------------
| PEQUEÑO EFECTO EN LA CARD ACTIVA
|--------------------------------------------------------------------------
*/

.carousel-card.active
.carousel-card-image {

  transform: scale(1.02);
}

/* =========================================================
   CONTENIDO
========================================================= */

.carousel-card-content {

  padding:
    14px
    4px
    0;
}

/* =========================================================
   TÍTULO
========================================================= */

.carousel-card-content h3 {

  margin: 0 0 6px;

  color: #ffffff;

  font-size: 0.95rem;

  font-weight: 500;

  letter-spacing: -0.01em;
}

/* =========================================================
   DESCRIPCIÓN
========================================================= */

.carousel-card-content p {

  margin: 0;

  max-width: 220px;

  color:
    rgba(
      255,
      255,
      255,
      0.45
    );

  font-size: 0.72rem;

  line-height: 1.5;
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 640px) {

  .carousel-card {

    transform:
      translateY(8px)
      scale(0.96);
  }

  .carousel-card.active {

    transform:
      translateY(0)
      scale(1);
  }

  .carousel-card-image-wrapper {

    border-radius: 20px;
  }

}

</style>