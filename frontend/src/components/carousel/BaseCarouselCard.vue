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
  }
})
</script>

<template>
  <article class="carousel-card">
    <div class="carousel-card-image-wrapper">
      <img
        :src="image"
        :alt="title"
        class="carousel-card-image"
      />
    </div>

    <div
      v-if="title || description"
      class="carousel-card-content"
    >
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
.carousel-card {
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  background: #111214;
}

.carousel-card-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.carousel-card-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.carousel-card-content {
  padding: 24px;
}

.carousel-card-content h3 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
}

.carousel-card-content p {
  margin: 0;
  color: #a6a6a6;
  line-height: 1.6;
}
</style>