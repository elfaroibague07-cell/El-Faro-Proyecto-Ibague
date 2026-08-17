<script setup lang="ts">

import { watch } from 'vue'
import { X } from 'lucide-vue-next'

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


/*================================*/
/* CARGAR PRODUCTO */
/*================================*/

watch(

  () => props.product,

  product => {

    resetForm()

    if (product) {

      fillForm(product)

    }

  },

  {
    immediate: true
  }

)


/*================================*/
/* GENERAR SLUG */
/*================================*/

watch(

  () => form.name,

  value => {

    updateSlug(value)

  }

)


/*================================*/
/* GUARDAR */
/*================================*/

async function submit() {

  saving.value = true

  try {

    await validate()

    await validateSlug(

      props.product?.id

    )

    await uploadImage()

    emit(

      'save',

      {
        ...form
      }

    )

  }

  catch (error) {

    alert(

      error instanceof Error

        ? error.message

        : 'Error inesperado.'

    )

  }

  finally {

    saving.value = false

  }

}

</script>


<template>

<Teleport to="body">

  <div
    v-if="open"
    class="overlay"
  >

    <div class="modal">


      <!-- ============================== -->
      <!-- HEADER -->
      <!-- ============================== -->

      <header>

        <h2>

          {{ product
            ? 'Editar producto'
            : 'Nuevo producto'
          }}

        </h2>

        <button
          type="button"
          @click="emit('close')"
        >

          <X :size="18" />

        </button>

      </header>


      <form
        @submit.prevent="submit"
      >


        <!-- ============================== -->
        <!-- INFORMACIÓN PRINCIPAL -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Nombre

          </label>

          <input
            v-model="form.name"
            required
          >

        </div>


        <div class="field">

          <label>

            Slug

          </label>

          <input
            v-model="form.slug"
            @input="slugEdited = true"
            required
          >

        </div>


        <!-- ============================== -->
        <!-- CATEGORÍA -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Categoría

          </label>

          <select
            v-model="form.category_id"
            required
          >

            <option
              value=""
              disabled
            >

              Selecciona una categoría

            </option>


            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >

              {{ category.name }}

            </option>

          </select>


          <small
            v-if="!categories.length"
            class="field-hint"
          >

            No hay categorías creadas.
            Crea una categoría antes de registrar
            productos.

          </small>

        </div>


        <!-- ============================== -->
        <!-- DESCRIPCIÓN CORTA -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Descripción corta

          </label>

          <textarea
            v-model="form.description"
            rows="3"
          />

        </div>


        <!-- ============================== -->
        <!-- DESCRIPCIÓN COMPLETA -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Descripción completa

          </label>

          <textarea
            v-model="form.long_description"
            rows="6"
          />

        </div>


        <!-- ============================== -->
        <!-- ESPECIFICACIONES -->
        <!-- ============================== -->

        <div class="grid">


          <div class="field">

            <label>

              Material

            </label>

            <input
              v-model="form.material"
              placeholder="Cristal K9"
            >

          </div>


          <div class="field">

            <label>

              Tamaño

            </label>

            <input
              v-model="form.size"
              placeholder="8 cm"
            >

          </div>


        </div>


        <!-- ============================== -->
        <!-- PRECIO -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Precio

          </label>

          <input
            v-model.number="form.price"
            type="number"
            min="1"
            required
          >

        </div>


        <!-- ============================== -->
        <!-- IMAGEN -->
        <!-- ============================== -->

        <div class="field">

          <label>

            Imagen

          </label>

          <input
            type="file"
            accept="image/*"
            @change="onImageSelected"
          >

        </div>


        <!-- ============================== -->
        <!-- PREVISUALIZACIÓN -->
        <!-- ============================== -->

        <div
          v-if="previewImage"
          class="preview"
        >

          <img
            :src="previewImage"
            :alt="form.name"
          >

        </div>


        <!-- ============================== -->
        <!-- ESTADO DESTACADO -->
        <!-- ============================== -->

        <label class="checkbox">

          <input
            v-model="form.featured"
            type="checkbox"
          >

          Producto destacado

        </label>


        <!-- ============================== -->
        <!-- ESTADO ACTIVO -->
        <!-- ============================== -->

        <label class="checkbox">

          <input
            v-model="form.active"
            type="checkbox"
          >

          Producto activo

        </label>


        <!-- ============================== -->
        <!-- ACCIONES -->
        <!-- ============================== -->

        <div class="actions">

          <button
            type="button"
            class="secondary"
            @click="emit('close')"
          >

            Cancelar

          </button>


          <button
            class="primary"
            type="submit"
            :disabled="
              saving ||
              !categories.length
            "
          >

            {{ saving
              ? 'Guardando...'
              : product
                ? 'Actualizar'
                : 'Guardar'
            }}

          </button>

        </div>


      </form>

    </div>

  </div>

</Teleport>

</template>


<style scoped>

.overlay{

position:fixed;

inset:0;

display:flex;

justify-content:center;

align-items:center;

padding:24px;

background:rgba(0,0,0,.65);

backdrop-filter:blur(6px);

z-index:9999;

}


.modal{

width:680px;

max-width:100%;

max-height:92vh;

overflow-y:auto;

padding:32px;

border-radius:22px;

background:var(--surface);

border:1px solid var(--border);

box-shadow:0 20px 60px rgba(0,0,0,.25);

}


header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:28px;

}


header h2{

font-size:1.45rem;

font-weight:700;

}


header button{

display:flex;

align-items:center;

justify-content:center;

background:none;

border:none;

cursor:pointer;

color:inherit;

}


.field{

display:flex;

flex-direction:column;

gap:8px;

margin-bottom:20px;

}


.field label{

font-weight:600;

font-size:.95rem;

}


.grid{

display:grid;

grid-template-columns:repeat(2,1fr);

gap:18px;

}


input,
textarea,
select{

width:100%;

padding:14px;

border-radius:14px;

border:1px solid var(--border);

background:transparent;

font:inherit;

transition:.25s;

color:var(--text);

}


select{

cursor:pointer;

}


select option{

background:var(--surface);

color:var(--text);

}


input:focus,
textarea:focus,
select:focus{

outline:none;

border-color:var(--primary);

}


textarea{

resize:vertical;

min-height:120px;

}


.field-hint{

font-size:.8rem;

color:var(--text-secondary);

line-height:1.5;

}


.preview{

display:flex;

justify-content:center;

margin-bottom:24px;

}


.preview img{

width:180px;

height:180px;

object-fit:cover;

border-radius:18px;

border:1px solid var(--border);

}


.checkbox{

display:flex;

align-items:center;

gap:10px;

margin-bottom:16px;

cursor:pointer;

}


.checkbox input{

width:auto;

}


.actions{

display:flex;

justify-content:flex-end;

gap:14px;

margin-top:30px;

}


.primary,
.secondary{

padding:14px 24px;

border-radius:14px;

font-weight:600;

cursor:pointer;

transition:.25s;

}


.primary{

border:none;

background:var(--primary);

color:white;

}


.primary:hover:not(:disabled){

transform:translateY(-2px);

}


.primary:disabled{

opacity:.6;

cursor:not-allowed;

}


.secondary{

background:transparent;

border:1px solid var(--border);

color:var(--text);

}


.secondary:hover{

background:rgba(255,255,255,.04);

}


@media(max-width:700px){

.modal{

padding:22px;

}


.grid{

grid-template-columns:1fr;

}


.preview img{

width:150px;

height:150px;

}


.actions{

flex-direction:column;

}


.actions button{

width:100%;

}

}

</style>