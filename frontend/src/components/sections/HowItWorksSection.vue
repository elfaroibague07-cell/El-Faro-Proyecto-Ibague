<script setup lang="ts">
import FadeSection from '../ui/FadeSection.vue'
import SectionTitle from '../common/SectionTitle.vue'
import Card from '../common/Card.vue'

import {
    Image,
    ScanFace,
    Gift
} from 'lucide-vue-next'
</script>

<template>
<FadeSection>

<section
id="process"
class="section"
>

<div class="container">

<SectionTitle

subtitle="Proceso"

title="Así de sencillo es crear tu recuerdo."

/>

<div class="process-grid">

<Card>

<div class="icon">

<Image :size="38"/>

</div>

<h3>

1. Elige tu fotografía

</h3>

<p>

Selecciona la imagen o recuerdo que deseas convertir en una pieza única de cristal.

</p>

</Card>

<Card>

<div class="icon">

<ScanFace :size="38"/>

</div>

<h3>

2. Grabado Láser 3D

</h3>

<p>

Realizamos el grabado con tecnología de alta precisión para obtener el mejor resultado.

</p>

</Card>

<Card>

<div class="icon">

<Gift :size="38"/>

</div>

<h3>

3. Recibe tu esfera

</h3>

<p>

Empacamos cuidadosamente tu producto para que llegue listo para sorprender.

</p>

</Card>

</div>

</div>

</section>

</FadeSection>

</template>

<style scoped>


.process-grid{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:30px;

}

.icon{

width:72px;

height:72px;

border-radius:20px;

display:flex;

justify-content:center;

align-items:center;

background:rgba(212,175,55,.08);

border:1px solid rgba(212,175,55,.15);

margin-bottom:25px;

color:var(--primary);

}

h3{

font-size:1.6rem;

margin-bottom:15px;

}

@media(max-width:900px){

.process-grid{

grid-template-columns:1fr;

}

}

</style>