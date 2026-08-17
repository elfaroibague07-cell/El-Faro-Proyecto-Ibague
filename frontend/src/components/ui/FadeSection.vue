<script setup lang="ts">

import {ref,onMounted,onUnmounted} from 'vue'

const visible=ref(false)

const element=ref<HTMLElement>()

let observer:IntersectionObserver

onMounted(()=>{

observer=new IntersectionObserver(

([entry])=>{

if(entry.isIntersecting){

visible.value=true

}

},

{

threshold:.15

}

)

if(element.value){

observer.observe(element.value)

}

})

onUnmounted(()=>{

observer.disconnect()

})

</script>

<template>

<section

ref="element"

:class="{

visible

}"

class="fade"

>

<slot/>

</section>

</template>

<style scoped>

.fade{

opacity:0;

transform:translateY(50px);

transition:.8s;

}

.visible{

opacity:1;

transform:translateY(0);

}

</style>