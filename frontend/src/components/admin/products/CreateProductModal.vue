<script setup lang="ts">
import { watch } from 'vue'
import { X, UploadCloud, Check } from 'lucide-vue-next'

import type { Product } from '../../../types/product'
import type { Category } from '../../../types/category'

import {
  useProductModal,
  type ProductForm
} from '../../../composables/useProductModal'

const props = defineProps<{
  open: boolean
  product: Product | null
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', product: ProductForm): void
}>()

const {
  form,
  saving,
  slugEdited,
  previewImage,
  updateSlug,
  onImageSelected,
  resetForm,
  fillForm,
  validate,
  validateSlug,
  uploadImage
} = useProductModal()

watch(
  () => props.product,
  product => {
    resetForm()
    if (product) {
      fillForm(product)
    }
  },
  { immediate: true }
)

watch(
  () => form.name,
  value => {
    updateSlug(value)
  }
)

async function submit() {
  saving.value = true
  try {
    await validate()
    await validateSlug(props.product?.id)
    await uploadImage()
    emit('save', { ...form })
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : 'Error inesperado.'
    )
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal-overlay">
      <div class="modal-card">
        
        <!-- HEADER -->
        <header class="modal-header">
          <div>
            <span class="modal-badge">EL FARO</span>
            <h2>{{ product ? 'Editar producto' : 'Nuevo producto' }}</h2>
          </div>
          <button type="button" class="close-btn" @click="emit('close')">
            <X :size="18" />
          </button>
        </header>

        <form @submit.prevent="submit" class="modal-form">
          
          <!-- INFORMACIÓN PRINCIPAL -->
          <div class="field-group">
            <div class="field">
              <label>Nombre del producto</label>
              <input v-model="form.name" placeholder="Ej. Lámpara Cristal Cúpula" required />
            </div>

            <div class="field">
              <label>Slug de URL</label>
              <input v-model="form.slug" @input="slugEdited = true" placeholder="ej-lampara-cristal-cupula" required />
            </div>
          </div>

          <!-- CATEGORÍA -->
          <div class="field">
            <label>Categoría</label>
            <select v-model="form.category_id" required>
              <option value="" disabled>Selecciona una categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <small v-if="!categories.length" class="field-hint warning">
              No hay categorías creadas. Crea una antes de registrar productos.
            </small>
          </div>

          <!-- DESCRIPCIONES -->
          <div class="field">
            <label>Descripción corta</label>
            <textarea v-model="form.description" rows="2" placeholder="Breve resumen visible en tarjetas..." />
          </div>

          <div class="field">
            <label>Descripción completa</label>
            <textarea v-model="form.long_description" rows="4" placeholder="Detalles técnicos y características completas..." />
          </div>

          <!-- ESPECIFICACIONES -->
          <div class="grid-specs">
            <div class="field">
              <label>Material</label>
              <input v-model="form.material" placeholder="Ej. Cristal K9 / Madera" />
            </div>
            <div class="field">
              <label>Tamaño</label>
              <input v-model="form.size" placeholder="Ej. 8 cm x 12 cm" />
            </div>
          </div>

          <!-- PRECIO -->
          <div class="field">
            <label>Precio ($)</label>
            <input v-model.number="form.price" type="number" min="1" placeholder="0.00" required />
          </div>

          <!-- IMAGEN & PREVIEW -->
          <div class="upload-section">
            <label class="upload-box" :class="{ 'has-preview': previewImage }">
              <input type="file" accept="image/*" @change="onImageSelected" hidden />
              <template v-if="!previewImage">
                <UploadCloud :size="28" />
                <span>Sube o arrastra la imagen del producto</span>
                <small>PNG, JPG o WEBP</small>
              </template>
              <img v-else :src="previewImage" alt="Previsualización" class="preview-img" />
            </label>
          </div>

          <!-- ESTADOS -->
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input v-model="form.featured" type="checkbox" />
              <span>Producto destacado</span>
            </label>
            <label class="checkbox-label">
              <input v-model="form.active" type="checkbox" />
              <span>Producto activo (visible en tienda)</span>
            </label>
          </div>

          <!-- ACCIONES -->
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="emit('close')">
              Cancelar
            </button>
            <button class="btn-primary" type="submit" :disabled="saving || !categories.length">
              <Check v-if="!saving" :size="16" />
              <span>{{ saving ? 'Guardando...' : product ? 'Actualizar producto' : 'Guardar producto' }}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  z-index: 9999;
  animation: fadeIn 0.25s ease-out;
}

.modal-card {
  width: 720px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  border-radius: 24px;
  background: rgba(18, 18, 18, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 16px;
}

.modal-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
}

.modal-header h2 {
  font-size: 1.35rem;
  font-weight: 600;
  color: #ffffff;
  margin: 2px 0 0 0;
  letter-spacing: -0.01em;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-weight: 500;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.grid-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  font: inherit;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  color: #ffffff;
}

select {
  cursor: pointer;
}

select option {
  background: #121212;
  color: #ffffff;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
}

textarea {
  resize: vertical;
  min-height: 90px;
}

.field-hint {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.field-hint.warning {
  color: #f87171;
}

.upload-section {
  display: flex;
  flex-direction: column;
}

.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.01);
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.upload-box:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.upload-box span {
  font-size: 0.9rem;
  font-weight: 500;
}

.upload-box small {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.upload-box.has-preview {
  padding: 12px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.15);
}

.preview-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  accent-color: #ffffff;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  border: none;
  background: #ffffff;
  color: #000000;
}

.btn-primary:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.15);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media(max-width: 700px) {
  .modal-card {
    padding: 20px;
  }
  .field-group,
  .grid-specs {
    grid-template-columns: 1fr;
  }
  .modal-actions {
    flex-direction: column-reverse;
  }
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>