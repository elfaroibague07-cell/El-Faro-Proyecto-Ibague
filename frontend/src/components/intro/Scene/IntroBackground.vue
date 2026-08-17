<template>

<div class="background">

  <div class="sky"></div>

  <div class="ambient"></div>

  <div class="center-glow"></div>

  <div class="bottom-shadow"></div>

</div>

</template>

<style scoped>

.background{

position:absolute;

inset:0;

overflow:hidden;

z-index:0;

background:

linear-gradient(

180deg,

#010101 0%,

#040404 45%,

#070707 100%

);

}


/*================================*/
/* CIELO */
/*================================*/

.sky{

position:absolute;

inset:0;

background:

radial-gradient(

ellipse at 50% 15%,

rgba(255,255,255,.035),

transparent 55%

);

animation:

skyMove 18s ease-in-out infinite;

}


/*================================*/
/* LUZ AMBIENTAL */
/*================================*/

.ambient{

position:absolute;

left:50%;

top:48%;

width:900px;

height:900px;

transform:translate(-50%,-50%);

border-radius:50%;

background:

radial-gradient(

circle,

rgba(255,245,220,.035),

rgba(255,255,255,.01) 55%,

transparent 80%

);

filter:blur(70px);

animation:

ambientPulse 8s ease-in-out infinite;

}


/*================================*/
/* HALO CENTRAL */
/*================================*/

.center-glow{

position:absolute;

left:50%;

bottom:-10%;

width:900px;

height:650px;

transform:translateX(-50%);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.04),

transparent 75%

);

filter:blur(120px);

}


/*================================*/
/* OSCURECER BORDES */
/*================================*/

.bottom-shadow{

position:absolute;

inset:0;

background:

radial-gradient(

ellipse at center,

transparent 45%,

rgba(0,0,0,.25) 85%,

rgba(0,0,0,.55) 100%

);

}


/*================================*/
/* ANIMACIONES */
/*================================*/

@keyframes ambientPulse{

0%,100%{

opacity:.55;

transform:

translate(-50%,-50%)

scale(1);

}

50%{

opacity:.9;

transform:

translate(-50%,-50%)

scale(1.04);

}

}

@keyframes skyMove{

0%,100%{

transform:scale(1);

}

50%{

transform:scale(1.02);

}

}


/*================================*/
/* TABLET */
/* 601px - 900px */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.ambient{

width:700px;

height:700px;

}

.center-glow{

width:700px;

height:500px;

filter:blur(100px);

}

}


/*================================*/
/* MÓVIL */
/* 401px - 600px */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.ambient{

width:550px;

height:550px;

}

.center-glow{

width:550px;

height:420px;

filter:blur(85px);

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/* 0px - 400px */
/*================================*/

@media (max-width:400px){

.ambient{

width:450px;

height:450px;

}

.center-glow{

width:450px;

height:350px;

filter:blur(75px);

}

}

</style>