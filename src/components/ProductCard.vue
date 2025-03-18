<template>
  <div class="product-card">
    <router-link :to="getProductRoute(product.id)">
      <div class="product-image"></div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
      </div>
    </router-link>
    <button class="btn-add" @click="handleAddToCart">Tambah</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useCartStore } from '@/stores/cart';
import { getProductRoute } from '@/utils/router-helper';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const formatPrice = (price: number): string => {
  return `Rp. ${price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
};

const handleAddToCart = () => {
  try {
    cartStore.addItem(props.product);
  } catch (error) {
    console.error('Failed to add product to cart:', error);
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card a {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  height: 150px;
  background-color: #ccc;
  flex-shrink: 0;
}

.product-info {
  padding: 0.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.product-price {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 2.5rem;
  /* Space for the button */
}

.btn-add {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
}

.btn-add:hover {
  background-color: #388e3c;
}
</style>
