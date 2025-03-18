<template>
  <div v-if="product && company" class="product-detail">
    <div class="product-detail-container">
      <div class="product-images">
        <div class="main-image">
          <div class="image-placeholder"></div>
        </div>
        <div class="thumbnails">
          <div class="thumbnail" v-for="i in 5" :key="i"></div>
        </div>
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-seller">
          Penjual:
          <router-link :to="getCompanyRoute(company.id)" class="company-link">
            {{ company.name }}
          </router-link>
        </p>
        <p class="product-price">{{ formatPrice(product.price) }}</p>

        <div class="product-description">
          <h3>Description</h3>
          <p>
            {{ product.description || loremIpsum }}
          </p>
        </div>

        <div class="product-actions">
          <button class="btn-add-to-cart" @click="addToCart(product)">
            Tambah Ke Keranjang
          </button>
          <button class="btn-buy-now">
            Langsung Beli
          </button>
        </div>

        <button class="btn-chat">
          Chat Penjual
        </button>
      </div>
    </div>

    <div class="related-products">
      <h2>Produk Lainnya dari {{ company.name }}</h2>
      <div class="product-grid">
        <product-card v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Loading product...
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import { getCompanyRoute } from '@/utils/router-helper';
import type { Product } from '@/types/product';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula massa diam, eget luctus dui eleifend et. Morbi vitae tortor. Praesent faucibus ut, commodo id ligula. Quisque turpis ligula, efficitur a lorem vel, finibus ornare enim. Aliquam accumsan sem, dolor, ut convallis ligula commodo ut. Suspendisse vitae orci ut arcu finibus pulvinar. In hac habitasse platea dictumst. Ut eget vitae ligula. Praesent blandit. Maecenas eleifend suscipit volutpat. In mattis rhoncus congue. Aenean sem urna, facilisis at porttitor viverra, tincidunt vitae risus. Cras at hendrerit augue.`;

// Get product ID from route params
const productId = computed(() => Number(route.params.id));

// Get the product from the store
const product = computed(() => {
  return productStore.getProductById(productId.value);
});

// Get the company that sells this product
const company = computed(() => {
  return productStore.getCompanyByProductId(productId.value);
});

// Get related products (other products from the same company)
const relatedProducts = computed(() => {
  if (!product.value) return [];
  return productStore.getRelatedProducts(productId.value);
});

// Load products if not already loaded
onMounted(() => {
  if (productStore.companies.length === 0) {
    productStore.fetchProducts();
  }
});

// Methods
const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`;
};

const addToCart = (product: Product) => {
  cartStore.addItem(product);
};
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
}

.product-detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  padding-top: 100%;
  /* 1:1 Aspect Ratio */
  background-color: #ccc;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
}

.thumbnail {
  width: 60px;
  height: 60px;
  background-color: #ccc;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
}

.thumbnail:hover {
  border-color: #4caf50;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.product-seller {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.product-description h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.product-description p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-add-to-cart,
.btn-buy-now,
.btn-chat {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-add-to-cart {
  background-color: #4caf50;
  color: white;
  flex: 1;
}

.btn-add-to-cart:hover {
  background-color: #388e3c;
}

.btn-buy-now {
  background-color: #8bc34a;
  color: white;
  flex: 1;
}

.btn-buy-now:hover {
  background-color: #7cb342;
}

.btn-chat {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #e0e0e0;
  width: 100%;
  margin-top: 0.5rem;
}

.btn-chat:hover {
  background-color: #eeeeee;
}

.related-products h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.loading {
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: #666;
}

.company-link {
  color: #2e7d32;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.company-link:hover {
  color: #1b5e20;
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-detail-container {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
