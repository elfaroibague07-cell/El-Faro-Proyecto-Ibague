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
      <RouterLink to="/">
        Inicio
      </RouterLink>

      <RouterLink to="/#about">
        Nosotros
      </RouterLink>

      <RouterLink to="/#catalog">
        Catálogo
      </RouterLink>

      <!-- NUEVA RUTA DE BASES -->
      <RouterLink to="/#bases">
        Bases
      </RouterLink>

      <RouterLink to="/#footer">
        Contacto
      </RouterLink>
    </nav>

    <!-- WHATSAPP DESKTOP -->
    <a
      href="https://wa.me/message/CUNW7BLC4EKKP1"
      target="_blank"
      rel="noopener noreferrer"
      class="contact-btn"
    >
      WhatsApp
    </a>

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
      <RouterLink
        to="/"
        @click="closeMenu"
      >
        Inicio
      </RouterLink>

      <RouterLink
        to="/#about"
        @click="closeMenu"
      >
        Nosotros
      </RouterLink>

      <RouterLink
        to="/#catalog"
        @click="closeMenu"
      >
        Catálogo
      </RouterLink>

      <!-- NUEVA RUTA DE BASES MOBILE -->
      <RouterLink
        to="/#bases"
        @click="closeMenu"
      >
        Bases
      </RouterLink>

      <RouterLink
        to="/#footer"
        @click="closeMenu"
      >
        Contacto
      </RouterLink>

      <a
        href="https://wa.me/message/CUNW7BLC4EKKP1"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-whatsapp"
        @click="closeMenu"
      >
        WhatsApp
      </a>
    </div>
  </transition>
</header>
</template>

<style scoped>
/* =====================================================
   NAVBAR
===================================================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 102px;
  display: flex;
  align-items: center;
  z-index: 1000;
  background: #0B0B0B;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,.05);
  transition: background .35s ease, backdrop-filter .35s ease, border-color .35s ease;
}

.navbar.scrolled {
  background: rgba(0,0,0,.92);
  backdrop-filter: blur(22px);
  border-bottom: 1px solid rgba(255,255,255,.08);
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
  gap: 24px;
}

/* =====================================================
   LOGO
===================================================== */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: auto;
  height: 100%;
}

.logo-image {
  display: block;
  width: auto;
  height: 108px;
  max-width: 180px;
  object-fit: contain;
  user-select: none;
  transition: transform .35s ease, filter .35s ease;
  filter: drop-shadow(0 0 10px rgba(255,255,255,.06));
}

.logo:hover .logo-image {
  transform: scale(1.04);
  filter: drop-shadow(0 0 20px rgba(255,255,255,.12));
}

/* =====================================================
   NAVEGACIÓN
===================================================== */
.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex: 1;
}

/* =====================================================
   BOTONES DE NAVEGACIÓN
===================================================== */
.desktop-nav a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 20px;
  border-radius: 15px;
  background: rgba(255,255,255,.025);
  border: 1px solid rgba(255,255,255,.06);
  backdrop-filter: blur(12px);
  color: var(--text-secondary);
  font-size: .95rem;
  font-weight: 500;
  letter-spacing: .2px;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  transition: color .3s ease, background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease;
}

/* Brillo */
.desktop-nav a::before {
  content: "";
  position: absolute;
  top: 0;
  left: -120%;
  width: 70%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transform: skewX(-20deg);
  transition: left .65s ease;
}

/* Línea inferior */
.desktop-nav a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 7px;
  width: 0;
  height: 2px;
  border-radius: 50px;
  background: var(--primary);
  transform: translateX(-50%);
  transition: width .3s ease;
}

/* Hover */
.desktop-nav a:hover {
  color: white;
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.13);
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(255,255,255,.04), 0 0 20px rgba(255,255,255,.03);
}

.desktop-nav a:hover::before {
  left: 140%;
}

.desktop-nav a:hover::after {
  width: 55%;
}

/* =====================================================
   WHATSAPP
===================================================== */
.contact-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 26px;
  border-radius: 15px;
  background: white;
  color: black;
  font-size: .94rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: transform .3s ease, background .3s ease, box-shadow .3s ease;
}

.contact-btn:hover {
  background: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(255,255,255,.12);
}

/* =====================================================
   HAMBURGUESA
===================================================== */
.menu-button {
  display: none;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 13px;
  background: rgba(255,255,255,.035);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.menu-button span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 20px;
  background: white;
  transition: transform .3s ease, opacity .3s ease;
}

/* =====================================================
   HAMBURGUESA ACTIVA
===================================================== */
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
   TABLET
===================================================== */
@media (max-width: 1100px) {
  .navbar-container {
    gap: 14px;
  }
  .logo-image {
    height: 88px;
    max-width: 145px;
  }
  .desktop-nav {
    gap: 8px;
  }
  .desktop-nav a {
    height: 44px;
    padding: 0 13px;
    font-size: .88rem;
  }
  .contact-btn {
    height: 46px;
    padding: 0 18px;
    font-size: .88rem;
  }
}

/* =====================================================
   TABLET PEQUEÑA
===================================================== */
@media (max-width: 900px) {
  .navbar {
    height: 82px;
  }
  .navbar-container {
    padding: 0 20px;
    gap: 0;
  }
  .logo-image {
    height: 74px;
    max-width: 125px;
  }
  .desktop-nav {
    display: none;
  }
  .contact-btn {
    display: none;
  }
  .menu-button {
    display: flex;
  }
}

/* =====================================================
   MÓVIL
===================================================== */
@media (max-width: 600px) {
  .navbar {
    height: 76px;
  }
  .navbar-container {
    padding: 0 16px;
  }
  .logo-image {
    height: 66px;
    max-width: 115px;
  }
  .menu-button {
    width: 42px;
    height: 42px;
  }
}

/* =====================================================
   MÓVIL PEQUEÑO
===================================================== */
@media (max-width: 420px) {
  .navbar {
    height: 70px;
  }
  .navbar-container {
    padding: 0 12px;
  }
  .logo-image {
    height: 58px;
    max-width: 105px;
  }
  .menu-button {
    width: 40px;
    height: 40px;
  }
}

/* =====================================================
   MENÚ MOBILE
===================================================== */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 14px 20px 20px;
  background: rgba(8,8,8,.97);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,.08);
  box-shadow: 0 25px 50px rgba(0,0,0,.35);
}

/* =====================================================
   ELEMENTOS MOBILE
===================================================== */
.mobile-menu a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.025);
  color: var(--text-secondary);
  text-decoration: none;
  transition: .3s ease;
}

.mobile-menu a:hover {
  color: white;
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.13);
}

.mobile-menu .mobile-whatsapp {
  background: white;
  color: black;
  font-weight: 700;
}

/* =====================================================
   ANIMACIÓN MENÚ
===================================================== */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>