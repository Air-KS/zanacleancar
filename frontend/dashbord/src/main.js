/*
  ./frontend/portal/src/main.js
  Point d'entrée principal de l'application Vue.js : initialise l'app, les styles et le router
*/

// Importation de Vue, du composant principal et des styles globaux
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './styles/global.css';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
