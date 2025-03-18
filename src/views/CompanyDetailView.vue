<template>
  <div v-if="company" class="company-detail">
    <div class="company-header">
      <div class="company-logo">
        <div class="logo-placeholder"></div>
      </div>
      <div class="company-info">
        <h1 class="company-name">{{ company.name }}</h1>
        <button class="btn-chat">Chat Penjual</button>
      </div>
    </div>

    <div class="company-details-grid">
      <div class="company-address detail-card">
        <h3>Alamat</h3>
        <p>{{ company.address || 'Jln Ahmad Dahlan' }}</p>
        <h3 class="mt-4">Sektor</h3>
        <p>{{ company.sector || 'Makanan' }}</p>
      </div>
      <div class="company-stats detail-card">
        <h3>Rating</h3>
        <p class="rating">
          <span>{{ company.rating || '4.8' }}/5.0</span>
          <span class="stars">
            <span v-for="i in 5" :key="i" class="star">
              <star-icon v-if="i <= Math.floor(company.rating || 4)" class="star-filled" />
              <star-icon v-else class="star-empty" />
            </span>
          </span>
        </p>
        <h3 class="mt-4">Produk Terjual</h3>
        <p>{{ formatProductsSold(company.productsSold || 15000) }}</p>
      </div>
    </div>

    <div class="company-about detail-card">
      <h2>Tentang {{ company.name }}</h2>
      <p>
        {{ company.description || `${company.name} adalah perusahaan yang bergerak di bidang makanan dan minuman yang
        telah berdiri sejak tahun 2005. Kami berkomitmen untuk menyediakan produk berkualitas tinggi dengan harga yang
        terjangkau.` }}
      </p>
      <h3 class="mt-4">Misi Kami</h3>
      <p>
        {{ company.mission || sampleMission }}
      </p>
      <h3 class="mt-4">Nilai-Nilai Kami</h3>
      <ul>
        <li v-for="(value, index) in (company.values || defaultValues)" :key="index">
          {{ value }}
        </li>
      </ul>
    </div>

    <div class="company-products">
      <h2>Produk dari {{ company.name }}</h2>
      <div class="product-grid">
        <product-card v-for="product in company.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Loading company information...
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { StarIcon } from 'lucide-vue-next';
import ProductCard from '@/components/ProductCard.vue';

const route = useRoute();
const productStore = useProductStore();

const sampleMission = 'Menyediakan produk makanan dan minuman berkualitas tinggi yang dapat dinikmati oleh semua kalangan masyarakat.'

// Default values for company
const defaultValues = ref([
  'Kualitas: Kami selalu mengutamakan kualitas dalam setiap produk yang kami hasilkan.',
  'Inovasi: Kami terus berinovasi untuk menghasilkan produk yang sesuai dengan kebutuhan pasar.',
  'Kepuasan Pelanggan: Kepuasan pelanggan adalah prioritas utama kami.',
  'Keberlanjutan: Kami berkomitmen untuk menjaga lingkungan dalam setiap proses produksi.'
]);

// Get company ID from route params
const companyId = computed(() => Number(route.params.id));

// Get the company from the store
const company = computed(() => {
  return productStore.getCompanyById(companyId.value);
});

// Load companies if not already loaded
onMounted(() => {
  if (productStore.companies.length === 0) {
    productStore.fetchProducts();
  }
});

// Methods
const formatProductsSold = (count: number): string => {
  if (count >= 1000) {
    return `${Math.floor(count / 1000)} Ribu`;
  }
  return count.toString();
};
</script>

<style scoped>
.company-detail {
  padding: 2rem 0;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #f0f0f0;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.company-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #333;
}

.company-name {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.btn-chat {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-chat:hover {
  background-color: #eeeeee;
}

.company-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-card {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
}

.detail-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

.detail-card p {
  font-size: 1rem;
  color: #333;
}

.mt-4 {
  margin-top: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  color: #ffc107;
}

.star-filled {
  fill: #ffc107;
}

.star-empty {
  fill: none;
  stroke: #ffc107;
}

.company-about {
  margin-bottom: 2rem;
}

.company-about h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.company-about p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.company-about ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.company-about li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.company-products h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .company-details-grid {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .company-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
