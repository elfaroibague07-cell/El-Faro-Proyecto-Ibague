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

.carousel-control {
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;

  background: #111214;
  color: #ffffff;

  font-size: 1.1rem;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.carousel-control:hover {
  background: #1a1b1e;
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}
</style>