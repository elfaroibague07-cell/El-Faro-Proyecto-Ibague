<script setup lang="ts">
import lighthouse from '@/assets/images/intro/lighthouse.png'
</script>

<template>

<div class="lighthouse">

  <img
    :src="lighthouse"
    alt="El Faro"
    class="lighthouse-image"
  />

</div>

</template>

<style scoped>

.lighthouse{

position:absolute;

left:50%;

bottom:0;

transform:translateX(-50%);

width:auto;

display:flex;

justify-content:center;

align-items:flex-end;

pointer-events:none;

z-index:20;

opacity:0;

animation:
lighthouseReveal 2s ease forwards,
lighthouseFloat 8s ease-in-out infinite;

animation-delay:
0s,
2.2s;

}


/*================================*/
/* IMAGEN DEL FARO */
/*================================*/

.lighthouse-image{

display:block;

height:80vh;

width:auto;

max-width:80vw;

user-select:none;

pointer-events:none;

filter:

drop-shadow(0 0 18px rgba(255,220,160,.10))
drop-shadow(0 0 55px rgba(255,220,160,.08))
drop-shadow(0 0 90px rgba(255,220,160,.04));

}


/*================================*/
/* MÓVIL PEQUEÑO */
/* 0 - 400px */
/*================================*/

@media (max-width:400px){

.lighthouse-image{

height:68vh;

max-width:88vw;

}

}


/*================================*/
/* MÓVIL */
/* 401 - 600px */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.lighthouse-image{

height:72vh;

max-width:85vw;

}

}


/*================================*/
/* TABLET */
/* 601 - 900px */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.lighthouse-image{

height:76vh;

max-width:80vw;

}

}


/*================================*/
/* LAPTOP */
/* 901 - 1200px */
/*================================*/

@media (min-width:901px) and (max-width:1200px){

.lighthouse-image{

height:78vh;

max-width:65vw;

}

}


/*================================*/
/* DESKTOP */
/* 1201px+ */
/*================================*/

@media (min-width:1201px){

.lighthouse-image{

height:min(80vh,720px);

max-width:55vw;

}

}


/*================================*/
/* APARICIÓN */
/*================================*/

@keyframes lighthouseReveal{

0%{

opacity:0;

transform:

translateX(-50%)

translateY(90px)

scale(.90);

filter:blur(12px);

}

100%{

opacity:1;

transform:

translateX(-50%)

translateY(0)

scale(1);

filter:blur(0);

}

}


/*================================*/
/* MOVIMIENTO */
/*================================*/

@keyframes lighthouseFloat{

0%,100%{

transform:

translateX(-50%)

translateY(0);

}

50%{

transform:

translateX(-50%)

translateY(-5px);

}

}

</style>