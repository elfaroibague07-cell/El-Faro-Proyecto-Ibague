<template>

<div class="ground-mist">

  <div class="mist layer-1"></div>

  <div class="mist layer-2"></div>

  <div class="mist layer-3"></div>

  <div class="mist layer-4"></div>

</div>

</template>

<style scoped>

.ground-mist{

position:absolute;

left:0;

right:0;

bottom:-4%;

height:42%;

overflow:hidden;

pointer-events:none;

z-index:22;

}


/*==============================*/
/* CAPAS */
/*==============================*/

.mist{

position:absolute;

left:-25%;

width:150%;

border-radius:50%;

will-change:transform;

}


/* Capa principal */

.layer-1{

bottom:0;

height:220px;

opacity:.28;

filter:blur(85px);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.24),

rgba(255,255,255,.08) 55%,

transparent 100%

);

animation:

mistLeft 24s linear infinite,

mistFloat 9s ease-in-out infinite;

}


/* Capa media */

.layer-2{

bottom:40px;

height:180px;

opacity:.18;

filter:blur(70px);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.16),

transparent 80%

);

animation:

mistRight 18s linear infinite,

mistFloatReverse 8s ease-in-out infinite;

}


/* Capa superior */

.layer-3{

bottom:90px;

height:140px;

opacity:.10;

filter:blur(55px);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.12),

transparent 80%

);

animation:

mistLeft 30s linear infinite,

mistFloat 10s ease-in-out infinite;

}


/* Capa cercana */

.layer-4{

bottom:-20px;

height:280px;

opacity:.32;

filter:blur(105px);

background:

radial-gradient(

ellipse at center,

rgba(255,255,255,.18),

transparent 85%

);

animation:

mistRight 35s linear infinite,

mistFloatReverse 12s ease-in-out infinite;

}


/*==============================*/
/* MOVIMIENTO */
/*==============================*/

@keyframes mistLeft{

0%{

transform:

translateX(0)

scale(1);

}

100%{

transform:

translateX(-12%)

scale(1.05);

}

}

@keyframes mistRight{

0%{

transform:

translateX(-12%)

scale(1);

}

100%{

transform:

translateX(0)

scale(1.05);

}

}

@keyframes mistFloat{

0%,100%{

transform:

translateY(0);

}

50%{

transform:

translateY(-8px);

}

}

@keyframes mistFloatReverse{

0%,100%{

transform:

translateY(0);

}

50%{

transform:

translateY(8px);

}

}


/*================================*/
/* TABLET */
/* 601px - 900px */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.ground-mist{

height:34%;

}

.layer-1{

height:190px;

}

.layer-2{

height:155px;

}

.layer-3{

height:120px;

}

.layer-4{

height:230px;

}

}


/*================================*/
/* MÓVIL */
/* 401px - 600px */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.ground-mist{

height:27%;

}

.layer-1{

height:160px;

}

.layer-2{

height:130px;

}

.layer-3{

height:100px;

}

.layer-4{

height:190px;

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/* 0px - 400px */
/*================================*/

@media (max-width:400px){

.ground-mist{

height:23%;

}

.layer-1{

height:140px;

}

.layer-2{

height:115px;

}

.layer-3{

height:90px;

}

.layer-4{

height:165px;

}

}

</style>