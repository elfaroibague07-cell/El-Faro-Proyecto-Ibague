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
   ESTADOS DE LOS DROPDOWNS (ESTILO ZARA/E-COMMERCE)
========================================= */

const activeDropdown = ref<'price' | 'category' | null>(null)

function toggleDropdown(dropdown: 'price' | 'category') {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

function closeDropdowns(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.filter-dropdown-container')) {
    activeDropdown.value = null
  }
}

/* =========================================
   SCROLL CATEGORÍAS (DENTRO DEL DROPDOWN)
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
   PRECIOS MÍNIMOS Y MÁXIMOS REALES
========================================= */

const minimumProductPrice = computed(() => {
  if (!activeProducts.value.length) return 0
  return Math.min(...activeProducts.value.map(p => Number(p.price)))
})

const maximumProductPrice = computed(() => {
  if (!activeProducts.value.length) return 0
  return Math.max(...activeProducts.value.map(p => Number(p.price)))
})

const effectiveMinPrice = computed(() => {
  return selectedMinPrice.value ?? minimumProductPrice.value
})

const effectiveMaxPrice = computed(() => {
  return selectedMaxPrice.value ?? maximumProductPrice.value
})

/* =========================================
   POSICIÓN SLIDERS
========================================= */

const minSliderPosition = computed(() => {
  const min = minimumProductPrice.value
  const max = maximumProductPrice.value
  if (max <= min) return 0
  return ((effectiveMinPrice.value - min) / (max - min)) * 100
})

const maxSliderPosition = computed(() => {
  const min = minimumProductPrice.value
  const max = maximumProductPrice.value
  if (max <= min) return 100
  return ((effectiveMaxPrice.value - min) / (max - min)) * 100
})

/* =========================================
   PRODUCTOS FILTRADOS
========================================= */

const availableProducts = computed(() => {
  let products = activeProducts.value

  if (selectedCategory.value) {
    products = products.filter(p => p.category_id === selectedCategory.value)
  }

  products = products.filter(p => {
    const price = Number(p.price)
    return price >= effectiveMinPrice.value && price <= effectiveMaxPrice.value
  })

  return products
})

const totalPages = computed(() => {
  return Math.ceil(availableProducts.value.length / productsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  const end = start + productsPerPage
  return availableProducts.value.slice(start, end)
})

const hasPriceFilter = computed(() => {
  return selectedMinPrice.value !== null || selectedMaxPrice.value !== null
})

const hasActiveFilters = computed(() => {
  return selectedCategory.value !== null || hasPriceFilter.value
})

/* =========================================
   UTILIDADES Y LABELS
========================================= */

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price)
}

const currentCategoryName = computed(() => {
  if (selectedCategory.value === null) return 'Todas las categorias'
  const found = categoryStore.categories.find(c => c.id === selectedCategory.value)
  return found ? found.name : 'Categoría'
})

function changeCategory(categoryId: string | null) {
  selectedCategory.value = categoryId
  currentPage.value = 1
  activeDropdown.value = null
}

function changeMinPrice(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  const maxLimit = effectiveMaxPrice.value
  const newMin = Math.min(value, maxLimit - 1000)

  selectedMinPrice.value = newMin <= minimumProductPrice.value ? null : newMin
  currentPage.value = 1
}

function changeMaxPrice(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  const minLimit = effectiveMinPrice.value
  const newMax = Math.max(value, minLimit + 1000)

  selectedMaxPrice.value = newMax >= maximumProductPrice.value ? null : newMax
  currentPage.value = 1
}

function clearPriceFilter() {
  selectedMinPrice.value = null
  selectedMaxPrice.value = null
  currentPage.value = 1
}

function clearAllFilters() {
  selectedCategory.value = null
  selectedMinPrice.value = null
  selectedMaxPrice.value = null
  currentPage.value = 1
  activeDropdown.value = null
}

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateCategoryScroll() {
  const element = categoryScroller.value
  if (!element) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }
  const maxScroll = element.scrollWidth - element.clientWidth
  canScrollLeft.value = element.scrollLeft > 2
  canScrollRight.value = element.scrollLeft < maxScroll - 2
}

function scrollCategories(direction: 'left' | 'right') {
  const element = categoryScroller.value
  if (!element) return
  const amount = Math.max(element.clientWidth * 0.7, 240)
  element.scrollBy({
    left: direction === 'right' ? amount : -amount,
    behavior: 'smooth'
  })
  setTimeout(updateCategoryScroll, 350)
}

onMounted(async () => {
  await Promise.all([store.loadProducts(), categoryStore.loadCategories()])
  currentPage.value = 1
  document.addEventListener('click', closeDropdowns)
  await nextTick()
  updateCategoryScroll()
  window.addEventListener('resize', updateCategoryScroll)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdowns)
  window.removeEventListener('resize', updateCategoryScroll)
})

watch(() => categoryStore.categories.length, async () => {
  await nextTick()
  updateCategoryScroll()
})

watch(availableProducts, () => {
  if (totalPages.value > 0 && currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
  if (totalPages.value === 0) {
    currentPage.value = 1
  }
})
</script>

<template>
  <FadeSection>
    <section id="catalog" class="catalog-section">
      <div class="container catalog-container">

        <CatalogHeader />

        <!-- =========================================
             BARRA DE FILTROS SUPERIOR (ESTILO MINIMALISTA E-COMMERCE)
        ========================================= -->
        <div class="catalog-filters-bar">
          <div class="filters-left-group">
            <span class="filters-label">Filtrar:</span>

            <!-- DROPDOWN CATEGORÍAS -->
            <div class="filter-dropdown-container">
              <button
                type="button"
                class="filter-trigger-btn"
                :class="{ active: activeDropdown === 'category' || selectedCategory !== null }"
                @click.stop="toggleDropdown('category')"
              >
                <span>{{ currentCategoryName }}</span>
                <span class="dropdown-chevron" :class="{ open: activeDropdown === 'category' }">⌄</span>
              </button>

              <div v-if="activeDropdown === 'category'" class="dropdown-popup-panel category-panel">
                <div class="dropdown-panel-header">
                  <span class="panel-title">Categorías</span>
                  <button
                    v-if="selectedCategory !== null"
                    type="button"
                    class="panel-clear-action"
                    @click="changeCategory(null)"
                  >
                    Ver todas
                  </button>
                </div>

                <div class="categories-dropdown-scroller-wrapper">
                  <button
                    v-if="canScrollLeft"
                    type="button"
                    class="scroll-control-btn left"
                    @click="scrollCategories('left')"
                  >
                    ‹
                  </button>

                  <div
                    ref="categoryScroller"
                    class="categories-horizontal-list"
                    @scroll="updateCategoryScroll"
                  >
                    <button
                      type="button"
                      class="category-pill-item"
                      :class="{ active: selectedCategory === null }"
                      @click="changeCategory(null)"
                    >
                      Todas las bases
                    </button>

                    <button
                      v-for="category in categoryStore.categories"
                      :key="category.id"
                      type="button"
                      class="category-pill-item"
                      :class="{ active: selectedCategory === category.id }"
                      @click="changeCategory(category.id)"
                    >
                      {{ category.name }}
                    </button>
                  </div>

                  <button
                    v-if="canScrollRight"
                    type="button"
                    class="scroll-control-btn right"
                    @click="scrollCategories('right')"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <!-- DROPDOWN PRECIO -->
            <div class="filter-dropdown-container">
              <button
                type="button"
                class="filter-trigger-btn"
                :class="{ active: activeDropdown === 'price' || hasPriceFilter }"
                @click.stop="toggleDropdown('price')"
              >
                <span>Precio</span>
                <span class="dropdown-chevron" :class="{ open: activeDropdown === 'price' }">⌄</span>
              </button>

              <div v-if="activeDropdown === 'price'" class="dropdown-popup-panel price-panel">
                <div class="dropdown-panel-header">
                  <span class="panel-title">Rango de Precio</span>
                  <button
                    v-if="hasPriceFilter"
                    type="button"
                    class="panel-clear-action"
                    @click="clearPriceFilter"
                  >
                    Limpiar
                  </button>
                </div>

                <div class="price-widget-body">
                  <div class="price-box-meta">
                    <span>{{ formatPrice(effectiveMinPrice) }}</span>
                    <span class="separator-dash">-</span>
                    <span>{{ formatPrice(effectiveMaxPrice) }}</span>
                  </div>

                  <div class="dual-track-inputs-container">
                    <div class="background-base-line">
                      <div
                        class="active-range-highlight"
                        :style="{
                          left: `${minSliderPosition}%`,
                          right: `${100 - maxSliderPosition}%`
                        }"
                      ></div>
                    </div>

                    <input
                      type="range"
                      class="custom-range-slider min-range"
                      :min="minimumProductPrice"
                      :max="maximumProductPrice"
                      :value="effectiveMinPrice"
                      :step="1000"
                      @input="changeMinPrice"
                    />

                    <input
                      type="range"
                      class="custom-range-slider max-range"
                      :min="minimumProductPrice"
                      :max="maximumProductPrice"
                      :value="effectiveMaxPrice"
                      :step="1000"
                      @input="changeMaxPrice"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- BOTÓN RESTABLECER GLOBAL -->
            <button
              v-if="hasActiveFilters"
              type="button"
              class="global-reset-inline"
              @click="clearAllFilters"
            >
              × Restablecer filtros
            </button>
          </div>

          <div class="filters-right-group">
            <span class="products-count-label">{{ availableProducts.length }} productos</span>
          </div>
        </div>

        <!-- =========================================
             ESTADO DE CARGA
        ========================================= -->
        <div v-if="store.loading || categoryStore.loading" class="catalog-grid-skeleton">
          <ProductSkeleton v-for="n in productsPerPage" :key="n" />
        </div>

        <!-- =========================================
             GRILLA Y ESTADOS VACÍOS
        ========================================= -->
        <template v-else>
          <div v-if="!availableProducts.length" class="empty-results-container">
            <div class="empty-state-icon">❖</div>
            <h3>Sin resultados coincidentes</h3>
            <p>Intenta restablecer los filtros para visualizar otras opciones disponibles en nuestro catálogo.</p>
            <button
              type="button"
              class="empty-reset-action"
              @click="clearAllFilters"
            >
              Ver todo el catálogo
            </button>
          </div>

          <template v-else>
            <ProductGrid :products="paginatedProducts" />

            <!-- PAGINACIÓN -->
            <div v-if="totalPages > 1" class="catalog-pagination">
              <button
                type="button"
                class="page-nav-arrow"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                ← Anterior
              </button>

              <div class="page-numbers-wrapper">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  type="button"
                  class="page-number-pill"
                  :class="{ active: currentPage === page }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                type="button"
                class="page-nav-arrow"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
              >
                Siguiente →
              </button>
            </div>
          </template>
        </template>

      </div>
    </section>
  </FadeSection>
</template>

<style scoped>
.catalog-section {
  position: relative;
  padding: 8rem 0 10rem;
  background-color: var(--background);
}

.catalog-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* =========================================
   BARRA DE FILTROS SUPERIOR
========================================= */
.catalog-filters-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 50;
}

.filters-left-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.filters-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
}

.filter-dropdown-container {
  position: relative;
}

.filter-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;
}

.filter-trigger-btn:hover,
.filter-trigger-btn.active {
  color: var(--primary);
  background: rgba(255, 255, 255, 0.04);
}

.dropdown-chevron {
  font-size: 0.75rem;
  transition: transform 0.25s ease;
}

.dropdown-chevron.open {
  transform: rotate(180deg);
}

/* =========================================
   PANeles FLOTANTES (DROPDOWNS)
========================================= */
.dropdown-popup-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  z-index: 100;
  animation: fadeInPanel 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-panel {
  width: 420px;
  max-width: 90vw;
}

.price-panel {
  width: 280px;
}

@keyframes fadeInPanel {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.panel-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  font-weight: 600;
}

.panel-clear-action {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  opacity: 0.85;
}

.panel-clear-action:hover {
  opacity: 1;
}

/* Carrusel de categorías dentro del panel */
.categories-dropdown-scroller-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.categories-horizontal-list {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 0.2rem 0;
  width: 100%;
}

.categories-horizontal-list::-webkit-scrollbar {
  display: none;
}

.category-pill-item {
  flex: 0 0 auto;
  padding: 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-pill-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.18);
}

.category-pill-item.active {
  background: var(--primary);
  color: #050505;
  border-color: var(--primary);
  font-weight: 600;
}

.scroll-control-btn {
  position: absolute;
  z-index: 5;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
}

.scroll-control-btn.left { left: -10px; }
.scroll-control-btn.right { right: -10px; }

/* Widget de precio dentro del panel */
.price-widget-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.price-box-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text);
  font-size: 0.8rem;
  font-weight: 500;
}

.separator-dash {
  color: rgba(255, 255, 255, 0.3);
}

.dual-track-inputs-container {
  position: relative;
  height: 16px;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.background-base-line {
  position: absolute;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.active-range-highlight {
  position: absolute;
  top: 0;
  bottom: 0;
  background: var(--primary);
  border-radius: 999px;
}

.custom-range-slider {
  position: absolute;
  width: 100%;
  appearance: none;
  background: none;
  pointer-events: none;
  margin: 0;
}

.custom-range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid #111;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 5px rgba(0,0,0,0.4);
}

.min-range { z-index: 2; }
.max-range { z-index: 3; }

.global-reset-inline {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  opacity: 0.9;
}

.global-reset-inline:hover {
  opacity: 1;
  text-decoration: underline;
}

.filters-right-group {
  display: flex;
  align-items: center;
}

.products-count-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* =========================================
   ESTADOS VACÍOS Y PAGINACIÓN
========================================= */
.catalog-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.empty-results-container {
  text-align: center;
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 0.012);
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  max-width: 520px;
  margin: 3rem auto;
}

.empty-state-icon {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.empty-results-container h3 {
  color: var(--text);
  font-size: 1.35rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.empty-results-container p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1.75rem;
}

.empty-reset-action {
  padding: 0.7rem 1.5rem;
  background: var(--primary);
  border: none;
  border-radius: 10px;
  color: #050505;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.empty-reset-action:hover {
  transform: translateY(-2px);
}

.catalog-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.page-numbers-wrapper {
  display: flex;
  gap: 0.5rem;
}

.page-number-pill, .page-nav-arrow {
  padding: 0.6rem 1.1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number-pill.active {
  background: var(--primary);
  color: #050505;
  border-color: var(--primary);
  font-weight: 600;
}

.page-number-pill:hover:not(.active), .page-nav-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.page-nav-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>