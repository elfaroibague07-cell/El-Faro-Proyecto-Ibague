<script setup lang="ts">
defineEmits<{
  (e: 'create'): void
}>()
</script>

<template>
  <div class="bases-header">
    <div class="header-content">
      <h1 class="page-title">Bases</h1>
      <p class="page-subtitle">Administra el catálogo de bases y soportes de El Faro.</p>
    </div>

    <button type="button" class="create-button" @click="$emit('create')">
      <span class="button-icon">+</span>
      Nueva base
    </button>
  </div>
</template>

<style scoped>
.bases-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary, #9ca3af);
  margin: 0;
}

.create-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.create-button:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}

.button-icon {
  font-size: 18px;
  line-height: 1;
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