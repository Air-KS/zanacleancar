// ./frontend/dashbord/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '@/views/adminLogin.vue'
import AdminPage from '@/views/adminPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin-login'
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/dashboard',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
