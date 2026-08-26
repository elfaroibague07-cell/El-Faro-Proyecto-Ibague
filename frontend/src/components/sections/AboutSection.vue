<script setup lang="ts">
import aboutImage from '@/assets/images/about/img3.jpeg'
import FadeSection from '../ui/FadeSection.vue'
</script>

<template>

<FadeSection>

<section
  id="about"
  class="about"
>

  <div class="container">

    <div class="content">

      <span class="eyebrow">
        SOBRE NOSOTROS
      </span>

      <h2>
        Transformamos recuerdos en piezas únicas de cristal.
      </h2>

      <p>
        En <strong>El Faro</strong> convertimos tus fotografías favoritas en
        grabados de cristal de alta precisión. Cada pieza es elaborada con
        tecnología láser para conservar tus recuerdos con un acabado elegante
        y duradero.
      </p>

      <div class="values">

        <div class="value">

          <h4>Precisión</h4>

          <p>
            Grabado láser de alta definición.
          </p>

        </div>

        <div class="value">

          <h4>Calidad</h4>

          <p>
            Cristal óptico resistente y elegante.
          </p>

        </div>

        <div class="value">

          <h4>Recuerdos Eternos</h4>

          <p>
            Un detalle diseñado para durar toda la vida.
          </p>

        </div>

      </div>

    </div>

    <div class="image">

      <div class="halo"></div>

      <img
        :src="aboutImage"
        alt="El Faro"
      >

    </div>

  </div>

</section>

</FadeSection>

</template>

<style scoped>

.about{

position:relative;

padding:8rem 0;

overflow:hidden;

}

.about::before{

content:"";

position:absolute;

left:50%;

top:40%;

transform:translateX(-50%);

width:900px;

height:900px;

border-radius:50%;

background:
radial-gradient(
circle,
rgba(11, 10, 7, 0.05),
transparent 70%
);

filter:blur(120px);

}

.container{

position:relative;

z-index:2;

width:min(1280px,92%);

margin:auto;

display:grid;

grid-template-columns:1fr 1fr;

gap:5rem;

align-items:center;

}

.eyebrow{

display:inline-block;

margin-bottom:1rem;

font-size:.85rem;

letter-spacing:.3rem;

color:var(--primary);

font-weight:600;

}

h2{

font-size:clamp(2.2rem,4vw,3.5rem);

line-height:1.15;

margin-bottom:1.5rem;

}

p{

color:var(--text-secondary);

line-height:1.8;

margin-bottom:2rem;

}

.values{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:1rem;

}

.value{

padding:1.5rem;

border:1px solid rgba(255,255,255,.08);

border-radius:18px;

background:rgba(255,255,255,.03);

backdrop-filter:blur(10px);

transition:.35s;

}

.value:hover{

transform:translateY(-6px);

border-color:rgba(212,177,106,.35);

}

.value h4{

margin-bottom:.6rem;

color:var(--primary);

}

.value p{

margin:0;

font-size:.92rem;

}

.image{

position:relative;

display:flex;

justify-content:center;

align-items:center;

}

.halo{

position:absolute;

width:460px;

height:460px;

border-radius:50%;

background:
radial-gradient(
circle,
rgba(212,177,106,.10),
transparent 70%
);

filter:blur(90px);

}

.image img{

position:relative;

width:100%;

max-width:520px;

border-radius:22px;

box-shadow:
0 30px 80px rgba(0,0,0,.45);

}

@media (max-width:980px){

.container{

grid-template-columns:1fr;

text-align:center;

}

.values{

grid-template-columns:1fr;

}

}

</style>