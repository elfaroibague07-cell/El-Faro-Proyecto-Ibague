<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

import IntroBackground from './Scene/IntroBackground.vue'
import FogLayer from './Scene/FogLayer.vue'
import Lighthouse from './Scene/Lighthouse.vue'
import LightBeam from './Scene/LightBeam.vue'
import ParticlesLayer from './Scene/ParticlesLayer.vue'
import VignetteOverlay from './Scene/VignetteOverlay.vue'
import IntroLogo from './ui/IntroLogo.vue'
import LighthouseGlow from './Scene/LighthouseGlow.vue'

const showFog = ref(false)
const showLighthouse = ref(false)
const showBeam = ref(false)
const showLogo = ref(false)
const leaving = ref(false)

const emit = defineEmits<{
  (e: 'finish'): void
}>()

const timers: number[] = []

onMounted(() => {

  timers.push(
    window.setTimeout(() => {
      showFog.value = true
    }, 400)
  )

  timers.push(
    window.setTimeout(() => {
      showLighthouse.value = true
    }, 1200)
  )

  timers.push(
    window.setTimeout(() => {
      showBeam.value = true
    }, 2600)
  )

  timers.push(
    window.setTimeout(() => {
      showLogo.value = true
    }, 4200)
  )

  timers.push(
    window.setTimeout(() => {
      leaving.value = true
    }, 6500)
  )

  timers.push(
    window.setTimeout(() => {
      emit('finish')
    }, 7200)
  )

})

onBeforeUnmount(() => {

  timers.forEach(clearTimeout)

})

</script>

<template>

<div
  class="intro-loader"
  :class="{ leaving }"
>

  <div class="scene">

    <IntroBackground />

    <FogLayer v-if="showFog" />

    <ParticlesLayer v-if="showFog" />

    <Lighthouse v-if="showLighthouse" />

    <LighthouseGlow v-if="showBeam" />

    <LightBeam v-if="showBeam" />

    <IntroLogo v-if="showLogo" />

    <VignetteOverlay />

  </div>

</div>

</template>

<style scoped>

.intro-loader{

position:fixed;

inset:0;

width:100%;

height:100dvh;

min-height:100svh;

z-index:99999;

overflow:hidden;

display:flex;

justify-content:center;

align-items:center;

background:

linear-gradient(

180deg,

#020304 0%,

#04070d 55%,

#070b14 100%

);

transition:

opacity 1.3s ease,

visibility 1.3s ease;

}

.intro-loader.leaving{

opacity:0;

visibility:hidden;

transform:scale(1.02);

filter:blur(3px);

}

.scene{

position:absolute;

inset:0;

width:100%;

height:100%;

overflow:hidden;

animation:

cameraBreath 12s ease-in-out infinite;

transform-origin:center bottom;

}

@keyframes cameraBreath{

0%,100%{

transform:

scale(1)

translateY(0);

}

50%{

transform:

scale(1.02)

translateY(-6px);

}

}


/*================================*/
/* MÓVIL */
/*================================*/

@media (max-width:600px){

.intro-loader{

height:100dvh;

min-height:100svh;

}

.scene{

width:100%;

height:100%;

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/*================================*/

@media (max-width:400px){

.intro-loader{

height:100dvh;

min-height:100svh;

}

.scene{

width:100%;

height:100%;

}

}

</style>