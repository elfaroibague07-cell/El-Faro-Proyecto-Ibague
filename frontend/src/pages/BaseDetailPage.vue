<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBaseBySlug } from '../services/base.service' // O la ruta de tu servicio

const route = useRoute()
const base = ref(null)
const loading = ref(true)
const error = ref(null)

async function loadBaseDetail() {
  try {
    loading.value = true
    const baseSlug = route.params.slug
    base.value = await getBaseBySlug(baseSlug)
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
</script>

<template>
  <main class="product-detail-page">
    <div v-if="loading" class="state-message">Cargando producto...</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>

    <div v-else-if="base" class="product-container">
      <!-- Breadcrumb igual al de tus productos -->
      <nav class="breadcrumb">
        <router-link to="/">Inicio</router-link> / 
        <router-link to="/catalogo/bases">Catálogo</router-link> / 
        <span>{{ base.name }}</span>
      </nav>

      <div class="product-grid">
        <!-- Imagen grande -->
        <div class="product-image-wrapper">
          <img :src="base.image_url" :alt="base.name" class="product-image" />
        </div>

        <!-- Información y acciones -->
        <div class="product-info">
          <span class="badge">Producto destacado</span>
          <h1>{{ base.name }}</h1>
          
          <!-- Si manejas precio en las bases, colócalo aquí, o adáptalo -->
          <div class="product-price">$ 220.000</div>

          <p class="product-description">
            {{ base.description }}
          </p>

          <div class="product-options">
            <div class="option-box">Material</div>
            <div class="option-box">Tamaño</div>
          </div>

          <button type="button" class="btn-submit">
            Solicitar información
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.product-detail-page {
  width: 100%;
  min-height: 100vh;
  padding: 120px 40px 100px;
  background: #08090a;
  color: #ffffff;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb {
  margin-bottom: 40px;
  color: #8d8d8d;
  font-size: 0.85rem;
}

.breadcrumb a {
  color: #8d8d8d;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #ffffff;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.product-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  background: #111214;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info h1 {
  margin: 15px 0 20px;
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.03em;
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  font-size: 0.75rem;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.product-description {
  color: #999999;
  line-height: 1.6;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

.product-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.option-box {
  padding: 16px;
  background: #111214;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: #8d8d8d;
  font-size: 0.9rem;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: #f0f0f0;
  color: #08090a;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background: #ffffff;
}

.state-message {
  text-align: center;
  padding: 100px;
  color: #8d8d8d;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .product-detail-page {
    padding: 90px 20px 60px;
  }
}
</style>