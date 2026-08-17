<template>

<div class="container">

    <slot/>

</div>

</template>

<style scoped>

.container{

width:min(100% - 2rem,var(--container));

margin:auto;

}

</style>