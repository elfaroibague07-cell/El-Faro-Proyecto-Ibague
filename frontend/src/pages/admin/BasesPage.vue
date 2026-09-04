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
  <main class="admin-layout">
    <AdminNav />

    <div class="content-container">
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
    </div>

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
  </main>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #0b0b0b;
  color: #ffffff;
  padding-bottom: 60px;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>