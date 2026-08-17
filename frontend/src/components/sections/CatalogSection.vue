<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  ref,
  watch
} from 'vue'

import { useProductStore } from '../../stores/product.store'
import { useCategoryStore } from '../../stores/category.store'

import FadeSection from '../ui/FadeSection.vue'
import CatalogHeader from '../catalog/CatalogHeader.vue'
import ProductGrid from '../catalog/ProductGrid.vue'
import ProductSkeleton from '../catalog/ProductSkeleton.vue'

/* =========================================
   STORES
========================================= */

const store = useProductStore()
const categoryStore = useCategoryStore()

/* =========================================
   FILTROS
========================================= */

const selectedCategory = ref<string | null>(null)

const selectedMinPrice = ref<number | null>(null)

const selectedMaxPrice = ref<number | null>(null)

/* =========================================
   SCROLL CATEGORÍAS
========================================= */

const categoryScroller = ref<HTMLElement | null>(null)

const canScrollLeft = ref(false)
const canScrollRight = ref(false)

/* =========================================
   PAGINACIÓN
========================================= */

const currentPage = ref(1)

const productsPerPage = 6

/* =========================================
   PRODUCTOS ACTIVOS
========================================= */

const activeProducts = computed(() => {
  return store.activeProducts ?? []
})

/* =========================================
   PRECIO MÍNIMO REAL
========================================= */

const minimumProductPrice = computed(() => {
  if (!activeProducts.value.length) {
    return 0
  }

  return Math.min(
    ...activeProducts.value.map(product =>
      Number(product.price)
    )
  )
})

/* =========================================
   PRECIO MÁXIMO REAL
========================================= */

const maximumProductPrice = computed(() => {
  if (!activeProducts.value.length) {
    return 0
  }

  return Math.max(
    ...activeProducts.value.map(product =>
      Number(product.price)
    )
  )
})

/* =========================================
   PRECIO MÍNIMO EFECTIVO
========================================= */

const effectiveMinPrice = computed(() => {
  return (
    selectedMinPrice.value ??
    minimumProductPrice.value
  )
})

/* =========================================
   PRECIO MÁXIMO EFECTIVO
========================================= */

const effectiveMaxPrice = computed(() => {
  return (
    selectedMaxPrice.value ??
    maximumProductPrice.value
  )
})

/* =========================================
   POSICIÓN SLIDER MÍNIMO
========================================= */

const minSliderPosition = computed(() => {
  const min = minimumProductPrice.value
  const max = maximumProductPrice.value

  if (max <= min) {
    return 0
  }

  return (
    (
      effectiveMinPrice.value - min
    ) /
    (
      max - min
    )
  ) * 100
})

/* =========================================
   POSICIÓN SLIDER MÁXIMO
========================================= */

const maxSliderPosition = computed(() => {
  const min = minimumProductPrice.value
  const max = maximumProductPrice.value

  if (max <= min) {
    return 100
  }

  return (
    (
      effectiveMaxPrice.value - min
    ) /
    (
      max - min
    )
  ) * 100
})

/* =========================================
   PRODUCTOS FILTRADOS
========================================= */

const availableProducts = computed(() => {
  let products = activeProducts.value

  if (selectedCategory.value) {
    products = products.filter(
      product =>
        product.category_id ===
        selectedCategory.value
    )
  }

  products = products.filter(product => {
    const price = Number(product.price)

    return (
      price >= effectiveMinPrice.value &&
      price <= effectiveMaxPrice.value
    )
  })

  return products
})

/* =========================================
   TOTAL PÁGINAS
========================================= */

const totalPages = computed(() => {
  return Math.ceil(
    availableProducts.value.length /
    productsPerPage
  )
})

/* =========================================
   PRODUCTOS PAGINADOS
========================================= */

const paginatedProducts = computed(() => {
  const start =
    (currentPage.value - 1) *
    productsPerPage

  const end =
    start +
    productsPerPage

  return availableProducts.value.slice(
    start,
    end
  )
})

/* =========================================
   FILTRO PRECIO ACTIVO
========================================= */

const hasPriceFilter = computed(() => {
  return (
    selectedMinPrice.value !== null ||
    selectedMaxPrice.value !== null
  )
})

/* =========================================
   FILTROS ACTIVOS
========================================= */

const hasActiveFilters = computed(() => {
  return (
    selectedCategory.value !== null ||
    hasPriceFilter.value
  )
})

/* =========================================
   FORMATEAR PRECIO
========================================= */

function formatPrice(price: number) {
  return new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }
  ).format(price)
}

/* =========================================
   CAMBIAR CATEGORÍA
========================================= */

function changeCategory(
  categoryId: string | null
) {
  selectedCategory.value = categoryId
  currentPage.value = 1
}

/* =========================================
   CAMBIAR PRECIO MÍNIMO
========================================= */

function changeMinPrice(event: Event) {
  const target =
    event.target as HTMLInputElement

  const value = Number(target.value)

  const max = effectiveMaxPrice.value

  const newMin = Math.min(value, max)

  if (
    newMin <=
    minimumProductPrice.value
  ) {
    selectedMinPrice.value = null
  } else {
    selectedMinPrice.value = newMin
  }

  currentPage.value = 1
}

/* =========================================
   CAMBIAR PRECIO MÁXIMO
========================================= */

function changeMaxPrice(event: Event) {
  const target =
    event.target as HTMLInputElement

  const value = Number(target.value)

  const min = effectiveMinPrice.value

  const newMax = Math.max(value, min)

  if (
    newMax >=
    maximumProductPrice.value
  ) {
    selectedMaxPrice.value = null
  } else {
    selectedMaxPrice.value = newMax
  }

  currentPage.value = 1
}

/* =========================================
   LIMPIAR PRECIO
========================================= */

function clearPriceFilter() {
  selectedMinPrice.value = null
  selectedMaxPrice.value = null

  currentPage.value = 1
}

/* =========================================
   LIMPIAR TODOS LOS FILTROS
========================================= */

function clearAllFilters() {
  selectedCategory.value = null
  selectedMinPrice.value = null
  selectedMaxPrice.value = null

  currentPage.value = 1
}

/* =========================================
   CAMBIAR PÁGINA
========================================= */

function changePage(page: number) {
  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return
  }

  currentPage.value = page

  document
    .getElementById('catalog')
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
}

/* =========================================
   ACTUALIZAR SCROLL CATEGORÍAS
========================================= */

function updateCategoryScroll() {
  const element =
    categoryScroller.value

  if (!element) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  const maxScroll =
    element.scrollWidth -
    element.clientWidth

  canScrollLeft.value =
    element.scrollLeft > 2

  canScrollRight.value =
    element.scrollLeft <
    maxScroll - 2
}

/* =========================================
   SCROLL CATEGORÍAS
========================================= */

function scrollCategories(
  direction: 'left' | 'right'
) {
  const element =
    categoryScroller.value

  if (!element) {
    return
  }

  const amount =
    Math.max(
      element.clientWidth * 0.7,
      240
    )

  element.scrollBy({
    left:
      direction === 'right'
        ? amount
        : -amount,
    behavior: 'smooth'
  })

  setTimeout(
    updateCategoryScroll,
    350
  )
}

/* =========================================
   SCROLL CATEGORÍA ACTIVA
========================================= */

async function scrollActiveCategoryIntoView() {
  await nextTick()

  const element =
    categoryScroller.value

  if (!element) {
    return
  }

  const activeButton =
    element.querySelector(
      '.category-button.active'
    ) as HTMLElement | null

  if (!activeButton) {
    return
  }

  activeButton.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  })

  setTimeout(
    updateCategoryScroll,
    350
  )
}

/* =========================================
   CARGAR INFORMACIÓN
========================================= */

onMounted(async () => {
  await Promise.all([
    store.loadProducts(),
    categoryStore.loadCategories()
  ])

  currentPage.value = 1

  await nextTick()

  updateCategoryScroll()

  window.addEventListener(
    'resize',
    updateCategoryScroll
  )
})

/* =========================================
   LIMPIAR EVENTOS
========================================= */

onBeforeUnmount(() => {
  window.removeEventListener(
    'resize',
    updateCategoryScroll
  )
})

/* =========================================
   OBSERVAR CATEGORÍAS
========================================= */

watch(
  () => categoryStore.categories.length,
  async () => {
    await nextTick()
    updateCategoryScroll()
  }
)

/* =========================================
   OBSERVAR PRODUCTOS FILTRADOS
========================================= */

watch(
  availableProducts,
  () => {
    if (
      totalPages.value > 0 &&
      currentPage.value >
        totalPages.value
    ) {
      currentPage.value =
        totalPages.value
    }

    if (totalPages.value === 0) {
      currentPage.value = 1
    }
  }
)

/* =========================================
   OBSERVAR CATEGORÍA
========================================= */

watch(
  selectedCategory,
  async () => {
    await scrollActiveCategoryIntoView()
  }
)

/* =========================================
   OBSERVAR RANGO DE PRECIOS
========================================= */

watch(
  [
    minimumProductPrice,
    maximumProductPrice
  ],
  () => {
    const min =
      minimumProductPrice.value

    const max =
      maximumProductPrice.value

    if (
      selectedMinPrice.value !== null &&
      (
        selectedMinPrice.value < min ||
        selectedMinPrice.value > max
      )
    ) {
      selectedMinPrice.value = null
    }

    if (
      selectedMaxPrice.value !== null &&
      (
        selectedMaxPrice.value > max ||
        selectedMaxPrice.value < min
      )
    ) {
      selectedMaxPrice.value = null
    }

    currentPage.value = 1
  }
)
</script>

<template>
  <FadeSection>
    <section
      id="catalog"
      class="section"
    >
      <div
        class="container catalog-container"
      >

        <!-- =========================================
             HEADER
        ========================================== -->

        <CatalogHeader />

        <!-- =========================================
             FILTROS
        ========================================== -->

        <div class="catalog-filters">

          <!-- =======================================
               CATEGORÍAS
          ======================================== -->

          <div
            v-if="
              categoryStore.categories.length
            "
            class="category-filter-wrapper"
          >

            <button
              v-if="canScrollLeft"
              type="button"
              class="category-scroll-button left"
              aria-label="Ver categorías anteriores"
              @click="
                scrollCategories('left')
              "
            >
              ←
            </button>

            <div
              ref="categoryScroller"
              class="category-filter"
              @scroll="
                updateCategoryScroll
              "
            >

              <button
                type="button"
                class="category-button"
                :class="{
                  active:
                    selectedCategory === null
                }"
                @click="
                  changeCategory(null)
                "
              >
                Todas
              </button>

              <button
                v-for="
                  category in
                    categoryStore.categories
                "
                :key="category.id"
                type="button"
                class="category-button"
                :class="{
                  active:
                    selectedCategory ===
                    category.id
                }"
                @click="
                  changeCategory(
                    category.id
                  )
                "
              >
                {{ category.name }}
              </button>

            </div>

            <button
              v-if="canScrollRight"
              type="button"
              class="category-scroll-button right"
              aria-label="Ver más categorías"
              @click="
                scrollCategories('right')
              "
            >
              →
            </button>

          </div>

          <!-- =========================================
               FILTRO PRECIO
          ========================================== -->

          <div
            v-if="
              activeProducts.length &&
              maximumProductPrice >
              minimumProductPrice
            "
            class="price-filter"
          >

            <div class="price-filter-header">

              <div class="price-filter-label">
                <span class="price-filter-icon">
                  $
                </span>

                <span>
                  Precio
                </span>
              </div>

              <span
                class="price-range-text"
              >
                {{
                  formatPrice(
                    effectiveMinPrice
                  )
                }}

                <span class="price-separator">
                  —
                </span>

                {{
                  formatPrice(
                    effectiveMaxPrice
                  )
                }}
              </span>

              <button
                v-if="hasPriceFilter"
                type="button"
                class="clear-price-button"
                @click="
                  clearPriceFilter
                "
              >
                Limpiar
              </button>

            </div>

            <div
              class="price-slider-container"
            >

              <div
                class="price-slider-track"
              >
                <div
                  class="price-slider-selected"
                  :style="{
                    left:
                      `${minSliderPosition}%`,
                    right:
                      `${100 - maxSliderPosition}%`
                  }"
                ></div>
              </div>

              <input
                type="range"
                class="price-range price-range-min"
                :min="
                  minimumProductPrice
                "
                :max="
                  maximumProductPrice
                "
                :value="
                  effectiveMinPrice
                "
                :step="1000"
                aria-label="Precio mínimo"
                @input="
                  changeMinPrice
                "
              />

              <input
                type="range"
                class="price-range price-range-max"
                :min="
                  minimumProductPrice
                "
                :max="
                  maximumProductPrice
                "
                :value="
                  effectiveMaxPrice
                "
                :step="1000"
                aria-label="Precio máximo"
                @input="
                  changeMaxPrice
                "
              />

            </div>

          </div>

        </div>

        <!-- =========================================
             LOADING
        ========================================== -->

        <div
          v-if="
            store.loading ||
            categoryStore.loading
          "
          class="catalog-loading"
        >
          <ProductSkeleton
            v-for="
              n in productsPerPage
            "
            :key="n"
          />
        </div>

        <!-- =========================================
             CONTENIDO
        ========================================== -->

        <template v-else>

          <!-- =======================================
               SIN RESULTADOS
          ======================================== -->

          <div
            v-if="
              !availableProducts.length
            "
            class="empty-products"
          >

            <div
              class="empty-products-icon"
            >
              ◇
            </div>

            <div>
              <h3>
                No encontramos productos
              </h3>

              <p>
                Prueba cambiando la categoría
                o ajustando el rango de precio.
              </p>
            </div>

            <button
              v-if="hasActiveFilters"
              type="button"
              class="empty-clear-button"
              @click="
                clearAllFilters
              "
            >
              Limpiar filtros
            </button>

          </div>

          <!-- =======================================
               PRODUCTOS
          ======================================== -->

          <template v-else>

            <ProductGrid
              :products="
                paginatedProducts
              "
            />

            <!-- =====================================
                 PAGINACIÓN
            ====================================== -->

            <div
              v-if="totalPages > 1"
              class="pagination"
              aria-label="Paginación del catálogo"
            >

              <button
                type="button"
                class="pagination-button arrow"
                :disabled="
                  currentPage === 1
                "
                aria-label="Página anterior"
                @click="
                  changePage(
                    currentPage - 1
                  )
                "
              >
                ←
              </button>

              <div
                class="pagination-pages"
              >

                <button
                  v-for="
                    page in totalPages
                  "
                  :key="page"
                  type="button"
                  class="pagination-button"
                  :class="{
                    active:
                      currentPage === page
                  }"
                  :aria-current="
                    currentPage === page
                      ? 'page'
                      : undefined
                  "
                  :aria-label="
                    `Ir a la página ${page}`
                  "
                  @click="
                    changePage(page)
                  "
                >
                  {{ page }}
                </button>

              </div>

              <button
                type="button"
                class="pagination-button arrow"
                :disabled="
                  currentPage ===
                  totalPages
                "
                aria-label="Página siguiente"
                @click="
                  changePage(
                    currentPage + 1
                  )
                "
              >
                →
              </button>

            </div>

          </template>

        </template>

      </div>
    </section>
  </FadeSection>
</template>

<style scoped>

/* =========================================
   SECCIÓN
========================================= */

.section {
  position: relative;
  padding: 9rem 0;
  overflow: hidden;
}

/* =========================================
   CONTENEDOR
========================================= */

.catalog-container {
  position: relative;
  z-index: 2;
}

/* =========================================
   FILTROS
========================================= */

.catalog-filters {
  width: min(1120px, 100%);
  margin: 0 auto 3rem;
}

/* =========================================
   CATEGORÍAS
========================================= */

.category-filter-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.category-filter {
  width: 100%;

  display: flex;
  align-items: center;

  gap: 10px;

  overflow-x: auto;
  overflow-y: hidden;

  padding: 5px 4px 10px;

  scroll-behavior: smooth;

  scrollbar-width: none;
}

.category-filter::-webkit-scrollbar {
  display: none;
}

/* =========================================
   BOTONES CATEGORÍA
========================================= */

.category-button {
  flex: 0 0 auto;

  padding: 10px 18px;

  border: 1px solid
    rgba(255, 255, 255, .10);

  border-radius: 999px;

  background:
    rgba(255, 255, 255, .025);

  color: var(--text-secondary);

  font-family: var(--font-body);

  font-size: .82rem;

  font-weight: 500;

  white-space: nowrap;

  cursor: pointer;

  transition:
    background .25s ease,
    color .25s ease,
    border-color .25s ease,
    transform .25s ease,
    box-shadow .25s ease;
}

.category-button:hover {
  color: white;

  border-color:
    rgba(255, 255, 255, .22);

  background:
    rgba(255, 255, 255, .07);

  transform:
    translateY(-1px);
}

.category-button.active {
  background:
    var(--primary);

  color: #050505;

  border-color:
    var(--primary);

  font-weight: 600;

  box-shadow:
    0 5px 16px
    rgba(212, 177, 106, .12);
}

/* =========================================
   BOTONES SCROLL
========================================= */

.category-scroll-button {
  position: absolute;

  z-index: 5;

  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
    rgba(255, 255, 255, .14);

  border-radius: 50%;

  background:
    rgba(7, 11, 20, .92);

  backdrop-filter:
    blur(10px);

  color: var(--text);

  font-size: 1rem;

  cursor: pointer;

  box-shadow:
    0 8px 25px
    rgba(0, 0, 0, .30);

  transition:
    background .25s ease,
    border-color .25s ease,
    color .25s ease,
    transform .25s ease;
}

.category-scroll-button:hover {
  background:
    var(--primary);

  border-color:
    var(--primary);

  color: #050505;

  transform:
    scale(1.05);
}

.category-scroll-button.left {
  left: 0;
}

.category-scroll-button.right {
  right: 0;
}

/* =========================================
   SOMBRAS CATEGORÍAS
========================================= */

.category-filter-wrapper::before,
.category-filter-wrapper::after {
  content: '';

  position: absolute;

  top: 0;
  bottom: 5px;

  width: 50px;

  z-index: 3;

  pointer-events: none;
}

.category-filter-wrapper::before {
  left: 0;

  background:
    linear-gradient(
      to right,
      var(--background),
      transparent
    );
}

.category-filter-wrapper::after {
  right: 0;

  background:
    linear-gradient(
      to left,
      var(--background),
      transparent
    );
}

/* =========================================
   FILTRO PRECIO
========================================= */

.price-filter {
  width: 100%;

  padding:
    14px 18px
    16px;

  box-sizing: border-box;

  border:
    1px solid
    rgba(255, 255, 255, .07);

  border-radius: 12px;

  background:
    rgba(255, 255, 255, .018);
}

/* =========================================
   HEADER PRECIO
========================================= */

.price-filter-header {
  display: flex;

  align-items: center;

  gap: 14px;

  min-height: 30px;

  margin-bottom: 8px;
}

.price-filter-label {
  display: flex;

  align-items: center;

  gap: 8px;

  color: var(--text);

  font-family: var(--font-body);

  font-size: .82rem;

  font-weight: 600;

  white-space: nowrap;
}

.price-filter-icon {
  width: 22px;
  height: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  background:
    rgba(212, 177, 106, .12);

  color:
    var(--primary);

  font-size: .72rem;

  font-weight: 700;
}

.price-range-text {
  margin-left: auto;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size: .78rem;

  font-weight: 500;

  white-space: nowrap;
}

.price-separator {
  margin:
    0 4px;

  color:
    rgba(255, 255, 255, .30);
}

/* =========================================
   LIMPIAR PRECIO
========================================= */

.clear-price-button {
  padding:
    5px 10px;

  border:
    1px solid
    rgba(255, 255, 255, .10);

  border-radius: 6px;

  background:
    transparent;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size: .70rem;

  cursor: pointer;

  transition:
    color .2s ease,
    border-color .2s ease,
    background .2s ease;
}

.clear-price-button:hover {
  color:
    var(--text);

  border-color:
    var(--primary);

  background:
    rgba(212, 177, 106, .06);
}

/* =========================================
   SLIDER
========================================= */

.price-slider-container {
  position: relative;

  width: 100%;

  height: 24px;
}

.price-slider-track {
  position: absolute;

  top: 50%;

  left: 0;
  right: 0;

  height: 5px;

  transform:
    translateY(-50%);

  border-radius:
    999px;

  background:
    rgba(255, 255, 255, .09);
}

.price-slider-selected {
  position: absolute;

  top: 0;
  bottom: 0;

  border-radius:
    999px;

  background:
    var(--primary);
}

.price-range {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;

  height: 24px;

  margin: 0;

  appearance: none;
  -webkit-appearance: none;

  background: transparent;

  pointer-events: none;

  outline: none;
}

.price-range::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;

  width: 21px;
  height: 21px;

  border:
    2px solid
    var(--background);

  border-radius: 50%;

  background:
    var(--primary);

  box-shadow:
    0 2px 8px
    rgba(0, 0, 0, .30);

  cursor: grab;

  pointer-events: auto;
}

.price-range::-webkit-slider-thumb:active {
  cursor: grabbing;
}

.price-range::-moz-range-thumb {
  width: 21px;
  height: 21px;

  border:
    2px solid
    var(--background);

  border-radius: 50%;

  background:
    var(--primary);

  box-shadow:
    0 2px 8px
    rgba(0, 0, 0, .30);

  cursor: grab;

  pointer-events: auto;
}

.price-range::-moz-range-track {
  background: transparent;
}

.price-range-min {
  z-index: 2;
}

.price-range-max {
  z-index: 3;
}

/* =========================================
   LOADING
========================================= */

.catalog-loading {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 28px;

  width: min(1120px, 100%);

  margin: 0 auto;
}

/* =========================================
   SIN RESULTADOS
========================================= */

.empty-products {
  width: min(600px, 100%);

  margin: 3rem auto 0;

  padding:
    40px 30px;

  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;

  border:
    1px dashed
    var(--border);

  border-radius: 16px;

  background:
    rgba(255, 255, 255, .02);
}

.empty-products-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 15px;

  border-radius: 14px;

  background:
    var(--surface-light);

  color:
    var(--primary);

  font-size: 20px;
}

.empty-products h3 {
  margin: 0;

  color:
    var(--text);

  font-family:
    var(--font-title);

  font-size: 24px;

  font-weight: 500;
}

.empty-products p {
  margin:
    7px 0 18px;

  color:
    var(--text-secondary);

  font-size: 12px;

  line-height: 1.5;
}

.empty-clear-button {
  padding:
    9px 15px;

  border:
    1px solid
    var(--border);

  border-radius: 9px;

  background:
    transparent;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size: .75rem;

  cursor: pointer;

  transition:
    all .2s ease;
}

.empty-clear-button:hover {
  color: #050505;

  border-color:
    var(--primary);

  background:
    var(--primary);
}

/* =========================================
   PAGINACIÓN
========================================= */

.pagination {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 12px;

  width: min(1120px, 100%);

  margin:
    4rem auto 0;

  padding-top:
    2rem;

  border-top:
    1px solid
    rgba(255, 255, 255, .06);
}

.pagination-pages {
  display: flex;

  align-items: center;

  gap: 8px;
}

.pagination-button {
  width: 44px;
  height: 44px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 12px;

  border:
    1px solid
    rgba(255, 255, 255, .10);

  background:
    rgba(255, 255, 255, .025);

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size: .95rem;

  font-weight: 500;

  cursor: pointer;

  transition:
    background .25s ease,
    color .25s ease,
    border-color .25s ease,
    transform .25s ease,
    box-shadow .25s ease;
}

.pagination-button:hover:not(:disabled) {
  background:
    rgba(255, 255, 255, .08);

  color: white;

  border-color:
    rgba(255, 255, 255, .20);

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 24px
    rgba(0, 0, 0, .25);
}

.pagination-button.active {
  background:
    rgba(255, 255, 255, .92);

  color: #050505;

  border-color:
    rgba(255, 255, 255, .95);

  box-shadow:
    0 8px 25px
    rgba(255, 255, 255, .10);
}

.pagination-button.arrow {
  font-size: 1.25rem;
  font-weight: 400;
}

.pagination-button:disabled {
  opacity: .25;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}

/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .catalog-loading {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}

/* =========================================
   TABLET PEQUEÑA
========================================= */

@media (max-width: 800px) {

  .category-scroll-button {
    display: none;
  }

  .category-filter-wrapper::before,
  .category-filter-wrapper::after {
    display: none;
  }

  .category-filter {
    padding-left: 2px;
    padding-right: 2px;
  }

}

/* =========================================
   MÓVIL
========================================= */

@media (max-width: 700px) {

  .section {
    padding:
      7rem 0;
  }

  .catalog-filters {
    margin-bottom:
      2.5rem;
  }

  .category-filter-wrapper {
    margin-bottom:
      14px;
  }

  .category-filter {
    gap: 8px;

    padding:
      4px 2px 8px;
  }

  .category-button {
    padding:
      9px 15px;

    font-size:
      .80rem;
  }

  /* -----------------------------
     PRECIO
  ----------------------------- */

  .price-filter {
    padding:
      13px 14px 14px;
  }

  .price-filter-header {
    flex-wrap: wrap;

    gap: 8px;
  }

  .price-range-text {
    margin-left: auto;

    font-size:
      .72rem;
  }

  .clear-price-button {
    order: 3;

    width: 100%;

    text-align: center;
  }

  .price-slider-container {
    margin-top:
      4px;
  }

  /* -----------------------------
     LOADING
  ----------------------------- */

  .catalog-loading {
    grid-template-columns:
      1fr;

    gap: 24px;
  }

  /* -----------------------------
     PAGINACIÓN
  ----------------------------- */

  .pagination {
    gap: 8px;

    margin-top:
      3rem;
  }

  .pagination-pages {
    gap: 5px;
  }

  .pagination-button {
    width: 40px;
    height: 40px;

    border-radius:
      10px;
  }

}

/* =========================================
   MÓVIL PEQUEÑO
========================================= */

@media (max-width: 420px) {

  .category-filter {
    gap: 7px;
  }

  .category-button {
    padding:
      8px 13px;
  }

  .price-range-text {
    font-size:
      .68rem;
  }

}
</style>