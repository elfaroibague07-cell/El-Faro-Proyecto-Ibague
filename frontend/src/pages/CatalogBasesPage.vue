<script setup>
import { onMounted } from 'vue'
import BaseCarousel from '../components/carousel/BaseCarousel.vue'
import { useBaseStore } from '../stores/base.store'

const baseStore = useBaseStore()

onMounted(async () => {
  await baseStore.loadBases()
})
</script>

<template>
  <main id="bases" class="catalog-bases-page">
    <section class="catalog-bases-header">
      <p class="eyebrow">EL FARO</p>
      <h1>
        Elige la base que acompañará
        <br />
        tu recuerdo.
      </h1>
      <p class="subtitle">
        Descubre nuestras bases y encuentra el complemento
        perfecto para tu cristal.
      </p>
    </section>

    <section class="catalog-bases-carousel">
      <div v-if="baseStore.loading" class="state-message">
        Cargando bases...
      </div>

      <BaseCarousel
        v-else
        :items="baseStore.bases"
      />
    </section>
  </main>
</template>

<style scoped>
/* Mantén tus estilos intactos */
.catalog-bases-page {
  width: 100%;
  padding: 120px 40px 100px;
  background: var(--background);
  color: var(--text, #ffffff);
}
.catalog-bases-header {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.eyebrow {
  margin: 0 0 22px;
  color: #8d8d8d;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.35em;
}
.catalog-bases-header h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.6rem, 5vw, 5rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.04em;
}
.subtitle {
  max-width: 620px;
  margin: 26px auto 0;
  color: #999999;
  font-size: 1rem;
  line-height: 1.7;
}
.catalog-bases-carousel {
  width: 100%;
  max-width: 1400px;
  margin: 70px auto 0;
}
.state-message {
  padding: 80px 20px;
  text-align: center;
  color: #999999;
}
</style>