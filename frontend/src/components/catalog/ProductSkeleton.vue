<template>
  <div class="product-skeleton">
    <div class="skeleton-image"></div>

    <div class="skeleton-content">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-description"></div>
      <div class="skeleton-line skeleton-price"></div>
    </div>
  </div>
</template>

<style scoped>
.product-skeleton {
  width: 100%;
  min-height: 420px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  background: rgba(255, 255, 255, .025);
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, .06);
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-content {
  padding: 20px;
}

.skeleton-line {
  border-radius: 6px;
  background: rgba(255, 255, 255, .07);
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-title {
  width: 65%;
  height: 20px;
  margin-bottom: 14px;
}

.skeleton-description {
  width: 90%;
  height: 12px;
  margin-bottom: 10px;
}

.skeleton-price {
  width: 35%;
  height: 18px;
  margin-top: 20px;
}

@keyframes skeleton-loading {
  0%,
  100% {
    opacity: .45;
  }

  50% {
    opacity: .9;
  }
}
</style>