<script setup>

defineEmits([
  'previous',
  'next'
])

</script>

<template>

  <div class="carousel-controls">

    <button
      type="button"
      class="carousel-control"
      aria-label="Anterior"
      @click="$emit('previous')"
    >
      ←
    </button>

    <button
      type="button"
      class="carousel-control"
      aria-label="Siguiente"
      @click="$emit('next')"
    >
      →
    </button>

  </div>

</template>

<style scoped>

.carousel-controls {

  display: flex;

  align-items: center;

  gap: 10px;

}

/*
|--------------------------------------------------------------------------
| BOTONES
|--------------------------------------------------------------------------
*/

.carousel-control {

  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid rgba(
    255,
    255,
    255,
    0.15
  );

  border-radius: 50%;

  background: transparent;

  color: #ffffff;

  font-size: 0.95rem;

  cursor: pointer;

  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;

}

/*
|--------------------------------------------------------------------------
| HOVER
|--------------------------------------------------------------------------
*/

.carousel-control:hover {

  background: rgba(
    255,
    255,
    255,
    0.08
  );

  border-color: rgba(
    255,
    255,
    255,
    0.3
  );

  transform: translateY(-2px);

}

/*
|--------------------------------------------------------------------------
| ACTIVE
|--------------------------------------------------------------------------
*/

.carousel-control:active {

  transform:
    translateY(0)
    scale(0.95);

}

</style>