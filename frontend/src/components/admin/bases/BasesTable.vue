<script setup lang="ts">
import type { Base } from '../../../types/base'

defineProps<{
  bases: Base[]
}>()

defineEmits<{
  (e: 'edit', base: Base): void
  (e: 'delete', base: Base): void
}>()
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Base</th>
          <th>Precio</th>
          <th>Estado</th>
          <th>Destacado</th>
          <th class="text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="base in bases" :key="base.id">
          <td>
            <div class="img-wrapper">
              <img :src="base.image_url || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150'" :alt="base.name" />
            </div>
          </td>
          <td>
            <div class="product-name">{{ base.name }}</div>
            <div class="product-slug">{{ base.slug }}</div>
          </td>
          <td class="price-text">${{ base.price?.toLocaleString() ?? 0 }}</td>
          <td>
            <span :class="['badge', base.status === 'Activo' ? 'badge-active' : 'badge-inactive']">
              {{ base.status }}
            </span>
          </td>
          <td>
            <span v-if="base.featured" class="star-icon" title="Destacado">⭐</span>
            <span v-else class="dash-icon">—</span>
          </td>
          <td class="text-right">
            <div class="action-buttons">
              <button class="btn-icon edit" @click="$emit('edit', base)" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon delete" @click="$emit('delete', base)" title="Eliminar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </td>
        </tr>

        <tr v-if="!bases.length">
          <td colspan="6" class="empty">
            <div class="empty-state">
              <p>No hay bases registradas en este momento.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  overflow: hidden;
  overflow-x: auto;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

thead {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

th {
  padding: 18px 24px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

td {
  padding: 18px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

tbody tr:last-child td {
  border-bottom: none;
}

.img-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
  margin-bottom: 3px;
}

.product-slug {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.price-text {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-active {
  background-color: rgba(16, 185, 129, 0.12);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.badge-inactive {
  background-color: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.star-icon {
  font-size: 1rem;
}

.dash-icon {
  color: rgba(255, 255, 255, 0.2);
}

.text-right {
  text-align: right;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.03);
}

.btn-icon.edit {
  color: #60a5fa;
}

.btn-icon.edit:hover {
  background-color: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.btn-icon.delete {
  color: #f87171;
}

.btn-icon.delete:hover {
  background-color: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
}

.empty {
  padding: 60px 24px;
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  margin: 0;
}
</style>