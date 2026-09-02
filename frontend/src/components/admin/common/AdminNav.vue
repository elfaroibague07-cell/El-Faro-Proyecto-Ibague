<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="admin-nav">
    <router-link 
      to="/admin/products" 
      class="nav-tab" 
      :class="{ active: route.path === '/admin/products' }"
    >
      Productos
    </router-link>
    <router-link 
      to="/admin/bases" 
      class="nav-tab" 
      :class="{ active: route.path === '/admin/bases' }"
    >
      Bases
    </router-link>
  </nav>
</template>

<style scoped>
.admin-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}

.nav-tab {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-tab:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.03);
}

.nav-tab.active {
  background: var(--primary);
  color: #070707;
  font-weight: 600;
}
</style>