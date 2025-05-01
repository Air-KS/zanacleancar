// ./frontend/dashbord/src/router/index.js
// ./frontend/dashbord/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '@/views/adminLogin.vue'
import AdminCard from '@/views/adminCard.vue'
import AdminReward from '@/views/adminReward.vue'

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
        path: 'cards',
        name: 'AdminCard',
        component: AdminCard
      },
      {
        path: 'rewards',
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
