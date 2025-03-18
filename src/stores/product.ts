import { defineStore } from 'pinia'
import type { Product } from '@/types/product'
import type { Company } from '@/types/company'

export const useProductStore = defineStore('products', {
  state: () => ({
    companies: [
      {
        id: 1,
        name: 'PT Perusahaan Tbk',
        logo: '',
        address: 'Jln Ahmad Dahlan',
        sector: 'Makanan',
        rating: 4.8,
        productsSold: 15000,
        description:
          'PT Perusahaan Tbk adalah perusahaan yang bergerak di bidang makanan dan minuman yang telah berdiri sejak tahun 2005.',
        mission:
          'Menyediakan produk makanan dan minuman berkualitas tinggi yang dapat dinikmati oleh semua kalangan masyarakat.',
        values: [
          'Kualitas: Kami selalu mengutamakan kualitas dalam setiap produk yang kami hasilkan.',
          'Inovasi: Kami terus berinovasi untuk menghasilkan produk yang sesuai dengan kebutuhan pasar.',
          'Kepuasan Pelanggan: Kepuasan pelanggan adalah prioritas utama kami.',
          'Keberlanjutan: Kami berkomitmen untuk menjaga lingkungan dalam setiap proses produksi.',
        ],
        products: [
          {
            id: 1,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 2,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 3,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 4,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 5,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 6,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 7,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 8,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
        ],
      },
      {
        id: 2,
        name: 'PT Makanan Sehat',
        logo: '',
        address: 'Jln Sudirman No. 123',
        sector: 'Makanan Organik',
        rating: 4.5,
        productsSold: 8000,
        description:
          'PT Makanan Sehat adalah perusahaan yang fokus pada produk makanan organik dan sehat.',
        mission: 'Menyediakan makanan organik berkualitas tinggi untuk gaya hidup sehat.',
        values: [
          'Kesehatan: Kami mengutamakan kesehatan konsumen dalam setiap produk.',
          'Organik: Semua bahan baku kami berasal dari pertanian organik.',
          'Keberlanjutan: Kami berkomitmen untuk praktik bisnis yang berkelanjutan.',
          'Transparansi: Kami terbuka tentang asal usul dan proses produksi kami.',
        ],
        products: [
          {
            id: 9,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 10,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 11,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
          {
            id: 12,
            name: 'Product A',
            price: 50000.0,
            image: '',
            description: 'Lorem ipsum dolor sit amet...',
          },
        ],
      },
    ] as Company[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      // Taruh API call di sini
      this.isLoading = true

      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        // Data udah ada di state, jadi gak perlu di-assign lagi
        this.isLoading = false
      } catch (error) {
        this.error = 'Failed to load products'
        this.isLoading = false
      }
    },

    getProductById(id: number): Product | undefined {
      for (const company of this.companies) {
        const product = company.products.find((p) => p.id === id)
        if (product) return product
      }
      return undefined
    },

    getCompanyById(id: number): Company | undefined {
      return this.companies.find((company) => company.id === id)
    },

    getCompanyByProductId(productId: number): Company | undefined {
      return this.companies.find((company) =>
        company.products.some((product) => product.id === productId),
      )
    },

    getRelatedProducts(productId: number): Product[] {
      const company = this.getCompanyByProductId(productId)
      if (!company) return []

      return company.products.filter((product) => product.id !== productId)
    },
  },
})
