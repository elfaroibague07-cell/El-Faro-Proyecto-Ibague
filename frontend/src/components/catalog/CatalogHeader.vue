<script setup lang="ts">
import PrimaryButton from '../buttons/PrimaryButton.vue'
</script>


<template>

  <header class="catalog-header">

    <!-- =====================================
         ETIQUETA
    ====================================== -->

    <span class="subtitle">
      Catálogo
    </span>


    <!-- =====================================
         DECORACIÓN
    ====================================== -->

    <div
      class="decorative-line"
      aria-hidden="true"
    ></div>


    <!-- =====================================
         TÍTULO
    ====================================== -->

    <h2>
      Descubre nuestros cristales
    </h2>


    <!-- =====================================
         DESCRIPCIÓN
    ====================================== -->

    <p>

      Cada cristal de El Faro es grabada con
      precisión para conservar momentos únicos
      en cristal.

      <span class="desktop-break">
        Muy pronto encontrarás aquí todos
        nuestros diseños disponibles.
      </span>

    </p>


    <!-- =====================================
         ACCIÓN
    ====================================== -->

    <div class="catalog-action">

      <PrimaryButton
        href="https://wa.me/message/CUNW7BLC4EKKP1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Solicitar información sobre los cristales de El Faro por WhatsApp"
      >

        Solicitar información

      </PrimaryButton>

    </div>

  </header>

</template>


<style scoped>

/* =========================================
   HEADER
========================================= */

.catalog-header {

  width:
    min(760px, 100%);

  margin:
    0 auto 64px;

  text-align:
    center;

}


/* =========================================
   SUBTÍTULO
========================================= */

.subtitle {

  display:
    inline-block;

  margin-bottom:
    14px;

  color:
    var(--primary);

  font-family:
    var(--font-body);

  font-size:
    .75rem;

  font-weight:
    700;

  letter-spacing:
    .28em;

  line-height:
    1.4;

  text-transform:
    uppercase;

}


/* =========================================
   LÍNEA DECORATIVA
========================================= */

.decorative-line {

  width:
    42px;

  height:
    1px;

  margin:
    0 auto 24px;

  background:
    var(--primary);

  opacity:
    .8;

}


/* =========================================
   TÍTULO
========================================= */

h2 {

  margin:
    0;

  color:
    var(--text);

  font-family:
    var(--font-title);

  font-size:
    clamp(
      2.5rem,
      5vw,
      3.6rem
    );

  font-weight:
    600;

  line-height:
    1.08;

  letter-spacing:
    -.015em;

}


/* =========================================
   DESCRIPCIÓN
========================================= */

p {

  width:
    min(650px, 100%);

  margin:
    22px auto 0;

  color:
    var(--text-secondary);

  font-family:
    var(--font-body);

  font-size:
    .95rem;

  font-weight:
    400;

  line-height:
    1.8;

}


/* =========================================
   SEGUNDA PARTE TEXTO
========================================= */

.desktop-break {

  display:
    block;

}


/* =========================================
   ACCIÓN
========================================= */

.catalog-action {

  display:
    flex;

  justify-content:
    center;

  margin-top:
    32px;

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 768px) {

  .catalog-header {

    margin-bottom:
      48px;

  }


  h2 {

    font-size:
      clamp(
        2.2rem,
        8vw,
        3rem
      );

  }


  p {

    font-size:
      .9rem;

    line-height:
      1.7;

  }

}


/* =========================================
   MÓVIL
========================================= */

@media (max-width: 600px) {

  .catalog-header {

    margin-bottom:
      40px;

  }


  .subtitle {

    margin-bottom:
      12px;

    font-size:
      .7rem;

    letter-spacing:
      .22em;

  }


  .decorative-line {

    width:
      34px;

    margin-bottom:
      20px;

  }


  h2 {

    font-size:
      2.25rem;

    line-height:
      1.1;

  }


  p {

    margin-top:
      18px;

    font-size:
      .86rem;

  }


  .desktop-break {

    display:
      inline;

  }


  .catalog-action {

    margin-top:
      26px;

  }

}


/* =========================================
   MÓVIL PEQUEÑO
========================================= */

@media (max-width: 420px) {

  .catalog-header {

    margin-bottom:
      34px;

  }


  h2 {

    font-size:
      2rem;

  }


  p {

    font-size:
      .82rem;

    line-height:
      1.65;

  }

}

</style>