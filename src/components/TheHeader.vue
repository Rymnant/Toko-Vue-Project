<template>
  <header class="flex justify-between items-center p-4 bg-gray-200">
    <router-link to="/" class="text-2xl font-bold text-green-600">Toko Online</router-link>
    <div class="flex items-center">
      <div class="mr-4 bg-gray-400 text-white px-4 py-2 rounded">
        {{ searchPlaceholder }}
      </div>
      <router-link to="/login" class="mr-2 border border-gray-400 px-4 py-1 rounded bg-white">Login</router-link>
      <router-link to="/register"
        class="border border-gray-400 px-4 py-1 rounded bg-green-500 text-white">Masuk</router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const searchPlaceholder = computed(() => {
  if (route.path.includes('/company')) {
    return 'Cari di Toko "Perusahaan A"';
  } else if (route.path === '/') {
    return 'Cari Barang atau Toko';
  } else {
    return 'Cari di Toko "Perusahaan A"';
  }
});
</script>
