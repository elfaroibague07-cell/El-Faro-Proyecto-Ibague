<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store.ts'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const login = async () => {
  try {
    await auth.signIn(
      form.email,
      form.password
    )
    router.push('/admin/products')
  } catch (error) {
    alert('Correo o contraseña incorrectos')
  }
}
</script>

<template>
<div class="login-page">
  <div class="login-card">
    <div class="card-glow"></div>
    <div class="card-content">
      <span class="badge">✦ Acceso Restringido</span>
      <h1>Panel de Control</h1>
      <p class="help">
        Ingresa tus credenciales de administrador para gestionar la plataforma.
      </p>

      <form @submit.prevent="login">
        <div class="input-group">
          <input
            v-model="form.email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div class="input-group">
          <input
            v-model="form.password"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="submit-btn"
        >
          <span>{{ auth.loading ? 'Verificando...' : 'Acceder al Sistema' }}</span>
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #060606;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.login-page::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.login-card {
  position: relative;
  width: 420px;
  max-width: 100%;
  border-radius: 24px;
  background: rgba(18, 18, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  padding: 40px;
  overflow: hidden;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

h1 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.help {
  margin: 0 0 24px 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

input:focus {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
}

.submit-btn {
  height: 50px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  color: #000000;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.15);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>