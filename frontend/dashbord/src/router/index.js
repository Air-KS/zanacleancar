// ./frontend/dashbord/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/adminPage.vue'

const routes = [
  {
    path: '/',
    name: 'admin',
    component: AdminView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
