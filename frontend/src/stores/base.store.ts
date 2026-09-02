import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Base, BaseForm } from '../types/base'
import { baseService } from '../services/base.service'

export const useBaseStore = defineStore('base', () => {
  const bases = ref<Base[]>([])
  const loading = ref(false)

  // Cargar todas las bases desde Supabase
  const loadBases = async () => {
    loading.value = true
    try {
      bases.value = await baseService.getAll()
    } catch (error) {
      console.error('Error cargando bases:', error)
    } finally {
      loading.value = false
    }
  }

  // Crear una nueva base
  const createBase = async (formData: BaseForm) => {
    try {
      await baseService.create(formData)
      await loadBases()
    } catch (error) {
      console.error('Error creando base:', error)
      throw error
    }
  }

  // Actualizar una base existente
  const updateBase = async (id: number | string, formData: Partial<BaseForm>) => {
    try {
      await baseService.update(id, formData)
      await loadBases()
    } catch (error) {
      console.error('Error actualizando base:', error)
      throw error
    }
  }

  // Eliminar una base
  const deleteBase = async (id: number | string, imageUrl?: string) => {
    try {
      await baseService.delete(id, imageUrl)
      bases.value = bases.value.filter(b => b.id !== id)
    } catch (error) {
      console.error('Error eliminando base:', error)
      throw error
    }
  }

  return {
    bases,
    loading,
    loadBases,
    createBase,
    updateBase,
    deleteBase
  }
})