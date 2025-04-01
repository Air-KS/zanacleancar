/*
  frontend/portal/src/router/index.js
  - Définition et configuration des routes principales de l'application Vue.js
*/

// Importation des outils de routing de Vue Router et des pages
import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '@/views/RegisterPage.vue';
import HomePage from '@/views/homePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import VerifyCode from '@/views/verifyCode.vue';
import ProfilPage from '@/views/profilPage.vue';

// Déclaration des routes avec leur composant associé
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/verify-code', name: 'VerifyCode', component: VerifyCode },
  { path: '/profil', name: 'Profil', component: ProfilPage },
  // autres routes ici...

  // Page non trouvé ou existe pas
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
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
