<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Base, BaseForm } from '../../../types/base'

const props = defineProps<{
  open: boolean
  base?: Base | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: BaseForm): void
}>()

const form = ref<BaseForm>({
  name: '',
  slug: '',
  price: 0,
  status: 'Activo',
  featured: false,
  image: null,
  description: ''
})

const imagePreview = ref<string>('')

// Sincronizar datos cuando se abre para editar o crear
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    if (props.base) {
      form.value = {
        name: props.base.name,
        slug: props.base.slug,
        price: props.base.price,
        status: props.base.status,
        featured: props.base.featured,
        image: null,
        description: props.base.description || ''
      }
      imagePreview.value = props.base.image_url || ''
    } else {
      form.value = {
        name: '',
        slug: '',
        price: 0,
        status: 'Activo',
        featured: false,
        image: null,
        description: ''
      }
      imagePreview.value = ''
    }
  }
})

// Generar slug automático a partir del nombre si es nuevo
const handleNameInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  form.value.name = target.value
  if (!props.base) {
    form.value.slug = target.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  emit('save', form.value)
}
</script>

<template>
  <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ base ? 'Editar Base' : 'Nueva Base' }}</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label>Nombre de la Base</label>
          <input 
            type="text" 
            :value="form.name" 
            @input="handleNameInput" 
            required 
            placeholder="Ej: Base LED Circular" 
          />
        </div>

        <div class="form-group">
          <label>Slug (URL amigable)</label>
          <input 
            type="text" 
            v-model="form.slug" 
            required 
            placeholder="ej-base-led-circular" 
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Precio ($)</label>
            <input 
              type="number" 
              v-model.number="form.price" 
              required 
              min="0" 
              placeholder="0" 
            />
          </div>

          <div class="form-group">
            <label>Estado</label>
            <select v-model="form.status">
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.featured" />
            <span>Destacar base en la tienda</span>
          </label>
        </div>

        <div class="form-group">
          <label>Imagen de la Base</label>
          <div class="image-upload-container">
            <div v-if="imagePreview" class="preview-box">
              <img :src="imagePreview" alt="Vista previa" />
            </div>
            <input type="file" accept="image/*" @change="handleImageChange" />
          </div>
        </div>

        <div class="form-group">
          <label>Descripción (Opcional)</label>
          <textarea v-model="form.description" rows="3" placeholder="Detalles de iluminación o materiales..."></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button type="submit" class="btn-primary">{{ base ? 'Actualizar Base' : 'Crear Base' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-content {
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #ffffff;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #d1d5db;
}

.form-group input,
.form-group select,
.form-group textarea {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 14px;
  color: #ffffff;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #e5e7eb;
}

.image-upload-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-box {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #1a1a1a;
}

.preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e5e7eb;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  background: #ffffff;
  color: #0b0b0b;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background: #e5e7eb;
}
</style>