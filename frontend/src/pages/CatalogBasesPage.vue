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
  <main id="bases" class="catalog-bases-page">

    <section class="catalog-bases-header">

      <p class="eyebrow">
        EL FARO
      </p>

      <h1>
        Elige la base que acompañará
        <br />
        tu recuerdo.
      </h1>

      <p class="subtitle">
        Descubre nuestras bases y encuentra el complemento
        perfecto para tu esfera de cristal.
      </p>

    </section>

    <section class="catalog-bases-carousel">

      <div
        v-if="loading"
        class="state-message"
      >
        Cargando bases...
      </div>

      <div
        v-else-if="error"
        class="state-message error"
      >
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
  /* Cambiamos min-height por height natural para que no estire de más y trunque el fondo */
  padding: 120px 40px 100px;

  /* Sincronizamos con la variable global de tu tema en lugar de un color fijo */
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

.state-message.error {
  color: #ff8b8b;
}

@media (max-width: 768px) {
  .catalog-bases-page {
    padding: 90px 20px 70px;
  }

  .catalog-bases-header h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .catalog-bases-carousel {
    margin-top: 45px;
  }
}
</style>