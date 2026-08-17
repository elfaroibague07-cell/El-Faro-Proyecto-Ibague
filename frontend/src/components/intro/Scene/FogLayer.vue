<template>

<div class="fog-wrapper">

  <div class="fog-layer fog-back"></div>

  <div class="fog-layer fog-middle"></div>

  <div class="fog-layer fog-front"></div>

  <div class="ground-mist"></div>

  <div class="ground-mist second"></div>

  <div class="fog-ground-2"></div>

  <div class="front-fog"></div>

  <div class="beam-fog"></div>

</div>

</template>

<style scoped>

.fog-wrapper{

position:absolute;

inset:0;

overflow:hidden;

pointer-events:none;

z-index:18;

}


/*==============================*/
/* NIEBLA AMBIENTAL */
/*==============================*/

.fog-layer{

position:absolute;

left:-30%;

width:160%;

border-radius:50%;

filter:blur(110px);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.12),

rgba(255,255,255,.05) 45%,

transparent 80%

);

}


/* Fondo */

.fog-back{

top:6%;

height:55%;

opacity:.10;

animation:fogLeft 80s linear infinite;

}


/* Media */

.fog-middle{

top:18%;

height:48%;

opacity:.14;

animation:fogRight 60s linear infinite;

}


/* Frontal */

.fog-front{

top:30%;

height:40%;

opacity:.18;

animation:fogLeft 40s linear infinite;

}


/*==============================*/
/* NIEBLA DEL SUELO */
/*==============================*/

.ground-mist{

position:absolute;

left:-20%;

bottom:-10%;

width:140%;

height:42%;

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.22),

rgba(255,255,255,.08) 55%,

transparent 100%

);

filter:blur(90px);

opacity:.9;

animation:

groundFloat 18s ease-in-out infinite;

}


.second{

bottom:-3%;

opacity:.55;

filter:blur(70px);

animation:

groundFloatReverse 14s ease-in-out infinite;

}


.layer-1{

opacity:.18;

}

.layer-2{

opacity:.24;

}

.layer-3{

opacity:.16;

}

.layer-4{

opacity:.30;

}


/*==============================*/
/* MOVIMIENTO */
/*==============================*/

@keyframes fogLeft{

0%{

transform:

translateX(0)

scale(1.2);

}

100%{

transform:

translateX(-12%)

scale(1.25);

}

}

@keyframes fogRight{

0%{

transform:

translateX(-12%)

scale(1.2);

}

100%{

transform:

translateX(0)

scale(1.25);

}

}

@keyframes groundFloat{

0%,100%{

transform:

translateY(0)

scale(1);

}

50%{

transform:

translateY(-8px)

scale(1.03);

}

}

@keyframes groundFloatReverse{

0%,100%{

transform:

translateY(0)

scale(1);

}

50%{

transform:

translateY(8px)

scale(1.02);

}

}


/*==============================*/
/* NIEBLA DEL HAZ */
/*==============================*/

.beam-fog{

position:absolute;

left:50%;

top:18%;

width:85vw;

height:240px;

transform-origin:left center;

background:

linear-gradient(

90deg,

rgba(255,255,255,.10),

rgba(255,255,255,.05) 25%,

transparent 75%

);

filter:blur(55px);

opacity:.55;

mix-blend-mode:screen;

animation:

beamFogMove 11s ease-in-out infinite;

}

@keyframes beamFogMove{

0%,100%{

transform:

rotate(-11deg);

}

50%{

transform:

rotate(11deg);

}

}


/*==============================*/
/* NIEBLA DELANTERA */
/*==============================*/

.front-fog{

position:absolute;

left:-15%;

bottom:6%;

width:130%;

height:220px;

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.16),

rgba(255,255,255,.07) 45%,

transparent 85%

);

filter:blur(60px);

opacity:.75;

z-index:30;

animation:

frontFogMove 18s ease-in-out infinite;

}

@keyframes frontFogMove{

0%,100%{

transform:

translateY(0)

translateX(0)

scale(1);

}

50%{

transform:

translateY(-6px)

translateX(-3%)

scale(1.03);

}

}


/*================================*/
/* TABLET */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.beam-fog{

top:17%;

}

}


/*================================*/
/* MÓVIL */
/*================================*/

@media (max-width:600px){

.beam-fog{

top:18%;

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/*================================*/

@media (max-width:400px){

.beam-fog{

top:19%;

}

}

</style>