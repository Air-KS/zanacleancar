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
import ServicePage from '@/views/servicePage.vue';
import CancellationPolicyPage from '@/views/cancellationPolicy.vue';

import AboutPage from '@/views/about.vue';
import HowItWorksPage from '@/views/howItWorks.vue';
import PrivacyPolicyPage from '@/views/privacyPolicy.vue';
import ShopLoyalties from '@/views/shopLoyalties.vue';

// Déclaration des routes avec leur composant associé
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/verify-code', name: 'VerifyCode', component: VerifyCode },
  { path: '/profil/:id', name: 'Profil', component: ProfilPage },
  { path: '/service', name: 'Service', component: ServicePage },
  { path: '/shopLoyalties', name: 'ShopLoyalties', component: ShopLoyalties },

  { path: '/about', name: 'About', component: AboutPage },
  { path: '/howItWorks', name: 'HowItWorks', component: HowItWorksPage },
  { path: '/privacyPolicy', name: 'PrivacyPolicy', component: PrivacyPolicyPage },
  { path: '/cancellationPolicy', name: 'CancellationPolicy', component: CancellationPolicyPage },

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
