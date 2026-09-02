<script setup lang="ts">
defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <div class="empty-container">
    <div class="empty-icon-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    </div>
    <h3 class="empty-title">No hay bases registradas</h3>
    <p class="empty-subtitle">Comienza agregando soportes o bases de iluminación para los productos de El Faro.</p>
    <button type="button" class="btn-primary" @click="$emit('create')">
      <span>+</span> Nueva base
    </button>
  </div>
</template>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  background: rgba(18, 18, 18, 0.4);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  gap: 12px;
}

.empty-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  margin-bottom: 4px;
}

.empty-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.empty-subtitle {
  font-size: 0.9rem;
  color: #9ca3af;
  max-width: 380px;
  margin: 0 0 16px 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  color: #0b0b0b;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}
</style>