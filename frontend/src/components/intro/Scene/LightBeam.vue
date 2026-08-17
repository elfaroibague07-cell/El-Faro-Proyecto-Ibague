<template>

<div class="beam-wrapper">

  <div class="lens-glow"></div>

  <div class="beam"></div>

  <div class="beam-core"></div>

</div>

</template>

<style scoped>

.beam-wrapper{

position:absolute;

inset:0;

overflow:hidden;

pointer-events:none;

z-index:26;

}


/*==============================*/
/* HALO DE LA LINTERNA */
/*==============================*/

.lens-glow{

position:absolute;

left:50%;

top:18%;

width:52px;

height:52px;

transform:translate(-50%,-50%);

border-radius:50%;

background:

radial-gradient(

circle,

rgba(255,255,255,1) 0%,

rgba(255,245,200,.95) 18%,

rgba(255,225,170,.65) 42%,

rgba(255,220,170,.18) 72%,

transparent 100%

);

filter:blur(10px);

animation:

lensPulse 3s ease-in-out infinite;

}


/*==============================*/
/* HAZ GRANDE */
/*==============================*/

.beam{

position:absolute;

left:50%;

top:18%;

width:100vw;

height:240px;

transform-origin:left center;

background:

linear-gradient(

90deg,

rgba(255,255,255,.70),

rgba(255,255,255,.30) 18%,

rgba(255,255,255,.08) 42%,

transparent 100%

);

filter:blur(42px);

opacity:.75;

mix-blend-mode:screen;

animation:

beamSweep 16s linear infinite,

beamPulse 3s ease-in-out infinite;

}


/*==============================*/
/* NÚCLEO BRILLANTE */
/*==============================*/

.beam-core{

position:absolute;

left:50%;

top:18%;

width:95vw;

height:70px;

transform-origin:left center;

background:

linear-gradient(

90deg,

rgba(255,255,255,.95),

rgba(255,255,255,.55) 22%,

rgba(255,255,255,.12) 55%,

transparent 100%

);

filter:blur(14px);

opacity:.95;

mix-blend-mode:screen;

animation:

beamSweep 16s linear infinite,

beamCorePulse 2.6s ease-in-out infinite;

}


/*==============================*/
/* GIRO CIRCULAR */
/*==============================*/

@keyframes beamSweep{

from{

transform:rotate(0deg);

}

to{

transform:rotate(540deg);

}

}


/*==============================*/
/* PULSO DEL HAZ */
/*==============================*/

@keyframes beamPulse{

0%,100%{

opacity:.55;

filter:blur(46px);

}

50%{

opacity:.90;

filter:blur(34px);

}

}


/*==============================*/
/* PULSO DEL NÚCLEO */
/*==============================*/

@keyframes beamCorePulse{

0%,100%{

opacity:.85;

}

50%{

opacity:1;

}

}


/*==============================*/
/* PULSO DE LA LINTERNA */
/*==============================*/

@keyframes lensPulse{

0%,100%{

opacity:.75;

transform:

translate(-50%,-50%)

scale(1);

}

50%{

opacity:1;

transform:

translate(-50%,-50%)

scale(1.18);

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/*================================*/

@media (max-width:400px){

.lens-glow,
.beam,
.beam-core{

top:5%;

}

}


/*================================*/
/* MÓVIL */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.lens-glow,
.beam,
.beam-core{

top:35%;

}

}


/*================================*/
/* TABLET */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.lens-glow,
.beam,
.beam-core{

top:32%;

}

}


/*================================*/
/* LAPTOP */
/*================================*/

@media (min-width:901px) and (max-width:1200px){

.lens-glow,
.beam,
.beam-core{

top:29%;

}

}


/*================================*/
/* DESKTOP */
/*================================*/

@media (min-width:1201px){

.lens-glow,
.beam,
.beam-core{

top:30%;

}

}

</style>