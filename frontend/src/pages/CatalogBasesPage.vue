<script setup>
import { onMounted, ref } from 'vue'

import BaseCarousel from '../components/carousel/BaseCarousel.vue'
import { getBases } from '../services/base.service.ts'

const bases = ref([])
const loading = ref(true)
const error = ref(null)

async function loadBases() {
  try {
    loading.value = true
    error.value = null

    bases.value = await getBases()
  } catch (err) {
    console.error('Error cargando bases:', err)

    error.value = 'No fue posible cargar las bases.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBases()
})
</script>

<template>
  <main class="catalog-bases-page">
    <section class="catalog-bases-header">
      <p class="eyebrow">
        EL FARO
      </p>

      <h1>
        Elige la base para tu esfera
      </h1>

      <p class="subtitle">
        Encuentra la base que mejor acompañe tu esfera de cristal.
      </p>
    </section>

    <section class="catalog-bases-content">
      <div v-if="loading" class="state-message">
        Cargando bases...
      </div>

      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>

      <BaseCarousel
        v-else
        :items="bases"
      />
    </section>
  </main>
</template>

<style scoped>
.catalog-bases-page {
  width: 100%;
  min-height: 100vh;

  padding: 80px 6%;

  background: #0b0c0e;
  color: #ffffff;
}

.catalog-bases-header {
  max-width: 760px;
  margin-bottom: 48px;
}

.eyebrow {
  margin: 0 0 12px;

  color: #8d8d8d;

  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.catalog-bases-header h1 {
  margin: 0 0 16px;

  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  font-weight: 600;
}

.subtitle {
  margin: 0;

  max-width: 600px;

  color: #a6a6a6;

  font-size: 1rem;
  line-height: 1.7;
}

.catalog-bases-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.state-message {
  padding: 60px 20px;

  text-align: center;

  color: #a6a6a6;
}

.state-message.error {
  color: #ff8b8b;
}

@media (max-width: 768px) {
  .catalog-bases-page {
    padding: 50px 20px;
  }

  .catalog-bases-header {
    margin-bottom: 32px;
  }
}
</style>