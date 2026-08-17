<script setup lang="ts">

import {
  computed,
  ref,
  watch
} from 'vue'

import { useCategoryStore } from '../../../stores/category.store'


/*================================*/
/* PROPS */
/*================================*/

const props = defineProps<{

  open: boolean

}>()


/*================================*/
/* STORE */
/*================================*/

const categoryStore =
  useCategoryStore()


/*================================*/
/* EVENTS */
/*================================*/

const emit = defineEmits<{

  (e: 'close'): void

  (e: 'save', name: string): void

}>()


/*================================*/
/* FORMULARIO */
/*================================*/

const name =
  ref('')

const error =
  ref('')

const deletingId =
  ref<string | null>(null)


/*================================*/
/* ESTADOS DERIVADOS */
/*================================*/

const categories =
  computed(() => {

    return categoryStore.categories

  })


const loading =
  computed(() => {

    return categoryStore.loading

  })


const loadingCategories =
  computed(() => {

    return categoryStore.loading

  })


const categoryError =
  computed(() => {

    return categoryStore.error

  })


/*================================*/
/* REINICIAR FORMULARIO */
/*================================*/

function resetForm() {

  name.value = ''

  error.value = ''

  deletingId.value = null

}


/*================================*/
/* ABRIR MODAL */
/*================================*/

watch(

  () => props.open,

  async isOpen => {

    if (!isOpen) {

      resetForm()

      return

    }


    resetForm()


    try {

      await categoryStore.loadCategories()

    }

    catch (err) {

      console.error(
        'ERROR CARGANDO CATEGORÍAS:',
        err
      )

    }

  }

)


/*================================*/
/* SLUG */
/*================================*/

function generateSlug(
  value: string
): string {

  return value

    .toLowerCase()

    .normalize('NFD')

    .replace(
      /[\u0300-\u036f]/g,
      ''
    )

    .replace(
      /[^a-z0-9\s-]/g,
      ''
    )

    .trim()

    .replace(
      /\s+/g,
      '-'
    )

}


/*================================*/
/* CREAR CATEGORÍA */
/*================================*/

async function save() {

  const categoryName =
    name.value.trim()


  /*------------------------------*/
  /* VALIDACIÓN */
  /*------------------------------*/

  if (!categoryName) {

    error.value =
      'Ingresa el nombre de la categoría.'

    return

  }


  if (categoryName.length < 2) {

    error.value =
      'El nombre debe tener al menos 2 caracteres.'

    return

  }


  /*------------------------------*/
  /* GENERAR SLUG */
  /*------------------------------*/

  const slug =
    generateSlug(categoryName)


  if (!slug) {

    error.value =
      'El nombre ingresado no genera una categoría válida.'

    return

  }


  /*------------------------------*/
  /* EVITAR DUPLICADOS */
  /*------------------------------*/

  const exists =
    categories.value.some(

      category =>

        category.name
          .trim()
          .toLowerCase() ===
        categoryName
          .toLowerCase()

    )


  if (exists) {

    error.value =
      'Ya existe una categoría con ese nombre.'

    return

  }


  error.value = ''


  try {

    /*----------------------------*/
    /* CREAR MEDIANTE STORE */
    /*----------------------------*/

    await categoryStore.createCategory({

      name: categoryName,

      slug

    })


    /*----------------------------*/
    /* AVISAR AL PADRE */
    /*----------------------------*/

    emit(
      'save',
      categoryName
    )


    /*----------------------------*/
    /* LIMPIAR */
    /*----------------------------*/

    name.value = ''


  }

  catch (err) {

    console.error(
      'ERROR CREANDO CATEGORÍA:',
      err
    )


    error.value =
      categoryStore.error ||
      (
        err instanceof Error
          ? err.message
          : 'No se pudo crear la categoría.'
      )

  }

}


/*================================*/
/* ELIMINAR CATEGORÍA */
/*================================*/

async function deleteCategory(

  categoryId: string,

  categoryName: string

) {

  if (deletingId.value) {

    return

  }


  /*------------------------------*/
  /* CONFIRMACIÓN */
  /*------------------------------*/

  const confirmed =
    window.confirm(

      `¿Seguro que deseas eliminar la categoría "${categoryName}"?`

    )


  if (!confirmed) {

    return

  }


  deletingId.value =
    categoryId


  try {

    await categoryStore.deleteCategory(
      categoryId
    )

  }

  catch (err) {

    console.error(
      'ERROR ELIMINANDO CATEGORÍA:',
      err
    )


    window.alert(

      `No se pudo eliminar "${categoryName}". ` +
      'Si tiene productos asociados, primero debes cambiarles la categoría.'

    )

  }

  finally {

    deletingId.value =
      null

  }

}


/*================================*/
/* CERRAR */
/*================================*/

function close() {

  if (loading.value) {

    return

  }


  if (deletingId.value) {

    return

  }


  error.value = ''

  emit('close')

}

</script>


<template>

  <div

    v-if="open"

    class="category-form-overlay"

    @click.self="close"

  >

    <div class="category-form">


      <!-- ================================= -->
      <!-- HEADER -->
      <!-- ================================= -->

      <div class="category-form-header">

        <div>

          <span class="category-eyebrow">

            CATEGORÍAS

          </span>


          <h2>

            Gestionar categorías

          </h2>


          <p>

            Crea y administra las categorías
            utilizadas para organizar
            los productos del catálogo.

          </p>

        </div>


        <button

          type="button"

          class="close-button"

          aria-label="Cerrar"

          :disabled="loading"

          @click="close"

        >

          ×

        </button>

      </div>


      <!-- ================================= -->
      <!-- CONTENIDO -->
      <!-- ================================= -->

      <div class="category-form-content">


        <!-- ================================= -->
        <!-- CREAR CATEGORÍA -->
        <!-- ================================= -->

        <form

          class="create-category"

          @submit.prevent="save"

        >

          <div class="section-title">

            <div>

              <span>

                NUEVA CATEGORÍA

              </span>

              <h3>

                Crear categoría

              </h3>

            </div>

          </div>


          <div class="field">

            <label
              for="category-name"
            >

              Nombre de la categoría

            </label>


            <input

              id="category-name"

              v-model="name"

              type="text"

              placeholder="Ej. Esferas personalizadas"

              autocomplete="off"

              maxlength="80"

              :disabled="loading"

            />


            <span

              v-if="error"

              class="field-error"

            >

              {{ error }}

            </span>

          </div>


          <button

            type="submit"

            class="save-button"

            :disabled="loading"

          >

            <span

              v-if="loading"

              class="button-spinner"

            ></span>


            <span v-if="loading">

              Creando...

            </span>


            <span v-else>

              Crear categoría

            </span>

          </button>

        </form>


        <!-- ================================= -->
        <!-- CATEGORÍAS EXISTENTES -->
        <!-- ================================= -->

        <div class="categories-section">


          <div class="section-title">

            <div>

              <span>

                CATEGORÍAS EXISTENTES

              </span>


              <h3>

                Gestionar categorías

              </h3>

            </div>


            <span class="category-count">

              {{ categories.length }}

            </span>

          </div>


          <!-- ================================= -->
          <!-- CARGANDO -->
          <!-- ================================= -->

          <div

            v-if="loadingCategories"

            class="categories-loading"

          >

            <span
              class="loading-spinner"
            ></span>

            <span>

              Cargando categorías...

            </span>

          </div>


          <!-- ================================= -->
          <!-- ERROR -->
          <!-- ================================= -->

          <div

            v-else-if="categoryError"

            class="category-error"

          >

            {{ categoryError }}

          </div>


          <!-- ================================= -->
          <!-- SIN CATEGORÍAS -->
          <!-- ================================= -->

          <div

            v-else-if="!categories.length"

            class="categories-empty"

          >

            <span class="empty-icon">

              ◇

            </span>


            <div>

              <strong>

                No hay categorías

              </strong>

              <p>

                Crea la primera categoría
                usando el formulario superior.

              </p>

            </div>

          </div>


          <!-- ================================= -->
          <!-- LISTA -->
          <!-- ================================= -->

          <div

            v-else

            class="categories-list"

          >

            <div

              v-for="category in categories"

              :key="category.id"

              class="category-item"

            >

              <div class="category-info">

                <div class="category-icon">

                  #

                </div>


                <div>

                  <strong>

                    {{ category.name }}

                  </strong>


                  <span>

                    /{{ category.slug }}

                  </span>

                </div>

              </div>


              <button

                type="button"

                class="delete-button"

                :disabled="
                  deletingId === category.id
                "

                :aria-label="
                  `Eliminar ${category.name}`
                "

                @click="
                  deleteCategory(
                    category.id,
                    category.name
                  )
                "

              >

                <span

                  v-if="
                    deletingId === category.id
                  "

                  class="button-spinner"

                ></span>


                <span v-else>

                  Eliminar

                </span>

              </button>

            </div>

          </div>

        </div>


        <!-- ================================= -->
        <!-- FOOTER -->
        <!-- ================================= -->

        <div class="category-form-footer">

          <button

            type="button"

            class="cancel-button"

            :disabled="loading"

            @click="close"

          >

            Cerrar

          </button>

        </div>


      </div>

    </div>

  </div>

</template>


<style scoped>

.category-form-overlay {

  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 24px;

  background: rgba(0,0,0,.68);

  backdrop-filter: blur(8px);

  overflow-y: auto;

}


.category-form {

  width: 100%;

  max-width: 620px;

  max-height: calc(100vh - 48px);

  display: flex;

  flex-direction: column;

  background: var(--surface);

  border: 1px solid var(--border);

  border-radius: 20px;

  box-shadow: 0 25px 70px rgba(0,0,0,.45);

  overflow: hidden;

}


.category-form-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;

  padding: 28px 30px 24px;

  border-bottom: 1px solid var(--border);

  flex-shrink: 0;

}


.category-eyebrow {

  display: block;

  margin-bottom: 8px;

  color: var(--primary);

  font-size: 10px;

  font-weight: 600;

  letter-spacing: .16em;

}


.category-form-header h2 {

  margin: 0;

  color: var(--text);

  font-family: var(--font-title), Georgia, serif;

  font-size: 32px;

  font-weight: 500;

  line-height: 1.1;

}


.category-form-header p {

  max-width: 420px;

  margin: 10px 0 0;

  color: var(--text-secondary);

  font-size: 13px;

  line-height: 1.6;

}


.close-button {

  flex-shrink: 0;

  width: 36px;

  height: 36px;

  border: 1px solid var(--border);

  border-radius: 10px;

  background: transparent;

  color: var(--text-secondary);

  font-size: 24px;

  line-height: 1;

  cursor: pointer;

  transition:
    color .2s ease,
    border-color .2s ease,
    background .2s ease;

}


.close-button:hover:not(:disabled) {

  color: var(--text);

  border-color: var(--primary);

  background: var(--surface-light);

}


.category-form-content {

  padding: 30px;

  overflow-y: auto;

}


.create-category {

  padding-bottom: 28px;

  border-bottom: 1px solid var(--border);

}


.section-title {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 20px;

}


.section-title span {

  display: block;

  margin-bottom: 5px;

  color: var(--primary);

  font-size: 9px;

  font-weight: 700;

  letter-spacing: .14em;

}


.section-title h3 {

  margin: 0;

  color: var(--text);

  font-size: 17px;

  font-weight: 600;

}


.field {

  display: flex;

  flex-direction: column;

  gap: 9px;

}


.field label {

  color: var(--text);

  font-size: 13px;

  font-weight: 600;

}


.field input {

  width: 100%;

  box-sizing: border-box;

  padding: 13px 14px;

  border: 1px solid var(--border);

  border-radius: 10px;

  outline: none;

  background: var(--background-secondary);

  color: var(--text);

  font-family: inherit;

  font-size: 14px;

  transition:
    border-color .2s ease,
    background .2s ease;

}


.field input::placeholder {

  color: var(--text-secondary);

  opacity: .6;

}


.field input:focus {

  border-color: var(--primary);

  background: var(--surface-light);

}


.field input:disabled {

  opacity: .6;

  cursor: not-allowed;

}


.field-error {

  color: #e88989;

  font-size: 12px;

}


.save-button {

  width: 100%;

  margin-top: 16px;

  min-height: 46px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  padding: 11px 18px;

  border: 1px solid transparent;

  border-radius: 10px;

  background: var(--primary);

  color: #070707;

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background .2s ease,
    transform .2s ease,
    opacity .2s ease;

}


.save-button:hover:not(:disabled) {

  background: var(--primary-hover);

  transform: translateY(-1px);

}


.save-button:disabled {

  opacity: .6;

  cursor: not-allowed;

  transform: none;

}


.categories-section {

  padding-top: 28px;

}


.category-count {

  min-width: 28px !important;

  height: 28px;

  display: flex !important;

  align-items: center;

  justify-content: center;

  margin: 0 !important;

  padding: 0 8px;

  border: 1px solid var(--border);

  border-radius: 999px;

  background: var(--surface-light);

  color: var(--text-secondary) !important;

  font-size: 11px !important;

  letter-spacing: 0 !important;

}


.categories-list {

  display: flex;

  flex-direction: column;

  gap: 8px;

}


.category-item {

  min-height: 60px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding: 10px 12px;

  border: 1px solid var(--border);

  border-radius: 12px;

  background: rgba(255,255,255,.02);

  transition:
    background .2s ease,
    border-color .2s ease;

}


.category-item:hover {

  background: rgba(255,255,255,.04);

  border-color: rgba(255,255,255,.12);

}


.category-info {

  min-width: 0;

  display: flex;

  align-items: center;

  gap: 12px;

}


.category-icon {

  flex-shrink: 0;

  width: 36px;

  height: 36px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid rgba(212,177,106,.25);

  border-radius: 10px;

  background: rgba(212,177,106,.08);

  color: var(--primary);

  font-size: 14px;

  font-weight: 700;

}


.category-info strong {

  display: block;

  color: var(--text);

  font-size: 13px;

  font-weight: 600;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

}


.category-info span {

  display: block;

  margin-top: 3px;

  color: var(--text-secondary);

  font-size: 11px;

}


.delete-button {

  flex-shrink: 0;

  min-width: 80px;

  min-height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  padding: 7px 10px;

  border: 1px solid rgba(220,90,90,.22);

  border-radius: 8px;

  background: rgba(220,90,90,.06);

  color: #e88989;

  font-family: inherit;

  font-size: 11px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background .2s ease,
    border-color .2s ease;

}


.delete-button:hover:not(:disabled) {

  background: rgba(220,90,90,.12);

  border-color: rgba(220,90,90,.40);

}


.delete-button:disabled {

  opacity: .5;

  cursor: not-allowed;

}


.categories-loading {

  min-height: 100px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  color: var(--text-secondary);

  font-size: 12px;

}


.loading-spinner,
.button-spinner {

  display: inline-block;

  border: 2px solid rgba(255,255,255,.15);

  border-top-color: currentColor;

  border-radius: 50%;

  animation: spin .7s linear infinite;

}


.loading-spinner {

  width: 18px;

  height: 18px;

}


.button-spinner {

  width: 13px;

  height: 13px;

}


.category-error {

  padding: 13px 15px;

  border: 1px solid rgba(220,90,90,.25);

  border-radius: 10px;

  background: rgba(220,90,90,.06);

  color: #e88989;

  font-size: 12px;

  line-height: 1.5;

}


.categories-empty {

  display: flex;

  align-items: center;

  gap: 14px;

  padding: 18px;

  border: 1px dashed var(--border);

  border-radius: 12px;

  color: var(--text-secondary);

}


.empty-icon {

  width: 38px;

  height: 38px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: var(--surface-light);

  color: var(--primary);

}


.categories-empty strong {

  display: block;

  margin-bottom: 4px;

  color: var(--text);

  font-size: 13px;

}


.categories-empty p {

  margin: 0;

  font-size: 11px;

  line-height: 1.5;

}


.category-form-footer {

  display: flex;

  justify-content: flex-end;

  margin-top: 24px;

  padding-top: 22px;

  border-top: 1px solid var(--border);

}


.cancel-button {

  padding: 10px 18px;

  border: 1px solid var(--border);

  border-radius: 9px;

  background: transparent;

  color: var(--text-secondary);

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    border-color .2s ease,
    color .2s ease,
    background .2s ease;

}


.cancel-button:hover:not(:disabled) {

  border-color: var(--text-secondary);

  color: var(--text);

  background: rgba(255,255,255,.03);

}


@keyframes spin {

  to {

    transform: rotate(360deg);

  }

}


@media (max-width: 600px) {

  .category-form-overlay {

    align-items: flex-start;

    padding: 12px;

  }


  .category-form {

    max-height: calc(100vh - 24px);

    border-radius: 16px;

  }


  .category-form-header {

    padding: 22px 18px 20px;

  }


  .category-form-header h2 {

    font-size: 27px;

  }


  .category-form-header p {

    font-size: 12px;

  }


  .category-form-content {

    padding: 20px 18px;

  }


  .category-info {

    min-width: 0;

  }


  .category-info > div:last-child {

    min-width: 0;

  }


  .delete-button {

    min-width: 34px;

    width: 34px;

    padding: 0;

  }


  .delete-button span:not(.button-spinner) {

    display: none;

  }


  .delete-button::before {

    content: "×";

    font-size: 18px;

    line-height: 1;

  }


  .category-form-footer {

    margin-top: 20px;

  }


  .cancel-button {

    width: 100%;

  }

}


@media (max-width: 380px) {

  .category-form-content {

    padding: 18px 14px;

  }


  .category-form-header {

    padding: 20px 14px;

  }


  .category-form-header h2 {

    font-size: 24px;

  }


  .category-form-header h2 {

    font-size: 24px;

  }


  .category-icon {

    width: 32px;

    height: 32px;

  }

}

</style>