<template>

<div class="halo">

  <div class="core"></div>

  <div class="glow"></div>

</div>

</template>

<style scoped>

.halo{

position:absolute;

left:50%;

top:29%;

transform:translateX(-50%);

width:160px;

height:160px;

pointer-events:none;

z-index:22;

opacity:0;

animation:

haloOn .35s ease forwards;

animation-delay:2.8s;

}

.core{

position:absolute;

left:50%;

top:50%;

transform:translate(-50%,-50%);

width:18px;

height:18px;

border-radius:50%;

background:white;

box-shadow:

0 0 18px rgba(255,255,255,.9),

0 0 40px rgba(255,255,255,.6);

}

.glow{

position:absolute;

inset:0;

border-radius:50%;

background:

radial-gradient(

circle,

rgba(255,255,255,.45),

transparent 75%

);

filter:blur(24px);

animation:pulse 3.5s ease-in-out infinite;

}

@keyframes haloOn{

0%{

opacity:0;

transform:
translateX(-50%)
scale(.2);

}

40%{

opacity:1;

transform:
translateX(-50%)
scale(1.5);

}

100%{

opacity:1;

transform:
translateX(-50%)
scale(1);

}

}

@keyframes pulse{

0%,100%{

transform:scale(1);

opacity:.9;

}

50%{

transform:scale(1.15);

opacity:1;

}

}

/*================================
TABLET
================================*/

@media (max-width:1100px){

.halo{

top:28%;

width:140px;

height:140px;

}

}

/*================================
MOBILE
================================*/

@media (max-width:700px){

.halo{

top:26%;

width:120px;

height:120px;

}

.core{

width:14px;

height:14px;

}

}

/*================================
MOBILE PEQUEÑO
================================*/

@media (max-width:480px){

.halo{

top:25%;

width:105px;

height:105px;

}

}

@media (min-width:1101px){

  .halo{

    top:27%;

  }

}

</style>