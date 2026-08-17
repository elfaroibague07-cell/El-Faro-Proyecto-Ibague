<script setup lang="ts">
</script>

<template>

<div class="admin-layout">

  <AdminSidebar />

  <main class="content">

    <RouterView />

  </main>

</div>

</template>

<style scoped>

.admin-layout{

display:grid;

grid-template-columns:260px 1fr;

min-height:100vh;

}

.content{

padding:40px;

background:var(--background);

}

</style>