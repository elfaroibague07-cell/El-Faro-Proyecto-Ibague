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

<div class="login">

<div class="card">

<h1>

Panel Administrador

</h1>

<form @submit.prevent="login">

<p class="help">

Solo usuarios autorizados pueden acceder al panel.

</p>

<input
v-model="form.email"
type="email"
placeholder="Correo"
/>

<input
v-model="form.password"
type="password"
placeholder="Contraseña"
/>

<button
:type="'submit'"
:disabled="auth.loading"
>

{{ auth.loading ? 'Ingresando...' : 'Ingresar' }}

</button>

</form>

</div>

</div>

</template>

<style scoped>

.login{

min-height:100vh;

display:flex;

justify-content:center;

align-items:center;

}

.card{

width:420px;

max-width:95%;

padding:40px;

border-radius:20px;

background:var(--surface);

border:1px solid var(--border);

}

form{

display:flex;

flex-direction:column;

gap:18px;

margin-top:24px;

}


input{

padding:14px;

border-radius:12px;

border:1px solid var(--border);

background:transparent;

}

button{

height:50px;

border:none;

border-radius:12px;

background:var(--primary);

cursor:pointer;

font-weight:600;

}

.help{

margin-top:20px;

font-size:.9rem;

color:var(--text-secondary);

text-align:center;

}

</style>