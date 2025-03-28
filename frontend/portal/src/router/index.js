/*
  frontend/portal/src/router/index.js
*/

import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';

const routes = [
  { path: '/', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  // autres routes ici...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
