import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CompanyDetailView from '@/views/CompanyDetailView.vue'
import NotFoundPage from '@/views/NotFoundPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView,
      props: true,
    },
    {
      path: '/company/:id',
      name: 'CompanyDetail',
      component: CompanyDetailView,
      props: true,
    },
    {
      // Catch semua route 404
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: NotFoundPage,
    },
  ],
})

export default router
