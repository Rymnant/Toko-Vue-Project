<template>
  <div>
    <div class="banner">
      <div class="banner-content">Ini Banner Iklan</div>
    </div>

    <section class="product-section" v-for="(company, index) in companies" :key="index">
      <h2 class="section-title">
        <router-link :to="getCompanyRoute(company.id)" class="company-link">
          {{ company.name }}
        </router-link>
      </h2>
      <div class="product-grid">
        <product-card v-for="product in company.products.slice(0, 4)" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/product';
import ProductCard from '@/components/ProductCard.vue';
import { getCompanyRoute } from '@/utils/router-helper';

// Initialize store
const productStore = useProductStore();

// Load products when component mounts
onMounted(() => {
  if (productStore.companies.length === 0) {
    productStore.fetchProducts();
  }
});

// Computed properties to ensure reactivity
const companies = computed(() => productStore.companies);
</script>

<style scoped>
/* Banner Styles */
.banner {
  margin: 1rem 0;
  height: 120px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.banner-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #555;
}

/* Product Section Styles */
.product-section {
  margin: 2rem 0;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.company-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.company-link:hover {
  color: #2e7d32;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
