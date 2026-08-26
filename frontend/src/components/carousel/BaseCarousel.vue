<script setup>
import { ref, computed } from 'vue'

import BaseCarouselCard from './BaseCarouselCard.vue'
import BaseCarouselControls from './BaseCarouselControls.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)

const currentItem = computed(() => {
  return props.items[currentIndex.value]
})

function next() {
  if (!props.items.length) return

  currentIndex.value =
    (currentIndex.value + 1) % props.items.length
}

function previous() {
  if (!props.items.length) return

  currentIndex.value =
    (currentIndex.value - 1 + props.items.length) %
    props.items.length
}
</script>

<template>
  <section
    v-if="items.length"
    class="base-carousel"
  >
    <div class="carousel-main">
      <BaseCarouselCard
        :image="currentItem.image_url"
        :title="currentItem.name"
        :description="currentItem.description"
      />
    </div>

    <div class="carousel-footer">
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in items"
          :key="index"
          type="button"
          class="carousel-indicator"
          :class="{
            active: index === currentIndex
          }"
          :aria-label="`Ir a la imagen ${index + 1}`"
          @click="currentIndex = index"
        />
      </div>

      <BaseCarouselControls
        @previous="previous"
        @next="next"
      />
    </div>
  </section>
</template>

<style scoped>
.base-carousel {
  width: 100%;
}

.carousel-main {
  width: 100%;
}

.carousel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
}

.carousel-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-indicator {
  width: 7px;
  height: 7px;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.25);

  cursor: pointer;

  transition:
    width 0.2s ease,
    background 0.2s ease;
}

.carousel-indicator.active {
  width: 24px;
  border-radius: 10px;
  background: #ffffff;
}

@media (max-width: 768px) {
  .carousel-footer {
    margin-top: 16px;
  }
}
</style>