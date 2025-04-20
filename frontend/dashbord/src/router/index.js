// ./frontend/dashbord/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from '@/views/adminLogin.vue'
import AdminPage from '@/views/adminPage.vue'

import axios from 'axios'

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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/checkAdmin`, {
        withCredentials: true
      });

      if (res.data.connected) {
        next(); // ✅ ok, connecté
      } else {
        next('/admin-login');
      }
    } catch (err) {
      next('/admin-login');
    }
  } else {
    next();
  }
});

export default router
