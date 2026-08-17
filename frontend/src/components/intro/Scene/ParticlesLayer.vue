<template>

<div class="particles">

  <span
    v-for="n in 28"
    :key="n"
    class="particle"
    :style="{
      left:`${Math.random()*100}%`,
      top:`${55+Math.random()*45}%`,
      animationDelay:`${Math.random()*8}s`,
      animationDuration:`${12+Math.random()*8}s`,
      transform:`scale(${0.6+Math.random()*1.2})`
    }"
  />

</div>

</template>

<style scoped>

.particles{

position:absolute;

inset:0;

overflow:hidden;

pointer-events:none;

z-index:17;

}


/*================================*/
/* POLVO SUSPENDIDO */
/*================================*/

.particle{

position:absolute;

width:3px;

height:3px;

border-radius:50%;

background:

radial-gradient(

circle,

rgba(255,250,235,.95),

rgba(255,220,160,.35) 55%,

transparent 100%

);

opacity:0;

filter:blur(.8px);

animation:

particleFloat linear infinite;

will-change:transform,opacity;

}


/*================================*/
/* MOVIMIENTO */
/*================================*/

@keyframes particleFloat{

0%{

opacity:0;

transform:

translateY(25px)

translateX(0)

scale(.7);

}

15%{

opacity:.15;

}

40%{

opacity:.32;

transform:

translateY(-15px)

translateX(5px)

scale(1);

}

70%{

opacity:.18;

transform:

translateY(-45px)

translateX(-6px)

scale(.9);

}

100%{

opacity:0;

transform:

translateY(-90px)

translateX(8px)

scale(.6);

}

}


/*================================*/
/* TABLET */
/*================================*/

@media (min-width:601px) and (max-width:900px){

.particle{

width:2.8px;

height:2.8px;

}

}


/*================================*/
/* MÓVIL */
/*================================*/

@media (min-width:401px) and (max-width:600px){

.particle{

width:2.5px;

height:2.5px;

}

}


/*================================*/
/* MÓVIL PEQUEÑO */
/*================================*/

@media (max-width:400px){

.particle{

width:2px;

height:2px;

}

}

</style>