/*
  ./frontend/portal/src/main.js
  Point d'entrée principal de l'application Vue.js : initialise l'app, les styles et le router
*/

// Importation de Vue, du composant principal et des styles globaux
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Fichier d'import de styles
import './styles/global.css';
import './styles/authPage.css';
import './styles/forms.css';
import './styles/page.css';

// Fichier d'import animation
import './styles/animations/auth-animation.css';

import AOS from 'aos'
import 'aos/dist/aos.css'

	AOS.init({
		duration: 800,
		once: true
	})

// Création et montage de l'application Vue
const app = createApp(App);
app.use(router);
app.mount('#app');
