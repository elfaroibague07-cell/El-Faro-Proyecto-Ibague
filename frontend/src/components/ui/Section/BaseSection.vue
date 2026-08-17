<template>

<section class="section">

<slot/>

</section>

</template>

<style scoped>

.section{

padding-block:var(--section-y);

}

@media(max-width:768px){

.section{

padding-block:var(--section-y-mobile);

}

}

</style>