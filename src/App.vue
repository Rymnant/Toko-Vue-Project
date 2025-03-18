<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">
        <router-link to="/">
          <h1>Toko Online</h1>
        </router-link>
      </div>
      <div class="header-right">
        <div class="search-bar">
          <input type="text" placeholder="Cari barang atau toko" />
        </div>
        <button class="btn-login">Login</button>
        <button class="btn-masuk">Masuk</button>
      </div>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// Kosongin aja gapapa, isinya cuma header & router-view

// Ini kalo mau debug route pas development
// import RouteDebugger from '@/components/RouteDebugger.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.logo h1 {
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  background-color: #f5f5f5;
}

.btn-login,
.btn-masuk {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-login {
  background-color: #f5f5f5;
  color: #333;
}

.btn-masuk {
  background-color: #4caf50;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-right {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-bar input {
    width: 100%;
  }
}

@media (max-width: 480px) {}
</style>
