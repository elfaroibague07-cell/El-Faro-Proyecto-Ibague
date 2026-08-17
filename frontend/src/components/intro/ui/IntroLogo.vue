<script setup lang="ts">
import logoIntro from '@/assets/images/branding/logo-intro.png'
</script>

<template>

<div class="logo">

  <img
    :src="logoIntro"
    alt="El Faro"
    class="logo-image"
  >

  <div class="logo-light">

    <div class="light-bar"></div>

  </div>

</div>

</template>

<style scoped>

.logo{

position:absolute;

left:50%;

top:7%;

transform:translateX(-50%);

display:flex;

justify-content:center;

align-items:center;

z-index:40;

opacity:0;

animation:

logoReveal 2.0s ease forwards;

animation-delay:0s;

}

.logo-image{

width:clamp(340px,34vw,620px);

display:block;

height:auto;

pointer-events:none;

user-select:none;

animation:

logoGlow 70s ease-in-out infinite;

filter:

drop-shadow(0 0 18px rgba(255,255,255,.05));

}


/*==============================*/
/* APARICIÓN DEL LOGO */
/*==============================*/

@keyframes logoReveal{

0%{

opacity:0;

transform:

translateX(-50%)

translateY(30px)

scale(.95);

filter:blur(8px);

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
/* LUZ QUE REVELA EL LOGO */
/*================================*/

.logo-light{

position:absolute;

top:0;

left:0;

width:100%;

height:100%;

overflow:visible;

pointer-events:none;

}


/*================================*/
/* BARRIDO DEL LOGO */
/*================================*/

@keyframes logoSweep{

0%{

left:-40%;

opacity:0;

}

20%{

opacity:1;

}

80%{

opacity:1;

}

100%{

left:140%;

opacity:0;

}

}


/*================================*/
/* BRILLO DEL LOGO */
/*================================*/

@keyframes logoGlow{

0%,100%{

filter:

drop-shadow(0 0 10px rgba(255,255,255,.04));

}

50%{

filter:

drop-shadow(0 0 22px rgba(255,240,180,.22))

drop-shadow(0 0 55px rgba(255,240,180,.12));

}

}

</style>