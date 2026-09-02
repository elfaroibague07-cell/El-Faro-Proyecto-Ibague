<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getBaseBySlug } from '../services/base.service'
import ProductBreadcrumb from '../components/admin/products/ProductBreadcrumb.vue'
import Navbar from '../components/layout/Navbar.vue'

const route = useRoute()
const base = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function loadBaseDetail() {
  try {
    loading.value = true
    const baseSlug = route.params.slug as string
    base.value = await getBaseBySlug(baseSlug)
    if (base.value) {
      document.title = `${base.value.name} | El Faro`
    }
  } catch (err) {
    console.error('Error al cargar el detalle de la base:', err)
    error.value = 'No se pudo cargar la información de la base.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBaseDetail()
})

const whatsappLink = computed(() => {
  if (!base.value) return '#'
  const message = `Hola.\n\nEstoy interesado en la base:\n\n${base.value.name}\n\n${window.location.href}`
  return `https://wa.me/573103456789?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <Navbar />

  <section class="base-detail-page">
    <div class="container">
      <div v-if="loading" class="loading">
        <h2>Cargando base...</h2>
      </div>

      <div v-else-if="error" class="not-found">
        <h2>{{ error }}</h2>
        <RouterLink to="/" class="button">Volver al catálogo</RouterLink>
      </div>

      <template v-else-if="base">
        <ProductBreadcrumb :title="base.name" :product-name="base.name" />

        <div class="base-layout">
          <div class="image-column">
            <img :src="base.image_url" :alt="base.name" class="image" loading="eager" />
          </div>

          <div class="info-column">
            <span v-if="base.featured" class="badge">Producto destacado</span>
            <h1>{{ base.name }}</h1>
            
            <div class="price">$ {{ base.price?.toLocaleString() ?? 0 }}</div>

            <p class="description">
              {{ base.description }}
            </p>

            <div class="specs">
              <div class="spec">
                <strong>Material</strong>
                <span>Cristal óptico premium</span>
              </div>
              <div class="spec">
                <strong>Tamaño</strong>
                <span>Estándar</span>
              </div>
            </div>

            <a :href="whatsappLink" target="_blank" class="button">
              Solicitar por WhatsApp
            </a>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.base-detail-page {
  padding: 120px 0 80px;
  background-color: var(--background);
  transform: translateZ(0);
  -webkit-font-smoothing: antialiased;
}

.container {
  width: min(1200px, 92%);
  margin: auto;
}

.loading, .not-found {
  text-align: center;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.base-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
  margin-bottom: 70px;
}

.image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 22px;
  border: 1px solid var(--border);
  box-shadow: 0 25px 60px rgba(0,0,0,.12);
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  margin-bottom: 15px;
}

h1 {
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 18px;
}

.price {
  font-size: 2.3rem;
  font-weight: 700;
  color: var(--primary);
  margin: 28px 0;
}

.specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin: 35px 0;
}

.spec {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, .03);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text-secondary);
}

.spec strong {
  color: var(--text);
}

.description {
  line-height: 1.9;
  margin-bottom: 35px;
  color: var(--text-secondary);
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 28px;
  border-radius: 14px;
  background: var(--primary);
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: .3s;
}

.button:hover {
  transform: translateY(-3px);
  background: var(--primary-hover);
}

@media(max-width: 900px) {
  .base-layout {
    grid-template-columns: 1fr;
    gap: 45px;
  }
  .specs {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 2.2rem;
  }
}
</style>