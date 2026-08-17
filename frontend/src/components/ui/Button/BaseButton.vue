<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonSize, ButtonVariant } from './button.types'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
])
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
  >
    <slot />

    <span
      v-if="loading"
      class="btn-spinner"
    />
  </button>
</template>

<style scoped>

.btn{

display:flex;

align-items:center;

justify-content:center;

gap:.6rem;

font-weight:600;

cursor:pointer;

transition:var(--transition);

border-radius:var(--radius-md);

border:none;

user-select:none;

}

.btn:hover{

transform:translateY(-2px);

}

.btn:active{

transform:scale(.98);

}

.btn:disabled{

opacity:.5;

cursor:not-allowed;

}

.btn--primary{

background:var(--primary);

color:#111;

}

.btn--primary:hover{

background:var(--primary-hover);

}

.btn--secondary{

background:var(--surface);

color:var(--text);

}

.btn--outline{

background:transparent;

border:1px solid var(--border);

color:var(--text);

}

.btn--ghost{

background:transparent;

color:var(--text);

}

.btn--sm{

padding:.65rem 1rem;

font-size:.9rem;

}

.btn--md{

padding:.9rem 1.4rem;

font-size:1rem;

}

.btn--lg{

padding:1rem 2rem;

font-size:1.05rem;

}

.btn-spinner{

width:18px;

height:18px;

border:2px solid rgba(255,255,255,.3);

border-top-color:white;

border-radius:50%;

animation:spin .7s linear infinite;

}

@keyframes spin{

to{

transform:rotate(360deg);

}

}

</style>