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
  padding: 80px 20px;
  background: rgba(18, 18, 18, 0.85);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  gap: 16px;
  backdrop-filter: blur(20px);
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
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.empty-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 380px;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #e0e0e0;
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.15);
}
</style>