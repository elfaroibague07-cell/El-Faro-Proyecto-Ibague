import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/lib/supabase'

import ProductDetailPage from '@/pages/ProductDetailPage.vue'
import CatalogBasesPage from '../pages/CatalogBasesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('@/pages/admin/ProductsPage.vue')
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/admin/LoginPage.vue')
    },
    {
      path: '/producto/:slug',
      name: 'product-detail',
      component: ProductDetailPage
    },
    {
      path: '/politica-privacidad',
      name: 'politica-privacidad',
      component: () => import('@/pages/PrivacyPolicyPage.vue')
    },
    {
      path: '/proteccion-datos',
      name: 'proteccion-datos',
      component: () => import('@/pages/DataProtectionPage.vue')
    },
    {
      path: '/catalogo/bases',
      name: 'catalog-bases',
      component: CatalogBasesPage
    },
    {
      path: '/catalogo/bases/:slug',
      name: 'base-detalle',
      component: () => import('@/pages/BaseDetailPage.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach(async (to) => {
  if (!to.path.startsWith('/admin')) return true
  if (to.path === '/admin/login') return true

  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    return '/admin/login'
  }

  return true
})

export default router