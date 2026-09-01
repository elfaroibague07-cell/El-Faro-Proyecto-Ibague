<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '@/assets/images/branding/logo-intro.png'

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<header
  class="navbar"
  :class="{ scrolled }"
>
  <div class="container navbar-container">

    <!-- LOGO -->
    <RouterLink
      to="/"
      class="logo"
      @click="closeMenu"
    >
      <img
        :src="logo"
        alt="El Faro"
        class="logo-image"
      />
    </RouterLink>

    <!-- NAVEGACIÓN DESKTOP -->
    <nav class="desktop-nav">
      <RouterLink to="/" class="nav-link">
        <span>Inicio</span>
      </RouterLink>

      <RouterLink to="/#about" class="nav-link">
        <span>Nosotros</span>
      </RouterLink>

      <RouterLink to="/#catalog" class="nav-link">
        <span>Catálogo</span>
      </RouterLink>

      <RouterLink to="/#bases" class="nav-link">
        <span>Bases</span>
      </RouterLink>

      <RouterLink to="/#footer" class="nav-link">
        <span>Contacto</span>
      </RouterLink>
    </nav>

    <!-- ESPACIADOR EQUILIBRADOR -->
    <div class="navbar-spacer"></div>

    <!-- BOTÓN MOBILE -->
    <button
      class="menu-button"
      :class="{ active: menuOpen }"
      @click="toggleMenu"
      aria-label="Abrir menú"
      :aria-expanded="menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

  </div>

  <!-- MENÚ MOBILE -->
  <transition name="mobile-menu">
    <div
      v-if="menuOpen"
      class="mobile-menu"
    >
      <RouterLink to="/" @click="closeMenu">Inicio</RouterLink>
      <RouterLink to="/#about" @click="closeMenu">Nosotros</RouterLink>
      <RouterLink to="/#catalog" @click="closeMenu">Catálogo</RouterLink>
      <RouterLink to="/#bases" @click="closeMenu">Bases</RouterLink>
      <RouterLink to="/#footer" @click="closeMenu">Contacto</RouterLink>
    </div>
  </transition>
</header>
</template>

<style scoped>
/* =====================================================
   NAVBAR GENERAL (Más alto para mejor presencia)
===================================================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 116px;
  display: flex;
  align-items: center;
  z-index: 1000;
  background: linear-gradient(to bottom, rgba(11, 11, 11, 0.96), rgba(11, 11, 11, 0.25));
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar.scrolled {
  height: 94px;
  background: rgba(8, 8, 8, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
}

/* =====================================================
   CONTENEDOR
===================================================== */
.navbar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
}

/* =====================================================
   LOGO
===================================================== */
.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  text-decoration: none;
  z-index: 2;
}

.logo-image {
  display: block;
  width: auto;
  height: 86px;
  max-width: 210px;
  object-fit: contain;
  user-select: none;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.7));
}

.logo:hover .logo-image {
  transform: scale(1.03);
}

/* =====================================================
   NAVEGACIÓN DESKTOP
===================================================== */
.desktop-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 6px 12px;
  border-radius: 99px;
  backdrop-filter: blur(12px);
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 99px;
  color: #b3b3b3;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link span {
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.09);
}

.nav-link:active {
  transform: scale(0.97);
}

.navbar-spacer {
  width: 190px;
  flex-shrink: 0;
}

/* =====================================================
   HAMBURGUESA MOBILE
===================================================== */
.menu-button {
  display: none;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  z-index: 2;
}

.menu-button span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: white;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-button.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-button.active span:nth-child(2) {
  opacity: 0;
}

.menu-button.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* =====================================================
   MEDIA QUERIES (RESPONSIVE)
===================================================== */
@media (max-width: 960px) {
  .navbar-container {
    padding: 0 20px;
  }
  .desktop-nav {
    display: none;
  }
  .navbar-spacer {
    display: none;
  }
  .menu-button {
    display: flex;
  }
  .logo-image {
    height: 70px;
    max-width: 160px;
  }
}

/* =====================================================
   MENÚ MOBILE DESPLEGABLE
===================================================== */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 24px 28px;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
}

.mobile-menu a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  color: #cccccc;
  font-size: 0.98rem;
  font-weight: 400;
  text-decoration: none;
  transition: all 0.25s ease;
}

.mobile-menu a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}

/* =====================================================
   ANIMACIÓN MENÚ MOBILE
===================================================== */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>