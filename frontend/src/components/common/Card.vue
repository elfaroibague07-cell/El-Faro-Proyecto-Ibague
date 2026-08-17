<template>

<div class="card">

<slot/>

</div>

</template>

<style scoped>

.card{

height:100%;

background:rgba(255,255,255,.03);

border:1px solid rgba(255,255,255,.06);

border-radius:22px;

backdrop-filter:blur(18px);

transition:var(--transition);

}

.card:hover{

transform:translateY(-6px);

border-color:var(--primary);

background:rgba(255,255,255,.05);

box-shadow:var(--shadow-md);

}

</style>