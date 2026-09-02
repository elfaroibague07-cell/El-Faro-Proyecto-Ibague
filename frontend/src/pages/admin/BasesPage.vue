<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Base } from '../../types/base'
import { useBaseStore } from '../../stores/base.store'

import BasesHeader from '../../components/admin/bases/BasesHeader.vue'
import BasesTable from '../../components/admin/bases/BasesTable.vue'
import EmptyBases from '../../components/admin/bases/EmptyBases.vue'
import CreateBaseModal from '../../components/admin/bases/CreateBaseModal.vue'
import DeleteConfirmModal from '../../components/admin/common/DeleteConfirmModal.vue'
import AdminNav from '../../components/admin/common/AdminNav.vue'

const baseStore = useBaseStore()

const openDeleteModal = ref(false)
const baseToDelete = ref<Base | null>(null)
const openCreateModal = ref(false)
const selectedBase = ref<Base | null>(null)
const deleting = ref(false)

onMounted(async () => {
  await baseStore.loadBases()
})

const openBaseModal = () => {
  selectedBase.value = null
  openCreateModal.value = true
}

const editBase = (base: Base) => {
  selectedBase.value = base
  openCreateModal.value = true
}

const deleteBase = (base: Base) => {
  baseToDelete.value = base
  openDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!baseToDelete.value) return
  deleting.value = true
  try {
    await baseStore.deleteBase(baseToDelete.value.id, baseToDelete.value.image_url)
    openDeleteModal.value = false
    baseToDelete.value = null
  } catch (error) {
    console.error('Error eliminando base:', error)
  } finally {
    deleting.value = false
  }
}

const saveBase = async (baseData: any) => {
  try {
    if (selectedBase.value) {
      await baseStore.updateBase(selectedBase.value.id, baseData)
    } else {
      await baseStore.createBase(baseData)
    }
    openCreateModal.value = false
    selectedBase.value = null
  } catch (error) {
    console.error('Error guardando base:', error)
  }
}
</script>

<template>
  <section class="bases-page">
    
    <AdminNav />

    <BasesHeader @create="openBaseModal" />

    <BasesTable
      v-if="baseStore.bases.length"
      :bases="baseStore.bases"
      @edit="editBase"
      @delete="deleteBase"
    />

    <EmptyBases
      v-else-if="!baseStore.loading"
      @create="openBaseModal"
    />

    <CreateBaseModal
      :key="selectedBase?.id ?? 'new'"
      :open="openCreateModal"
      :base="selectedBase"
      @close="openCreateModal = false"
      @save="saveBase"
    />

    <DeleteConfirmModal
      :open="openDeleteModal"
      :title="baseToDelete?.name || ''"
      :loading="deleting"
      @close="openDeleteModal = false"
      @confirm="confirmDelete"
    />
  </section>
</template>

<style scoped>
.bases-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>