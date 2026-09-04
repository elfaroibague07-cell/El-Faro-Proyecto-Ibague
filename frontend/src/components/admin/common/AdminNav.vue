<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth.store'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const handleLogout = async () => {
  await auth.signOut()
  router.push('/')
}
</script>

<template>
  <header class="admin-header">
    <div class="header-container">
      <!-- LOGO / MARCA -->
      <div class="brand-section">
        <div class="brand-glow"></div>
        <span class="brand-badge">EL FARO</span>
        <h1 class="brand-title">Gestión</h1>
      </div>

      <!-- NAVEGACIÓN DE PESTAÑAS -->
      <nav class="admin-nav">
        <router-link 
          to="/admin/products" 
          class="nav-tab" 
          :class="{ active: route.path === '/admin/products' }"
        >
          <span class="tab-dot"></span>
          Productos
        </router-link>
        <router-link 
          to="/admin/bases" 
          class="nav-tab" 
          :class="{ active: route.path === '/admin/bases' }"
        >
          <span class="tab-dot"></span>
          Bases
        </router-link>
      </nav>

      <!-- ACCIONES DE USUARIO / SALIR -->
      <div class="user-actions">
        <button type="button" class="logout-btn" @click="handleLogout" title="Cerrar sesión e ir al inicio">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span class="logout-text">Salir</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(12, 12, 12, 0.75);
  backdrop-filter: blur(25px);
  position: sticky;
  top: 0;
  z-index: 50;
  margin-bottom: 32px;
}

.header-container {
  width: min(1280px, 92%);
  margin: 0 auto;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* MARCA */
.brand-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

/* NAVEGACIÓN */
.admin-nav {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: all 0.3s ease;
}

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nav-tab:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.nav-tab:hover .tab-dot {
  background: rgba(255, 255, 255, 0.6);
}

.nav-tab.active {
  background: #ffffff;
  color: #000000;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
}

.nav-tab.active .tab-dot {
  background: #000000;
}

/* BOTÓN SALIR */
.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .header-container {
    height: auto;
    padding: 16px 0;
    flex-direction: column;
    gap: 16px;
  }

  .admin-nav {
    width: 100%;
    justify-content: center;
  }

  .nav-tab {
    flex: 1;
    justify-content: center;
  }

  .user-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>