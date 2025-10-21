<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
    <Toast />
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Toast from '@/components/common/Toast.vue';
</script>
