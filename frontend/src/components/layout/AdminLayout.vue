<script setup lang="ts">
import Sidebar from '../components/admin/Sidebar.vue'
import Topbar from '../components/admin/Topbar.vue'
</script>

<template>

<div class="flex min-h-screen bg-[var(--background)]">

    <Sidebar/>

    <main class="flex-1">

        <Topbar/>

        <div class="p-8">

            <RouterView/>

        </div>

    </main>

</div>

</template>