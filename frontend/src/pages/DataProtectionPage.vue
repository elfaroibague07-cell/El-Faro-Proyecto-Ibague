<template>

  <main class="privacy-page">

    <!-- ================================= -->
    <!-- HERO -->
    <!-- ================================= -->

    <section class="privacy-hero">

      <div class="container">

        <span class="eyebrow">
          EL FARO
        </span>

        <h1>
          Protección y
          <br>
          Derechos de Datos Personales
        </h1>

        <p class="intro">
          Política de Privacidad y Tratamiento de Datos Personales — El Faro
        </p>

        <span class="updated">
          Última actualización: 2026
        </span>

      </div>

    </section>


    <!-- ================================= -->
    <!-- CONTENIDO -->
    <!-- ================================= -->

    <section class="privacy-content">

      <div class="container privacy-layout">


        <!-- ================================= -->
        <!-- ÍNDICE -->
        <!-- ================================= -->

        <aside class="privacy-index">

          <span>
            CONTENIDO
          </span>

          <nav>

            <a href="#proteccion">
              05 · Protección
            </a>

            <a href="#derechos">
              06 · Derechos
            </a>

            <a href="#conservacion">
              07 · Conservación
            </a>

            <a href="#aceptacion">
              08 · Aceptación
            </a>

          </nav>

        </aside>


        <!-- ================================= -->
        <!-- ARTÍCULO -->
        <!-- ================================= -->

        <article class="privacy-article">


          <!-- ================================= -->
          <!-- 05 -->
          <!-- ================================= -->

          <section
            id="proteccion"
            class="policy-section"
          >

            <span class="section-number">
              05
            </span>

            <h2>
              Protección de la información
            </h2>

            <p>
              El Faro adopta medidas administrativas, técnicas y organizativas razonables para proteger la información personal frente a pérdida, acceso no autorizado, modificación, uso indebido o divulgación no autorizada.
            </p>

            <p>
              Sin embargo, ningún sistema de almacenamiento o transmisión de información puede garantizar una seguridad absoluta.
            </p>

          </section>


          <!-- ================================= -->
          <!-- 06 -->
          <!-- ================================= -->

          <section
            id="derechos"
            class="policy-section"
          >

            <span class="section-number">
              06
            </span>

            <h2>
              Derechos de los titulares
            </h2>

            <p>
              De acuerdo con la legislación colombiana sobre protección de datos personales, el titular de la información podrá:
            </p>

            <ul>

              <li>
                Conocer, actualizar y rectificar sus datos personales.
              </li>

              <li>
                Solicitar información sobre el uso que se ha dado a sus datos.
              </li>

              <li>
                Solicitar la eliminación de sus datos cuando sea procedente.
              </li>

              <li>
                Revocar la autorización otorgada para el tratamiento de sus datos, cuando legalmente sea posible.
              </li>

              <li>
                Presentar consultas, peticiones o reclamos relacionados con el tratamiento de su información.
              </li>

              <li>
                Acceder gratuitamente a sus datos personales, en los términos establecidos por la ley.
              </li>

            </ul>

            <p>
              Para ejercer estos derechos, el titular podrá comunicarse con El Faro a través de los canales de atención que la empresa tenga habilitados.
            </p>

          </section>


          <!-- ================================= -->
          <!-- 07 -->
          <!-- ================================= -->

          <section
            id="conservacion"
            class="policy-section"
          >

            <span class="section-number">
              07
            </span>

            <h2>
              Conservación de la información
            </h2>

            <p>
              El Faro conservará la información personal durante el tiempo que sea necesario para cumplir las finalidades para las cuales fue recopilada, atender obligaciones legales, contractuales o contables, resolver posibles controversias y ejercer o defender derechos.
            </p>

            <p>
              Una vez cumplidas dichas finalidades, la información será eliminada o conservada únicamente cuando exista una obligación legal que así lo requiera.
            </p>

          </section>


          <!-- ================================= -->
          <!-- 08 -->
          <!-- ================================= -->

          <section
            id="aceptacion"
            class="policy-section"
          >

            <span class="section-number">
              08
            </span>

            <h2>
              Aceptación de esta política
            </h2>

            <p>
              Al proporcionar sus datos personales a El Faro, el titular declara que conoce esta Política de Privacidad y Tratamiento de Datos Personales y autoriza el tratamiento de su información para las finalidades aquí descritas, cuando dicha autorización sea requerida por la legislación aplicable.
            </p>

            <p>
              El Faro podrá actualizar esta política cuando sea necesario para reflejar cambios legales, operativos o en nuestros servicios. La versión vigente estará disponible a través de nuestros canales oficiales.
            </p>

          </section>


          <!-- ================================= -->
          <!-- NAVEGACIÓN -->
          <!-- ================================= -->

          <section class="page-navigation">

            <RouterLink
              to="/politica-privacidad"
              class="navigation-button secondary"
            >
              ← Política de privacidad
            </RouterLink>

            <RouterLink
              to="/"
              class="navigation-button primary"
            >
              Volver al inicio
            </RouterLink>

          </section>


        </article>

      </div>

    </section>

  </main>

</template>


<style scoped>

.privacy-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text);
}


/* ================================= */
/* HERO */
/* ================================= */

.privacy-hero {
  padding: 150px 20px 90px;
  border-bottom: 1px solid var(--border);
}

.privacy-hero .container {
  max-width: 1100px;
  margin: auto;
}

.eyebrow {
  display: block;
  margin-bottom: 20px;

  color: var(--primary);

  font-size: 12px;
  font-weight: 600;

  letter-spacing: .18em;
}

.privacy-hero h1 {
  margin: 0;
  max-width: 850px;

  font-size: clamp(42px, 6vw, 76px);

  font-weight: 400;
  line-height: 1.05;

  color: var(--white);
}

.intro {
  max-width: 700px;

  margin: 30px 0 18px;

  color: var(--gray);

  font-size: 17px;
  line-height: 1.8;
}

.updated {
  color: var(--primary);
  font-size: 13px;
}


/* ================================= */
/* CONTENIDO */
/* ================================= */

.privacy-content {
  padding: 90px 20px 120px;
}

.privacy-layout {
  max-width: 1200px;
  margin: auto;

  display: grid;

  grid-template-columns: 230px minmax(0, 1fr);

  gap: 90px;
}


/* ================================= */
/* ÍNDICE */
/* ================================= */

.privacy-index {
  position: sticky;
  top: 40px;
  align-self: start;
}

.privacy-index > span {
  display: block;

  margin-bottom: 20px;

  color: var(--primary);

  font-size: 11px;
  font-weight: 600;

  letter-spacing: .15em;
}

.privacy-index nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.privacy-index a {
  color: var(--gray);

  text-decoration: none;

  font-size: 13px;
  line-height: 1.5;

  transition: color .3s ease;
}

.privacy-index a:hover {
  color: var(--primary);
}


/* ================================= */
/* ARTÍCULO */
/* ================================= */

.privacy-article {
  max-width: 780px;
}

.policy-section {
  scroll-margin-top: 40px;

  padding-bottom: 80px;
  margin-bottom: 80px;

  border-bottom: 1px solid var(--border);
}

.section-number {
  display: block;

  margin-bottom: 16px;

  color: var(--primary);

  font-size: 12px;
  font-weight: 600;

  letter-spacing: .12em;
}

.policy-section h2 {
  margin: 0 0 28px;

  font-size: clamp(30px, 4vw, 44px);

  font-weight: 400;
  line-height: 1.15;

  color: var(--white);
}

.policy-section p {
  margin: 0 0 20px;

  color: var(--gray);

  font-size: 15px;
  line-height: 1.9;
}

.policy-section ul {
  display: flex;
  flex-direction: column;
  gap: 14px;

  margin: 25px 0 25px;
  padding-left: 22px;
}

.policy-section li {
  color: var(--gray);

  font-size: 15px;
  line-height: 1.8;
}

.policy-section li::marker {
  color: var(--primary);
}


/* ================================= */
/* NAVEGACIÓN */
/* ================================= */

.page-navigation {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding-top: 10px;
}

.navigation-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 13px 22px;

  text-decoration: none;

  font-size: 14px;
  font-weight: 600;

  transition:
    background .3s ease,
    color .3s ease,
    transform .3s ease;
}

.navigation-button.primary {
  background: var(--primary);
  color: #070707;
}

.navigation-button.primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.navigation-button.secondary {
  border: 1px solid var(--border);
  color: var(--gray);
}

.navigation-button.secondary:hover {
  color: var(--white);
  border-color: var(--primary);
}


/* ================================= */
/* TABLET */
/* ================================= */

@media(max-width:900px) {

  .privacy-layout {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .privacy-index {
    position: relative;
    top: auto;
  }

  .privacy-index nav {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 12px;
  }

}


/* ================================= */
/* MÓVIL */
/* ================================= */

@media(max-width:600px) {

  .privacy-hero {
    padding: 110px 20px 65px;
  }

  .privacy-content {
    padding: 60px 20px 80px;
  }

  .privacy-index nav {
    grid-template-columns: 1fr;
  }

  .policy-section {
    padding-bottom: 55px;
    margin-bottom: 55px;
  }

  .page-navigation {
    flex-direction: column;
    align-items: stretch;
  }

  .navigation-button {
    width: 100%;
  }

}


/* ================================= */
/* MÓVIL PEQUEÑO */
/* ================================= */

@media(max-width:400px) {

  .privacy-hero h1 {
    font-size: 38px;
  }

  .privacy-hero {
    padding-top: 95px;
  }

  .policy-section h2 {
    font-size: 30px;
  }

}

</style>