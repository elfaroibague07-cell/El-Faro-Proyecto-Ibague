<script setup lang="ts">
import { ref } from 'vue'

import IntroLoader from './components/intro/IntroLoader.vue'

const introFinished = ref(false)

function finishIntro() {
  introFinished.value = true
}
</script>

<template>

  <IntroLoader
    v-if="!introFinished"
    @finish="finishIntro"
  />

  <div
    class="app-content"
    :class="{ ready: introFinished }"
  >
    <RouterView />
  </div>

</template>

<style scoped>

.app-content {

  opacity: 0;

  transition:
    opacity .9s ease;

}

.app-content.ready {

  opacity: 1;

}

</style>