// ./frontend/dashbord/src/router/index.js
// ./frontend/dashbord/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '@/views/adminLogin.vue'
import AdminCard from '@/views/adminCard.vue'
import AdminReward from '@/views/adminReward.vue'
import AdminPage from '@/views/adminPage.vue'
import AdminLayout from '@/layouts/adminLayout.vue'

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
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'page',
        name: 'AdminPage',
        component: AdminPage
      },
      {
        path: 'adminCards',
        name: 'AdminCard',
        component: AdminCard
      },
      {
        path: 'adminRewards',
        name: 'AdminReward',
        component: AdminReward
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/admin-login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // <= C'est ça qui manque
