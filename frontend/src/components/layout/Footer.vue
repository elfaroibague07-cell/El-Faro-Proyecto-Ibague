<script setup lang="ts">
import {
  Instagram,
  MessageCircle,
  Music2
} from "lucide-vue-next";
</script>

<template>

  <footer class="footer" id="footer">

    <div class="container footer-content">

      <!-- Marca -->
      <div class="footer-brand">

        <h2>EL FARO</h2>

        <p>
          Cristal grabado con precisión.<br />
          Recuerdos que permanecen para siempre.
        </p>

      </div>


      <!-- Navegación -->
      <div class="footer-column">

        <h4>Navegación</h4>

        <nav class="footer-links">

          <a href="#hero">
            Inicio
          </a>

          <a href="#about">
            Nosotros
          </a>

          <a href="#catalog">
            Catálogo
          </a>

          <a href="#footer">
            Contacto
          </a>

        </nav>

      </div>


      <!-- Redes -->
      <div class="footer-column">

        <h4>Síguenos</h4>

        <div class="social">

          <a
            href="https://www.instagram.com/elfaroibague?utm_source=qr&igsh=ZTd3anY1bXdqYTB6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram :size="20" />
          </a>


          <a
            href="https://www.tiktok.com/@elfaroibague?_r=1&_t=ZS-985czaK7Mzl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Music2 :size="20" />
          </a>


          <a
            href="https://wa.me/message/CUNW7BLC4EKKP1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle :size="20" />
          </a>

        </div>

        <p class="social-description">
          Encuéntranos en nuestras redes
          y conoce nuestras creaciones.
        </p>

      </div>


      <!-- Legal -->
      <div class="footer-column">

        <h4>Legal</h4>

        <nav class="footer-links">

          <a href="/politica-privacidad">
            Política de privacidad
          </a>

          <a href="/politica-privacidad">
            Tratamiento de datos
          </a>

        </nav>

      </div>

    </div>


    <!-- Contacto -->
    <div class="container footer-contact">

      <div>

        <span>Ubicación</span>

        <p>
          Ibagué, Tolima
        </p>

      </div>


      <div>

        <span>Atención</span>

        <p>
          Atención personalizada por WhatsApp
        </p>

      </div>

    </div>


    <!-- Copyright -->
    <div class="copy">

      <p>
        © 2026 El Faro · Todos los derechos reservados.
      </p>

    </div>

  </footer>

</template>


<style scoped>

.footer{

  margin-top:120px;

  border-top:1px solid var(--border);

  background:var(--background);

}


/*================================*/
/* CONTENIDO PRINCIPAL */
/*================================*/

.footer-content{

  display:grid;

  grid-template-columns:
    2fr
    1fr
    1fr
    1fr;

  gap:60px;

  padding-top:70px;

  padding-bottom:60px;

}


/*================================*/
/* MARCA */
/*================================*/

.footer-brand h2{

  margin:0 0 15px;

  font-family:
    "DM Serif Display",
    Georgia,
    serif;

  font-size:32px;

  font-weight:400;

  letter-spacing:.04em;

  color:var(--white);

}


.footer-brand p{

  margin:0;

  color:var(--gray);

  line-height:1.8;

}


/*================================*/
/* COLUMNAS */
/*================================*/

.footer-column h4{

  margin:0 0 20px;

  font-size:15px;

  font-weight:600;

  letter-spacing:.04em;

  color:var(--white);

}


/*================================*/
/* LINKS */
/*================================*/

.footer-links{

  display:flex;

  flex-direction:column;

  gap:12px;

}


.footer-links a{

  width:max-content;

  color:var(--gray);

  text-decoration:none;

  transition:
    color .3s ease,
    transform .3s ease;

}


.footer-links a:hover{

  color:var(--primary);

  transform:translateX(3px);

}


/*================================*/
/* REDES */
/*================================*/

.social{

  display:flex;

  gap:12px;

}


.social a{

  width:44px;

  height:44px;

  display:flex;

  justify-content:center;

  align-items:center;

  border-radius:50%;

  color:var(--gray);

  background:var(--surface);

  border:1px solid var(--border);

  transition:
    background .3s ease,
    color .3s ease,
    border-color .3s ease,
    transform .3s ease;

}


.social a:hover{

  background:var(--primary);

  border-color:var(--primary);

  color:#070707;

  transform:translateY(-3px);

}


.social-description{

  margin-top:16px;

  max-width:220px;

  color:var(--gray);

  font-size:14px;

  line-height:1.6;

}


/*================================*/
/* CONTACTO */
/*================================*/

.footer-contact{

  display:flex;

  gap:100px;

  padding-bottom:45px;

}


.footer-contact span{

  display:block;

  margin-bottom:6px;

  color:var(--primary);

  font-size:12px;

  text-transform:uppercase;

  letter-spacing:.12em;

}


.footer-contact p{

  margin:0;

  color:var(--gray);

  font-size:14px;

}


/*================================*/
/* COPYRIGHT */
/*================================*/

.copy{

  border-top:1px solid var(--border);

  padding:28px 20px;

  text-align:center;

}


.copy p{

  margin:0;

  color:var(--gray);

  font-size:13px;

}


/*================================*/
/* TABLET */
/*================================*/

@media (max-width:900px){

  .footer-content{

    grid-template-columns:
      1fr
      1fr;

    gap:45px;

  }

  .footer-brand{

    grid-column:1 / -1;

  }

  .footer-contact{

    gap:50px;

  }

}


/*================================*/
/* MÓVIL */
/*================================*/

@media (max-width:600px){

  .footer{

    margin-top:80px;

  }

  .footer-content{

    grid-template-columns:1fr;

    text-align:center;

    gap:40px;

    padding-top:55px;

    padding-bottom:45px;

  }

  .footer-brand{

    grid-column:auto;

  }

  .footer-links{

    align-items:center;

  }

  .footer-links a{

    width:auto;

  }

  .social{

    justify-content:center;

  }

  .social-description{

    margin-left:auto;

    margin-right:auto;

  }

  .footer-contact{

    flex-direction:column;

    align-items:center;

    text-align:center;

    gap:25px;

    padding-bottom:40px;

  }

}


/*================================*/
/* MÓVIL PEQUEÑO */
/*================================*/

@media (max-width:400px){

  .footer-content{

    gap:35px;

  }

  .footer-brand h2{

    font-size:28px;

  }

  .social a{

    width:42px;

    height:42px;

  }

}

</style>