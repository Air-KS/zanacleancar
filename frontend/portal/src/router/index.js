/*
  frontend/portal/src/router/index.js
*/

import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import VerifyCode from '@/views/verifyCode.vue';

const routes = [
  { path: '/', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/verify-code', name: 'VerifyCode', component: VerifyCode },
  // autres routes ici...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Ajouter un afterEach hook pour le défilement vers le haut
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
export default router;
