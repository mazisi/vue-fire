import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/new',
      name: 'new-product',
      component: () => import('@/views/NewProductPage.vue'),
    },
    {
      path: '/product/:id',
      name: 'edit-product',
      component: () => import('@/views/EditProductPage.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignInPage.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpPage.vue'),
    },
  ],
})

export default router
