<template>
  <div class="not-found">
    <h1>404 - Halaman Tidak Ditemukan</h1>
    <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
    <router-link to="/" class="btn-home">Kembali ke Beranda</router-link>
  </div>
</template>

<script setup lang="ts">
// Ga usah diisi
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #666;
}

.btn-home {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-home:hover {
  background-color: #388e3c;
}
</style>
