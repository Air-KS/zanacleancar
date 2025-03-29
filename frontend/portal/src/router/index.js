/*
  frontend/portal/src/router/index.js
  - Définition et configuration des routes principales de l'application Vue.js
*/

// Importation des outils de routing de Vue Router et des pages
import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import VerifyCode from '@/views/verifyCode.vue';

// Déclaration des routes avec leur composant associé
const routes = [
  { path: '/', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/verify-code', name: 'VerifyCode', component: VerifyCode },
  // autres routes ici...
];

// Création du routeur avec l'historique en mode HTML5
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Remonte automatiquement en haut de page après chaque navigation
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default router;
