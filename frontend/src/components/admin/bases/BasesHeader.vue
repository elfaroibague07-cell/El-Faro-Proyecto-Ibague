<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <div class="bases-header">
    <div class="header-content">
      <span class="page-badge">EL FARO</span>
      <h1 class="page-title">Bases</h1>
      <p class="page-subtitle">Administra el catálogo de bases y soportes para tu tienda.</p>
    </div>

    <button type="button" class="create-button" @click="$emit('create')">
      <Plus :size="18" />
      <span>Nueva base</span>
    </button>
  </div>
</template>

<style scoped>
.bases-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.create-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.create-button:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(255, 255, 255, 0.2);
}

@media (max-width: 600px) {
  .bases-header {
    flex-direction: column;
    align-items: stretch;
  }
  .create-button {
    width: 100%;
  }
}
</style>