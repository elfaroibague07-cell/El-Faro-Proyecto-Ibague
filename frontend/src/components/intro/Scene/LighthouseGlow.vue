<template>

<div class="glow"></div>

</template>

<style scoped>

.glow{

position:absolute;

left:50%;

top:21%;

transform:translate(-50%,-50%);

width:380px;

height:380px;

border-radius:50%;

pointer-events:none;

z-index:21;

background:

radial-gradient(

circle,

rgba(255,245,210,.22) 0%,

rgba(255,225,170,.10) 35%,

rgba(255,220,170,.03) 60%,

transparent 85%

);

filter:blur(65px);

mix-blend-mode:screen;

animation:

glowPulse 3.2s ease-in-out infinite,

glowBreath 8s ease-in-out infinite;

}


/*================================*/
/* MÓVIL PEQUEÑO */
/* 0 - 400px */
/*================================*/

@media (max-width:400px){

.glow{

top:22%;

}

}


/*================================*/
/* MÓVIL */
/* 401 - 600px */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.glow{

top:21%;

}

}


/*================================*/
/* TABLET */
/* 601 - 900px */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.glow{

top:20%;

}

}


/*================================*/
/* LAPTOP */
/* 901 - 1200px */
/*================================*/

@media (min-width:901px) and (max-width:1200px){

.glow{

top:21%;

}

}


/*================================*/
/* DESKTOP */
/* 1201px+ */
/*================================*/

@media (min-width:1201px){

.glow{

top:21%;

}

}


/*================================*/
/* ANIMACIONES */
/*================================*/

@keyframes glowPulse{

0%,100%{

opacity:.45;

transform:

translate(-50%,-50%)

scale(.95);

}

35%{

opacity:.95;

}

50%{

opacity:1;

transform:

translate(-50%,-50%)

scale(1.08);

}

70%{

opacity:.75;

}

}

@keyframes glowBreath{

0%,100%{

filter:blur(65px);

}

50%{

filter:blur(80px);

}

}

</style>